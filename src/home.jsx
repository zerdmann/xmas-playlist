import React, {Component} from 'react';
import Playlist from './playlist';
import Fire from './fire';
import Quotes from './quotes';

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
          <Quotes />
        </div>
        </div>
    )
  }
}

export default Home;