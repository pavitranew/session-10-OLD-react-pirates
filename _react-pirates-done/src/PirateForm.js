import React from 'react';
import AddPirateForm from './AddPirateForm';

class PirateForm extends React.Component {
	render(){
    return (
      <div>
      <h3>Pirate Forms</h3>
      <AddPirateForm addPirate={this.props.addPirate} />
      <button onClick={this.props.loadSamples}>Load Sample Pirates</button>
      </div>
      )
	}
}

export default PirateForm;