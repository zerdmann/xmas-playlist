import React, {Component} from 'react';

class Fire extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="grate">
      <img className="grille" src="img/grille.svg"/>
      <div className="oval"></div><div className="rect">
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