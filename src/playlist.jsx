import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import loadPlaylist from './loadPlaylist.js';
import { Howl } from 'howler';
import Fireplace from './fireplace';
const url = 'https://s3-us-west-2.amazonaws.com/zach.christmas/tunes/';


class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	tracklist: loadPlaylist.get(),
    	currentTrack: loadPlaylist.getTrack(),
      nextTrack: loadPlaylist.getTrack(),
      request: 0
    }
    this.tick = this.tick.bind(this)
    this.nextTrack = this.nextTrack.bind(this);
    this.loadTrack = this.loadTrack.bind(this);
  }

  componentDidMount() {
  	this.loadTrack(this.state.currentTrack)
    this.loadTrack(this.state.nextTrack)
    this.state.currentTrack.howl.play()
    this.setState({ request: requestAnimationFrame(this.tick) })
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.state.request)
    this.state.request = null;
    this.state.currentTrack.howl.unload()
    this.state.nextTrack.howl.unload()
  }

  tick(){
    if((this.state.currentTrack.howl.duration() - this.state.currentTrack.howl.seek()) < 5 && !this.state.nextTrack.howl.playing())
       {
        console.log('play next track') 
        this.state.nextTrack.howl.play()
      }
    this.setState({ request: requestAnimationFrame(this.tick)})
  }

  loadTrack(track){
    console.log('loading', {...track})
    track.howl = new Howl({
      src: url+track.filePath,
      volume: 0.4,
      html5:true,
      onend: this.nextTrack});
    return track;
  }

  nextTrack(){
    if(!this.state.nextTrack.howl.playing())
        this.state.nextTrack.howl.play()
    console.log('next track')
    this.state.currentTrack.howl.unload()
    loadPlaylist.advance(this.state.currentTrack)
    this.setState({
      currentTrack: this.state.nextTrack,
      nextTrack: this.loadTrack(loadPlaylist.getTrack())
    });
    
  }

  render() {
  	let tracklist = this.state.tracklist.map( (e,idx) => {
  		return( <li key={idx}>{e.name}</li>)
  	})
    return (
        <div>
        <span>{this.state.currentTrack.artist}</span> : 
        <span> {this.state.currentTrack.name}</span>
        <button onClick={this.nextTrack}>Skip</button>
        <Fireplace toggleFire={this.props.toggleFire} fireStarted={this.props.fireStarted} />
        </div>
    )
  }
}

export default Playlist;