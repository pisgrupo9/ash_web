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

const { object } = PropTypes;

AnimalPage.propTypes = {
  location : object.isRequired,
  user : object.isRequired
};

AnimalPage.contextTypes = {
  router: object
};

const mapState = () => ({});

export default connect(mapState)(AnimalPage);
