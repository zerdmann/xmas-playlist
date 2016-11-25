import React, {Component} from 'react';
import auth from './auth'
import {browserHistory} from 'react-router';
import PageContainer from './lib/page_container';
import Velocity from 'velocity-animate';
import ReactDOM from 'react-dom';


class Login extends Component {
	constructor(props) {
		super(props);
		this.login = this.login.bind(this);
		this.handleChange = this.handleChange.bind(this)
		this.ribbon = null;
		this.tag = null;
		this.unfurlRibbon = this.unfurlRibbon.bind(this)
		this.state = {
			secret: 'unrwap me' 
		}
	}

	handleChange(event){
		this.setState({secret:(event.target.value).toLowerCase()})

	}

	login(event)
	{	
		console.log('login attempt', {this, event},this.state.secret)
		if(event.key === 'Enter' && auth.login(this.state.secret))
		{
				console.log('valid login!')
				Velocity(
				ReactDOM.findDOMNode(this),
				{'translateY': '100vw'},
				{
					duration: 800,
					easing: "swing",
					complete: () => {
					browserHistory.push('/');
					}
				}
			);
			Velocity(this.ribbon, 'stop', true);
			Velocity(this.tag, 'stop', true);
			Velocity.Utilities.removeData(this.ribbon, ['velocity', 'fxqueue']);
			Velocity.Utilities.removeData(this.tag, ['velocity', 'fxqueue']);
			Velocity.Utilities.removeData(ReactDOM.findDOMNode(this), ['velocity', 'fxqueue']);
		}
	}



	unfurlRibbon(){		
		Velocity(this.ribbon,
			{'translateX': '0'},
			{
				duration: 500,
				delay:300,
				easing: "swing",
			}
		);
		let tagOpts = (window.innerWidth > 768) 
		?   {
		      'opacity': '1',
			  'rotateZ':'8deg'
			} 
		:   {
			'opacity': '1',
		    }
		Velocity(this.tag,
			tagOpts,
			{
				duration: 700,
				delay:300,
				easing: "swing",
			}
		);

	}

	componentWillMount() {
		// console.log(this.props)
	}

	componentDidMount() {
	}

	componentWillUnmount() {

	}

  render() {
  	    let startStyles = {
           'translateY': '100vh'
        };

        let endStyles = {
          'translateY': 0
        };
        let numRows = Math.trunc(window.innerHeight / 105);
        let numTrees = Math.trunc(window.innerWidth / 40);
        // console.log({numRows, numTrees})
        let makeTrees = function(r){
        	let rows = [], i = 0, len = numTrees
        	while (++i <= len) {
      			rows.push(<div className="tree" key={'row'+r+'tree'+i}></div>)
    		}
    		return rows;
        }


    return (
       <PageContainer startStyles={startStyles} endStyles={endStyles} callback={this.unfurlRibbon}><div className="full-bleed">	
       <div ref={((r) => { this.ribbon = r; }).bind(this)} className="ribbon"></div>
		<div ref={((r) => { this.tag = r;}).bind(this)} className="tag">
			<div><span>To: the internet</span>
			<span>From: @zerdmann</span>
			<input type="text" onKeyPress={this.login} onChange={this.handleChange} onFocus={(()=>{if(this.state.secret === 'unrwap me') this.setState({secret:''})}).bind(this)} value={this.state.secret}/></div>
		</div>
		<div onClick={this.login.bind(this,{key:"Enter"})} className="open">Open</div>
         <div className='treeWrapper'>{[...Array(numRows)].map((x, i) =>
   				 <div className="row" key={i + 1}>{makeTrees(i)}</div>
  		  )}</div></div></PageContainer>
    )
  }
}

export default Login;