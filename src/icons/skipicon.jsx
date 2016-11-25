import React, {Component} from 'react';

class SkipIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div onClick={this.props.onClick}>
      <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><polygon className="a" points="72 36 27 0 27 21.6 0 0 0 72 27 50.4 27 72 72 36"/></svg>
      </div>
  )}

}

export default SkipIcon;