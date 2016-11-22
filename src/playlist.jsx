import React, {Component} from 'react';
import loadPlaylist from './loadPlaylist.js';
import { Howl } from 'howler';
import Fireplace from './fireplace';
const url = 'https://s3-us-west-2.amazonaws.com/zach.christmas/tunes/';

var volumes = [0.6,0.8,0.2]

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
    }
    this.tick = this.tick.bind(this)
    this.nextTrack = this.nextTrack.bind(this);
    this.loadTrack = this.loadTrack.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.adjustVol = this.adjustVol.bind(this)
  }

  componentDidMount() {
  	this.loadTrack(this.state.currentTrack)
    this.loadTrack(this.state.nextTrack, false)
    this.setState({ request: requestAnimationFrame(this.tick) })
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
    console.log((this.state.currentTrack.howl.duration() === this.state.currentTrack.howl.seek()), this.state.nextTrack.howl.playing())
    if((this.state.currentTrack.howl.duration() - this.state.currentTrack.howl.seek()) < 5 && !this.state.nextTrack.howl.playing())
       {
        console.log('play next track') 
        this.state.nextTrack.howl.play()
      }
    else if((this.state.currentTrack.howl.duration() - this.state.currentTrack.howl.seek() < 1) && this.state.nextTrack.howl.playing())
       {
        console.log('changing track')
        this.nextTrack()
      }
    this.setState({ request: requestAnimationFrame(this.tick)})
  }

  loadTrack(track, play=true){
    track.howl = new Howl({
      src: url+track.filePath,
      volume: this.state.currentVol,
      html5:true,
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
      nextTrack: this.loadTrack(loadPlaylist.getTrack(),false)
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
    this.setState({
      currentTrack: this.loadTrack(loadPlaylist.getTrack()),
      nextTrack: this.loadTrack(loadPlaylist.getTrack(),false),
      tracklist: loadPlaylist.get()
    });
  }

  render() {
  	let tracklist = this.state.tracklist.map( (e,idx) => {
  		return( <li onClick={this.skipTo.bind(this,e)} key={idx}>{e.name}</li>)
  	})
    return (
        <div>
          <div>
            <span>{this.state.currentTrack.artist}</span> : 
            <span>{this.state.currentTrack.name}</span>
            <button onClick={this.togglePlay}>{this.state.playing ? "Pause": "Play"}</button>
            <button onClick={this.nextTrack}>Skip</button>
            <Fireplace toggleFire={this.props.toggleFire} fireStarted={this.props.fireStarted} />
            <button onClick={this.adjustVol}>Vol +/-</button><span>{(this.state.currentVol * 5)}</span>
          </div>
          <ul><li onClick={this.nextTrack}>{this.state.nextTrack.name}</li>{tracklist}</ul>
          </div>
    )
  }
}

export default Playlist;