import React, {Component} from 'react';
import Velocity from 'velocity-animate';
import ReactDom from 'react-dom';

class PageContainer extends Component {
	constructor(props){
		super(props)
		this.ribbon = null;
		this.state = {
			mounted: false,
			startStyles: {
				'translateX': '100%'
			},
			endStyles: {
				'translateX': 0
			},
			easing: 'swing',
			duration: 800,
			callback: function() {

			}
		};
	}
	componentWillMount() {
		this.setState(this.props);
	}
	componentDidMount() {
		var me = this;

		// Hook styles
		for (var key in this.state.startStyles) {
			Velocity.hook(ReactDom.findDOMNode(this), key, this.state.startStyles[key]);
		}

		this.setState({ mounted: true });
		ReactDom.findDOMNode(this).style.display = 'block';

		var options = {
			duration: this.state.duration,
			easing: this.state.easing,
			complete: function () {
				ReactDom.findDOMNode(me).classList.add('loaded-page');
				me.state.callback();
			}
		};

		Velocity(ReactDom.findDOMNode(this),
			this.state.endStyles,
			options
		);
	}


	render() {
		var child;
		var classString = 'page-content ' + this.props.className;
		if(this.state.mounted){
			child = (<div>{this.props.children}</div>);
		}
		return (
			<section className="page-content" style={{display: 'none'}}>
				{child}
			</section>
		);
	}
};

export default PageContainer;
