import React, {Component} from 'react';

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


