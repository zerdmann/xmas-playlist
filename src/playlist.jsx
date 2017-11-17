import React, {Component} from 'react';
import loadPlaylist from './loadPlaylist.js';
import { Howl, Howler } from 'howler';
import Fireplace from './fireplace';
import PlayIcon from './icons/playicon';
import SkipIcon from './icons/skipicon';
const url = (process.env.S3_URL ? process.env.S3_URL : 'test'); //'//:zach.christmas.s3-website-us-west-2.amazonaws.com/tunes/');

var volumes = [0.6,0.8,0.2] //[0.6,0.8,0.2];
var c = 0;


var toTime = function(ms){
  var min = (ms/1000/60) << 0,
   sec = Math.trunc((ms/1000) % 60, 2);
   if(String(sec).length < 2)
      sec = "0"+sec;
   sec 
return (min + ':' + sec);

}

var toMS = function(time){
  time = time.split(':')
  let min = time[0],
  sec = time[1]
  let t = (parseInt(min) * 60) + (parseInt(sec))
  return t;
}


class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
    	tracklist: loadPlaylist.get(),
    	currentTrack: loadPlaylist.getTrack(),
      queuedTrack: loadPlaylist.queueTrack(),
      request: 0,
      currentVol:0.4,
      duration: 0,
      durationMS:0,
      playhead: '0:00',
    }

    this.tick = this.tick.bind(this)
    this.loadTrack = this.loadTrack.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.adjustVol = this.adjustVol.bind(this);
    this.crossfadeTracks = this.crossfadeTracks.bind(this);
    this.updateTrackInfo = this.updateTrackInfo.bind(this);
    this.nextTrack = this.nextTrack.bind(this);
    this.skipTrack = this.skipTrack.bind(this);
  }

  componentDidMount() {
    this.loadTrack(this.state.currentTrack)
    this.loadTrack(this.state.queuedTrack)
    this.setState({ 
      playing: this.state.currentTrack.howl.playing(),
      request: setInterval(this.tick, 32), 
      duration:this.state.currentTrack.duration,
      durationMS: toMS(this.state.currentTrack.duration),
      displayTitle: this.state.currentTrack.name,
      displayArtist: this.state.currentTrack.artist
    })
    window.addEventListener('beforeunload', (e) => {
      loadPlaylist.save();
    })
  }

  trackEnd() {
    console.log('trackend', this.name);
    this.howl.unload();
    this.howl = null;
  }

  crossfadeTracks() {
    let v = this.state.currentVol;
    let t = this.state.queuedTrack;
    let cb = function(track) {
      console.log("fade ended", {track, t});
      this.updateTrackInfo(t);
    }

    this.state.currentTrack.howl.fade(v, 0, 3000);
    this.state.currentTrack.howl.once('fade', cb.bind(this, [this.state.currentTrack]))

    this.state.queuedTrack.howl.play();
    this.state.queuedTrack.howl.fade(0, v, 3000);
    console.log("playing queuedTrack", this.state.queuedTrack, this.state.queuedTrack.howl.playing(), v)


    this.nextTrack();
  }

  skipTrack(){
    this.state.currentTrack.howl.unload();
    this.state.queuedTrack.howl.play();
    this.updateTrackInfo(this.state.queuedTrack);
    this.nextTrack();
  }

  nextTrack(){
    loadPlaylist.advance();
    this.setState({
      playing: true,
      currentTrack: this.state.queuedTrack,
      queuedTrack: this.loadTrack(loadPlaylist.queueTrack()),
      duration: this.state.queuedTrack.duration,
      durationMS: toMS(this.state.queuedTrack.duration),
      playhead: '0:00',
      tracklist: loadPlaylist.get()
    });
  }

  componentWillUnmount() {
    window.clearInterval(this.state.request)
    this.state.request = null;    
  }

  adjustVol(){
    volumes.push(this.state.currentVol);
    let v = volumes.shift()
    this.state.currentTrack.howl.volume(v);

    this.setState({
      currentVol:v
    })
    
  }

  tick(){
    let p = this.state.playhead,
        durationMS = this.state.durationMS,
        seek = this.state.currentTrack.howl.seek(),
        playing = this.state.currentTrack.howl.playing(),
        remaining = durationMS - seek,
        s = {playing: playing};

    if(playing) {

      if(remaining < 3 && remaining > 0) {
          this.crossfadeTracks();
        }
      if(this.state.loadingBar) {
        let n = ((seek/durationMS) * 100);
        let w = (Math.round(n * 10) / 10)+'%'
        if(this.state.loadingBar.style.width != w)
          this.state.loadingBar.style.width = w;
      }
      s.playhead = toTime(seek * 1000)

    }

    this.setState(s);
  }

  loadTrack(track){
      if(!track.howl)
       track.howl = new Howl({
        src: url+track.filePath,
        volume: this.state.currentVol,
        html5:true,
        onend: this.trackEnd.bind(track)
      });
    return track; 
  }

  updateTrackInfo(track) {
    this.state.loadingBar.style.width = 0;
    this.setState({
      displayTitle: track.name,
      displayArtist: track.artist
    })
  }

  togglePlay(){
    let playing = this.state.currentTrack.howl.playing();
    if(playing)
      this.state.currentTrack.howl.pause()
    else{
      this.state.currentTrack.howl.play()
    }
    this.setState({
      playing: !playing,
    })
  }

  skipTo(track){
    document.querySelector('.trackList').scrollTop = 0;
    let p = this.state.currentTrack.howl.playing();

    this.state.currentTrack.howl.unload();
    if(track.name !== this.state.queuedTrack.name) {
      console.log('unloading queuedTrack');
      this.state.queuedTrack.howl.unload();
    }

    loadPlaylist.skipTo(track)
    let t = this.loadTrack(loadPlaylist.getTrack())
    if(p)
      t.howl.play();

    this.setState({
      currentTrack: t,
      nextTrack: this.loadTrack(loadPlaylist.queueTrack()),
      tracklist: loadPlaylist.get(),
      duration: t.duration,
      durationMS: toMS(t.duration),
      playhead: '0:00'
    });

    this.updateTrackInfo(t);
  }

  render() {
  	let tracklist = this.state.tracklist.slice(1,this.state.tracklist.length).map( (e,idx) => {
  		return( <div className="track" onClick={this.skipTo.bind(this,e)} key={idx}><span className='title'>{e.name}</span><span className='artist'>{e.artist}</span></div>)
  	})


    return (
        <div className="playlist" onClick={this.dummy} onTouchEnd={this.initHowls}>
          <div className="player" >
            <div className='nowPlaying'>
                <span className='artist'>{this.state.displayArtist}</span>
                <span className='trackTitle'>{this.state.displayTitle}</span>
                <div className="loadingBar"><span  ref={(r) => {if(!this.state.loadingBar)
                  this.setState({loadingBar: r})}} className="loadedBar"></span></div><span className="timecode">{this.state.playhead}/{this.state.duration}</span>

            </div>
            <div className="controls">
              <PlayIcon onClick={this.togglePlay} playing={this.state.playing}/>
              <SkipIcon onClick={this.skipTrack}/>
              <Fireplace toggleFire={this.props.toggleFire} fireStarted={this.props.fireStarted} />
              <div className={'vol vol-'+(this.state.currentVol * 5)} onClick={this.adjustVol}>
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68.53 58.83"><path  d="M2.58,21.26A2.59,2.59,0,0,0,0,23.85V36a2.59,2.59,0,0,0,2.58,2.58H8.07A9.53,9.53,0,0,1,12.76,40l13.06,9.28c1.16.82,2.11.33,2.11-1.09v-36c0-1.42-1-1.93-2.14-1.14l-13,8.74a10,10,0,0,1-4.73,1.44Z"/><path id="inner" d="M35.64,18.88c5.34,6.74,3.92,14.4-.35,21.26-1.54,2.48,2.37,4.75,3.9,2.28,5.49-8.82,6.3-18.35-.35-26.74C37,13.4,33.85,16.62,35.64,18.88Z"/><path id="mid" d="M49.28,9.22c-1.9-2.22-5.08,1-3.2,3.2,7.43,8.69,7.38,26.31,0,35-1.87,2.21,1.31,5.42,3.2,3.2C58.34,39.95,58.39,19.89,49.28,9.22Z"/><path id="outer" d="M58.54.72c-2-2.17-5.15,1-3.2,3.2,11.17,12.34,12,39,0,51.05-2.06,2.06,1.14,5.26,3.2,3.2C72.37,44.3,71.34,14.87,58.54.72Z"/></svg>
              </div>
            </div>
          </div>
          <div className='trackList'>{tracklist}</div>
        </div>
    )
  }
}

export default Playlist;