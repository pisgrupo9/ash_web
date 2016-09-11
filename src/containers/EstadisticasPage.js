import React, { Component } from 'react';
import { connect } from 'react-redux';

class EstadisticasPage extends Component {
  constructor(props, context){
    super(props, context);
  }
  
  render (){
    return(
      <div>
        <p>Proximamente Estadisticas</p>
      </div>
    );
  }
}

const { object } = PropTypes;

EstadisticasPage.propTypes = {
  location : object.isRequired,
  user : object.isRequired
};

EstadisticasPage.contextTypes = {
  router: object
};

const mapState = () => ({});

export default connect(mapState)(EstadisticasPage);
