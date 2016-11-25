import React, {Component} from 'react';
import loadPlaylist from './loadPlaylist.js';
import { Howl } from 'howler';
import Fireplace from './fireplace';
import PlayIcon from './icons/playicon';
import SkipIcon from './icons/skipicon';
const url = (process.env.S3_URL ? process.env.S3_URL : 'test'); //'//:zach.christmas.s3-website-us-west-2.amazonaws.com/tunes/');
console.log({url})

var volumes = [0.6,0.8,0.2];
var didItPlay = false;

var toTime = function(ms){
  var min = (ms/1000/60) << 0,
   sec = Math.trunc((ms/1000) % 60, 2);
   if(String(sec).length < 2)
      sec = "0"+sec;
return (min + ':' + sec);

}

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
    	tracklist: loadPlaylist.get(),
    	currentTrack: loadPlaylist.getTrack(),
      nextTrack: loadPlaylist.getTrack(),
      request: 0,
      currentVol:0.4,
      duration: 0,
      playhead: '0:00',
    }
    this.tick = this.tick.bind(this)
    this.nextTrack = this.nextTrack.bind(this);
    this.loadTrack = this.loadTrack.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.adjustVol = this.adjustVol.bind(this)
  }

  componentDidMount() {
    let t = this.loadTrack(this.state.currentTrack);
    this.loadTrack(this.state.nextTrack, false)
    this.setState({ request: requestAnimationFrame(this.tick), duration:t.duration})
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.state.request)
    this.state.request = null;    
    this.state.currentTrack.howl.stop()
    this.state.nextTrack.howl.stop()
    this.state.currentTrack.howl.unload()
    this.state.nextTrack.howl.unload()
  }

  adjustVol(){
    volumes.push(this.state.currentVol);
    let v = volumes.shift()
    console.log(v, volumes, this.state.currentVol);
    this.setState({
      currentVol:v
    })
    if(this.state.playing)
    {
      console.log('adjusting player volume')
      this.state.currentTrack.howl.volume(v)
      console.log(this.state.currentTrack.howl.volume())
    }
  }

  tick(){
    let p = this.state.playhead;
    if((this.state.currentTrack.howl.duration() - this.state.currentTrack.howl.seek()) < 5 && !this.state.nextTrack.howl.playing())
       {
        console.log('play next track') 
        this.state.nextTrack.howl.play()
      }
    else if((this.state.currentTrack.howl.duration() - this.state.currentTrack.howl.seek() < 1) && this.state.nextTrack.howl.playing())
       {
        console.log('changing track')
        // this.nextTrack()
        // didItPlay = true;
      }
    if(this.state.loadingBar){
      let n = ((this.state.currentTrack.howl.seek()/this.state.currentTrack.howl.duration()) * 100);
      let w = (Math.round(n * 10) / 10)+'%'
      if(this.state.loadingBar.style.width != w)
        this.state.loadingBar.style.width = w;
    }
    if(this.state.currentTrack.howl.playing())
    {
      p = toTime(this.state.currentTrack.howl.seek() * 1000)
    }
    this.setState({ request: requestAnimationFrame(this.tick), playhead:p})
  }

  loadTrack(track, play=true){
    track.howl = new Howl({
      src: url+track.filePath,
      volume: this.state.currentVol,
      html5:true,
      onend: function(){
        if(!didItPlay)
          this.nextTrack()
        didItPlay = false;
      }
    });
    if(this.state.playing && play)
      track.howl.play()
    return track;
  }

  nextTrack(){
    if(!this.state.nextTrack.howl.playing())
        this.state.nextTrack.howl.play()
    console.log('next track')
    this.state.currentTrack.howl.unload()
    loadPlaylist.advance(this.state.currentTrack)
    this.setState({
      playing: true,
      currentTrack: this.state.nextTrack,
      nextTrack: this.loadTrack(loadPlaylist.getTrack(),false),
      duration: this.state.nextTrack.duration,
      playhead: '0:00'
    });
    
  }

  togglePlay(){
    if(this.state.playing)
      this.state.currentTrack.howl.pause()
    else{
      this.state.currentTrack.howl.play()
    }
    this.setState({
      playing: !this.state.playing,
    })
  }

  skipTo(track){
    this.state.currentTrack.howl.unload()
    this.state.nextTrack.howl.unload()
    loadPlaylist.advance(this.state.currentTrack)
    loadPlaylist.advance(this.state.nextTrack)
    loadPlaylist.skipTo(track)
    let t = this.loadTrack(loadPlaylist.getTrack())
    this.state.loadingBar.style.width = 0;
    this.setState({
      currentTrack: t,
      nextTrack: this.loadTrack(loadPlaylist.getTrack(),false),
      tracklist: loadPlaylist.get(),
      duration: t.duration,
      playhead: '0:00'
    });
  }

  render() {
  	let tracklist = this.state.tracklist.map( (e,idx) => {
  		return( <div className="track" onClick={this.skipTo.bind(this,e)} key={idx}><span className='title'>{e.name}</span><span className='artist'>{e.artist}</span></div>)
  	})


    return (
        <div className="playlist">
          <div className="player">
            <div className='nowPlaying'>
                <span className='artist'>{this.state.currentTrack.artist}</span>
                <span className='trackTitle'>{this.state.currentTrack.name}</span>
                <div className="loadingBar"><span  ref={(r) => {if(!this.state.loadingBar)
                  this.setState({loadingBar: r,})}} className="loadedBar"></span></div><span className="timecode">{this.state.playhead}/{this.state.duration}</span>

            </div>
            <div className="controls">
              <PlayIcon onClick={this.togglePlay} playing={this.state.playing}/>
              <SkipIcon onClick={this.nextTrack}/>
              <Fireplace toggleFire={this.props.toggleFire} fireStarted={this.props.fireStarted} />
              <div className={'vol vol-'+(this.state.currentVol * 5)} onClick={this.adjustVol}>
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68.53 58.83"><path  d="M2.58,21.26A2.59,2.59,0,0,0,0,23.85V36a2.59,2.59,0,0,0,2.58,2.58H8.07A9.53,9.53,0,0,1,12.76,40l13.06,9.28c1.16.82,2.11.33,2.11-1.09v-36c0-1.42-1-1.93-2.14-1.14l-13,8.74a10,10,0,0,1-4.73,1.44Z"/><path id="inner" d="M35.64,18.88c5.34,6.74,3.92,14.4-.35,21.26-1.54,2.48,2.37,4.75,3.9,2.28,5.49-8.82,6.3-18.35-.35-26.74C37,13.4,33.85,16.62,35.64,18.88Z"/><path id="mid" d="M49.28,9.22c-1.9-2.22-5.08,1-3.2,3.2,7.43,8.69,7.38,26.31,0,35-1.87,2.21,1.31,5.42,3.2,3.2C58.34,39.95,58.39,19.89,49.28,9.22Z"/><path id="outer" d="M58.54.72c-2-2.17-5.15,1-3.2,3.2,11.17,12.34,12,39,0,51.05-2.06,2.06,1.14,5.26,3.2,3.2C72.37,44.3,71.34,14.87,58.54.72Z"/></svg>
              </div>
            </div>
          </div>
          <div className='trackList'><div className="track" onClick={this.nextTrack}><span className='title'>{this.state.nextTrack.name}</span><span className='artist'>{this.state.nextTrack.artist}</span></div>{tracklist}</div>
        </div>
    )
  }
}

export default Playlist;