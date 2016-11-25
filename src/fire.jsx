import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Fire extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="grate">
      <img className="grille" src="img/grille.svg"/>
      <div className="oval"></div><div className="rect">
      <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
      >
      {(()=>{if(this.props.fireStarted)
        return(
               <div className="container">
                  <div className="red flame"></div>
                  <div className="orange flame"></div>
                  <div className="yellow flame"></div>
                  <div className="white flame"></div>
                  <div className="blue circle"></div>
                <div className="black circle"></div>
              </div> )})()}

        </ReactCSSTransitionGroup>
         {/*(()=>{if(this.props.fireStarted)
        return(
               <div className="container">
                  <div className="red flame"></div>
                  <div className="orange flame"></div>
                  <div className="yellow flame"></div>
                  <div className="white flame"></div>
                  <div className="blue circle"></div>
                <div className="black circle"></div>
              </div> )})()*/}
         
      {/*<img className="log" src='img/log.svg'/> */}
    </div>
  </div>
    )
  }
}

export default Fire;