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
    if(this.state.request % 9000 === 0)
      this.setState({
      q:quoteManager.get()
    })

    this.setState({ request: requestAnimationFrame(this.tick) })
  }


  newQuote(){
    // console.log('new quote')
    // let a = Array.from(document.querySelectorAll('.hideable'))
    // console.log(a)
    // a.forEach((e) => {e.classList.add('hide')});
    // this.setState({
    //   q:quoteManager.get()
    // })
    // // setTimeout(a.forEach((e) => { console.log('timeout');e.classList.remove('hide');}), 100);
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