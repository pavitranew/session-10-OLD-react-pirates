import React, { Component } from 'react';
import Header from './Header';
import Pirate from './Pirate';
import PirateForm from './PirateForm';
import './css/App.css';
import samplePirates from './sample-pirates'

class App extends React.Component {

  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
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
    this.setState({ pirates })
  }

  loadSamples(){
    this.setState({
      pirates: samplePirates
    })
  }

  render() {
    return (
      <div className="App">
      <Header />
      <ul>
      {
        Object
        .keys(this.state.pirates)
        .map( key => <Pirate key={key} details={this.state.pirates[key]} /> )
      }
      </ul>
      <PirateForm addPirate={this.addPirate} loadSamples={this.loadSamples} />
      </div>
      );
  }
}

export default App;
