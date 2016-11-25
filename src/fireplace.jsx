import React, {Component} from 'react';
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
      volume: 0.3,
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
    return (<div className='fire' onClick={this.toggleTrack}>
        <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.2 40.54"><path className="a" d="M.34,24.84c1-4.62,4.49-8.39,4.79-13a13.78,13.78,0,0,1,1.65,6.73C11,13.35,15.43,6.38,14.48,0c0,0,8.06,2.53,11.32,14.9,1.93-1.71,1.75-5.25.79-7.33,2.86,2.09,19.29,20.6-2.58,33,4.11-8,1.06-18.81-6.08-23.8A15,15,0,0,1,14.66,28a7.77,7.77,0,0,0-1.07-6,18.92,18.92,0,0,1-2.86,6.62c-2.08,3-3.51,6.26-.81,11.88C1.31,35.7-1,31.11.34,24.84Z"/></svg>
        </div>
    )
  }
}

export default Fireplace;