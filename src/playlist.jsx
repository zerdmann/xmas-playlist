import React, {Component} from 'react';
import loadPlaylist from './loadPlaylist.js';
import { Howl, Howler } from 'howler';
import Fireplace from './fireplace';
import PlayIcon from './icons/playicon';
import SkipIcon from './icons/skipicon';
const url = (process.env.S3_URL ? process.env.S3_URL : 'test'); //'//:zach.christmas.s3-website-us-west-2.amazonaws.com/tunes/');

var volumes = [0.6,0.8,0.2];
var init = false;

var tickStatus = {
  playedFile:false,
  changedData:false,
}

var toTime = function(ms){
  var min = (ms/1000/60) << 0,
   sec = Math.trunc((ms/1000) % 60, 2);
   if(String(sec).length < 2)
      sec = "0"+sec;
return (min + ':' + sec);

}

var toMS = function(time){
  time = time.split(':')
  let min = time[0],
  sec = time[1]
  let t = (parseInt(min) * 60) + (parseInt(sec))
  return t;
}

var nextAvailable = 'sound1',
playingHowl = 'sound2';


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
      howls: {sound1:null, sound2:null},
    }

    this.tick = this.tick.bind(this)
    this.nextTrack = this.nextTrack.bind(this);
    this.loadTrack = this.loadTrack.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.adjustVol = this.adjustVol.bind(this)
    this.initHowls = this.initHowls.bind(this)
  }

  componentDidMount() {
    let t = this.loadTrack(this.state.currentTrack);
    let tmp = nextAvailable;
          nextAvailable = playingHowl;
          playingHowl = tmp;
    this.loadTrack(this.state.nextTrack, false)
    this.setState({ request: setInterval(this.tick, 32), duration:t.duration})
     // Howler.mobileAutoEnable = false;
     // console.log("Howler:",Howler)
  }

  dummy(){

  }

  initHowls(){
    if(!init)
    {
    let s1 = this.state.howls.sound1._sounds[0]._node.src;
    let s2 = this.state.howls.sound2._sounds[0]._node.src
      // console.log('initializing sound1')
      this.state.howls.sound1 = new Howl({
      src: 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjM2LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV6urq6urq6urq6urq6urq6urq6urq6urq6v////////////////////////////////8AAAAATGF2YzU2LjQxAAAAAAAAAAAAAAAAJAAAAAAAAAAAASDs90hvAAAAAAAAAAAAAAAAAAAA//MUZAAAAAGkAAAAAAAAA0gAAAAATEFN//MUZAMAAAGkAAAAAAAAA0gAAAAARTMu//MUZAYAAAGkAAAAAAAAA0gAAAAAOTku//MUZAkAAAGkAAAAAAAAA0gAAAAANVVV',
      volume: this.state.currentVol,
      html5: true,
      onend: () => {
        console.log('sound 1 ended')
      }
    });
      this.state.howls.sound2 = new Howl({
      src: 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjM2LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV6urq6urq6urq6urq6urq6urq6urq6urq6v////////////////////////////////8AAAAATGF2YzU2LjQxAAAAAAAAAAAAAAAAJAAAAAAAAAAAASDs90hvAAAAAAAAAAAAAAAAAAAA//MUZAAAAAGkAAAAAAAAA0gAAAAATEFN//MUZAMAAAGkAAAAAAAAA0gAAAAARTMu//MUZAYAAAGkAAAAAAAAA0gAAAAAOTku//MUZAkAAAGkAAAAAAAAA0gAAAAANVVV',
      volume: this.state.currentVol,
      html5: true,
       onend: () => {
        console.log('sound 2 ended')
      }

    });

    this.state.howls.sound1._sounds[0]._node.src = s1;
    this.state.howls.sound1._sounds[0]._node.load();
    this.state.howls.sound2._sounds[0]._node.src = s2;
    this.state.howls.sound2._sounds[0]._node.load();
    init = true;
    this.state.howls[playingHowl].play()
   
  }

}

  componentWillUnmount() {
    window.clearInterval(this.state.request)
    this.state.request = null;    
    // this.state.howl1.stop()
    // this.state.howl2.stop()
    // this.state.howl1.unload()
    // this.state.howl2.unload()
  }

  adjustVol(){
    volumes.push(this.state.currentVol);
    let v = volumes.shift()
    console.log(v, volumes, this.state.currentVol);
    this.setState({
      currentVol:v
    })
  
      this.state.howls[playingHowl].volume(v)
      this.state.howls[nextAvailable].volume(v)
    
  }

  tick(){
    let p = this.state.playhead;
    // console.log(this.state.howls[playingHowl]._endTimers)
    // console.log(Howler)
    if((toMS(this.state.currentTrack.duration) - this.state.howls[playingHowl].seek()) < 3 && !this.state.howls[nextAvailable].playing())
       {
        console.log('TICK: play next audio file') 
        this.state.howls[nextAvailable].play()
        tickStatus.playedFile = true;
      }
    else if((toMS(this.state.currentTrack.duration) - this.state.howls[playingHowl].seek()) < 0.5 && this.state.howls[nextAvailable].playing())
       {
        // console.log(this.state.howls[playingHowl].duration(), toMS(this.state.currentTrack.duration), this.state.howls[playingHowl]._sounds[0])
        console.log('TICK: changing track info in player')
        let tmp = nextAvailable;
          nextAvailable = playingHowl;
          playingHowl =tmp;
        this.nextTrack()
        tickStatus.changedData = true;
      }
    if(this.state.loadingBar){
      let n = ((this.state.howls[playingHowl].seek()/toMS(this.state.currentTrack.duration)) * 100);
      let w = (Math.round(n * 10) / 10)+'%'
      if(this.state.loadingBar.style.width != w)
        this.state.loadingBar.style.width = w;
    }
    if(this.state.playing && !this.state.howls[playingHowl].playing())
    {
      console.log("TICK: should be playing, and it isn't!" ,playingHowl)
      this.state.howls[playingHowl].play()
    }
    if(this.state.howls[playingHowl].playing())
    {
      // console.log('TICK: Playhead update', this.state.howls[playingHowl].seek())
      p = toTime(this.state.howls[playingHowl].seek() * 1000)
    }
    this.setState({ playhead:p})
  }

  loadTrack(track, play=true){
    console.log('LOAD TRACK: loading track: \{',track.name,'\} into howl ',nextAvailable,': play =',play)
    if(!this.state.howls[nextAvailable]){ 
      console.log('LOAD TRACK: creating new howl')
      this.state.howls[nextAvailable] = new Howl({
        src: url+track.filePath,
        volume: this.state.currentVol,
        html5:true,
        onend: () => {
          console.log('sound ended', tickStatus)
          if(!tickStatus.playedFile || !tickStatus.changedData)
            this.nextTrack()
          tickStatus.playedFile, tickStatus.changedData = false;
      }

      });}
    else{
      let h = this.state.howls[nextAvailable]
      h._sounds[0]._node.src = url + track.filePath;
      h._sounds[0]._node.title = track.name;
      h._duration = toMS(track.duration);
      h._sprite.__default[1] = toMS(track.duration) * 1000;
      h._sounds[0]._start = 0;
      h._sounds[0]._stop = toMS(track.duration); 
      h._sounds[0]._node.load();
      console.log(this.state.howls[nextAvailable]._endTimers, this.state.howls[nextAvailable]._sounds[0]._stop, h._sprite)

    }
    if(this.state.playing && play)
      { 
        this.state.howls[nextAvailable].play()
        this.state.howls[nextAvailable]._sounds[0]._ended = false;
         let tmp = nextAvailable;
          nextAvailable = playingHowl;
          playingHowl = tmp;
        console.log('LOAD TRACK: playing from load', this.state.howls[nextAvailable])       
      }
     console.log("LOAD TRACK: track info", {'howlDuration':this.state.howls[nextAvailable].duration(), 'trackDuration':toMS(track.duration), 'sound':this.state.howls[nextAvailable]._sounds[0] })
    return track;
  }

  nextTrack(){
    console.log('NEXT TRACK: next track called', '\{'+this.state.nextTrack.name+'\}')
    if(!this.state.howls[nextAvailable].playing())
        {
          console.log('NEXT TRACK: playing next track howl')
          this.state.howls[nextAvailable].play()
          let tmp = nextAvailable;
          nextAvailable = playingHowl;
          playingHowl = tmp;
        }
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
    // console.log(this.state.playing, this.state.howls[playingHowl],this.state.howls[playingHowl].playing(), Howler )
    if(this.state.playing)
      this.state.howls[playingHowl].pause()
    else{
     this.state.howls[playingHowl].play()
    }
    this.setState({
      playing: !this.state.playing,
    })
  }

  skipTo(track){
    document.querySelector('.trackList').scrollTop = 0;
    this.state.howls['sound1'].stop()
    this.state.howls['sound2'].stop()
    this.state.howls['sound1']._sounds[0]._node.pause()
    this.state.howls['sound2']._sounds[0]._node.pause()

    loadPlaylist.advance(this.state.currentTrack)
    loadPlaylist.advance(this.state.nextTrack)
    loadPlaylist.skipTo(track)
    let t = this.loadTrack(loadPlaylist.getTrack())
    if(!this.state.playing){
      let tmp = nextAvailable;
            nextAvailable = playingHowl;
            playingHowl = tmp;
    }        
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
        <div className="playlist" onClick={this.dummy} onTouchEnd={this.initHowls}>
          <div className="player" >
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