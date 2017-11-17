import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import quoteManager from './quoteManager';

class Quotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q:quoteManager.get(),
      request: 0,
    }
    this.tick = this.tick.bind(this)
  }
  componentDidMount() {
   this.setState({ 
    request: requestAnimationFrame(this.tick)
    });
  }

  tick(){
    let s = {}

    if(this.state.request % 9000 === 0)
      s.q = quoteManager.get();
  
    s.request = requestAnimationFrame(this.tick)

    this.setState(s);
  }


  render() {
  return( 
          <ReactCSSTransitionGroup className="quote-wrapper" transitionName="carousel"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}

        >
            <div className='quote' key={this.state.q.by}>
              <div className='quote-text' >
              &ldquo;{this.state.q.text}&rdquo;
              </div>
              <div className='quote-rule' ></div>
              <div className='quote-by'>
                {this.state.q.by}
              </div>
            </div>
            </ReactCSSTransitionGroup>
    )
  }
}

export default Quotes;