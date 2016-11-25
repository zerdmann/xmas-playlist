import React, {Component} from 'react';

class PlayIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div onClick={this.props.onClick}>{ (()=>{
       var r = (<svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><rect className="icon" width="27" height="72"/><rect className="icon" x="45" width="27" height="72"/></svg>);
      if(!this.props.playing) {
            r = (<svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><polygon className="icon" points="0 0 0 72 72 36 0 0"/></svg>)
          } 
      return r;

      })() }
      </div>
  )}

}

export default PlayIcon;