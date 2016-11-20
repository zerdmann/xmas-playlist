import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import auth from './auth';

class App extends Component {
   constructor(props) {
    super(props);

  }

  componentWillMount() {
  }

  render() {
    return (
      <div>{React.cloneElement(this.props.children, {...this.state})}</div>
    )
  }
}

export default App;


