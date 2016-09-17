import React, { Component } from 'react';
import { connect } from 'react-redux';

class PerfilPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <p>Proximamente Perfil</p>
      </div>
    );
  }
}

const mapState = () => ({});

export default connect(mapState)(PerfilPage);
