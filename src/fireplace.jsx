import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Howl } from 'howler';
const fireURL = 'https://s3-us-west-2.amazonaws.com/zach.christmas/tunes/fireplace.mp3';

class Fireplace extends Component {
  constructor(props) {
    super(props);
    this.loadTrack = this.loadTrack.bind(this)
    this.toggleTrack = this.toggleTrack.bind(this)
    this.howl = null;
  }

  componentDidMount() {
  	this.loadTrack(fireURL)
  }

  loadTrack(track){
    this.howl = new Howl({
      src: track,
      autoplay: true,
      volume: 0.2,
      html5:true,
      loop:true
      });

  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.fireStarted && !this.howl.playing())
      this.howl.play()
    else if(!nextProps.fireStarted && this.howl.playing())
      this.howl.pause()
  }

  toggleTrack(){
    this.props.toggleFire();
  }


  render() {
    return (
        <div>
        <button onClick={this.toggleTrack}>Toggle Fireplace</button>
        </div>
    )
  }
}

export default Fireplace;