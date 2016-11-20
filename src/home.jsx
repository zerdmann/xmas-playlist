import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Playlist from './playlist';
import Fire from './fire';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fireStarted: false
    }
    this.toggleFire = this.toggleFire.bind(this)
  }

  toggleFire(){
    this.setState({
      fireStarted: !this.state.fireStarted
    })
  }

  render() {
    return (
        <div className="big-poppa">
        <div className="left">
          <Fire fireStarted={this.state.fireStarted} />
          <Playlist toggleFire={this.toggleFire} fireStarted={this.state.fireStarted} />
          
        </div>
        <div className="right">
          <img src='img/logo.svg' className="logo"/>
        </div>
        </div>
    )
  }
}

export default Home;