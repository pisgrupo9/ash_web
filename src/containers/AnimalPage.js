import React, { Component } from 'react';
import { connect } from 'react-redux';


class AnimalPage extends Component {
  constructor(props, context){
    super(props, context);
  }
  
  render (){
    return(
      <div>
        <p>Proximamente Animales</p>
      </div>
    );
  }
}

const mapState = () => ({});

export default connect(mapState)(AnimalPage);
