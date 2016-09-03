// This component handles the App template used on every page.
import React, { Component, PropTypes } from 'react';
import Footer from './common/Footer.js';

const { object } = PropTypes;

class App extends Component {
  render() {
    const footerText = 'Animales Sin Hogar - Asociación Civil sin fines de lucro. - Personería Jurídica 9985';
    return (
      <div>
        <div className="content">
          {this.props.children}
        </div>
        <Footer text={footerText} />
      </div>
    );
  }
}

App.propTypes = {
  children: object.isRequired
};

export default App;
