import React, { Component } from 'react'
import Pirate from './Pirate'
import Header from './Header'
import PirateForm from './PirateForm'
import piratesFile from './data/sample-pirates'

class App extends Component {

  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this)
    this.loadSamples = this.loadSamples.bind(this)
    this.removePirate = this.removePirate.bind(this)
    this.state = {
      pirates: {}
    }
  }

  addPirate(pirate){
    //update state
    const pirates = {...this.state.pirates}
    //add new pirate
    const timestamp = Date.now()
    pirates[`pirate-${timestamp}`] = pirate
    //set state
    this.setState({ pirates: pirates })
  }

  loadSamples(){
    this.setState({
      pirates: piratesFile
    })
  }

  removePirate(key){
    const pirates = {...this.state.pirates}
    delete pirates[key]
    this.setState({pirates})
  }

  render() {
    return (
      <div className="App">
      <Header />
      <div className="pirate">
      {
        Object
        .keys(this.state.pirates)
        .map( key => <Pirate key={key} 
          index={key}
          details={this.state.pirates[key]}
          removePirate={this.removePirate} /> )
      }
      </div>
      <PirateForm addPirate={this.addPirate} 
      loadSamples={this.loadSamples} 
      removePirate={this.removePirate}  />
      </div>
      );
  }
}

export default App;







