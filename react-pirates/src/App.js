import React, { Component } from 'react';
import './App.css';
import Pirate from './Pirate';
import Header from './Header';
import PirateForm from './PirateForm';

class App extends Component {

  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this);
    this.state = {
      pirates: {}
    }
  }

  addPirate(pirate){
    //update state
    const pirates = {...this.state.pirates}
    //add new pirate
    const timestamp = Date.now();
    pirates[`pirate-${timestamp}`] = pirate;
    //set state
    this.setState({ pirates: pirates })
  }

  render() {
    return (
      <div className="App">
      <Header />
      <Pirate tagline="Ahoy there matey!" />
      <PirateForm />
      </div>
      );
  }
}

export default App;







