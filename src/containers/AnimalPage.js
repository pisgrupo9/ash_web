import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddAnimalButton from '../components/animals/AddAnimalButton';

class AnimalPage extends Component {
  constructor(props, context){
    super(props, context);
  }
  
  render (){
    return(
      <div>
        <p>Proximamente Animales</p>
        <AddAnimalButton />
      </div>
    );
  }
}

const mapState = () => ({});

export default connect(mapState)(AnimalPage);
