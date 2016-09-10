import React, { Component } from 'react';
import { connect } from 'react-redux';


class AdoptantesPage extends Component {
  constructor(props, context){
    super(props, context);
  }
  
  render (){
    return(
      <div>
        <p>Proximamente Adoptantes</p>
      </div>
    );
  }
}

const mapState = () => ({});

export default connect(mapState)(AdoptantesPage);
