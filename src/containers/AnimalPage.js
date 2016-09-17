import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddAnimalButton from '../components/animals/AddAnimalButton';
import { Link } from 'react-router';

class AnimalPage extends Component {
  constructor(props, context){
    super(props, context);
  }
  
  render (){
    return(
      <div>
        <p>Proximamente Animales</p>
        <AddAnimalButton />
        <Link to="perfil-animal/1" className="form-link">
            Animal 1
        </Link>
      </div>
    );
  }
}
  
const mapState = () => ({});

export default connect(mapState)(AnimalPage);
