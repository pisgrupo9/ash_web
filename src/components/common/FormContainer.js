import React, { Component,PropTypes } from 'react';
import '../../styles/formContainer.scss';

class FormContainer extends Component{
    constructor(props, context) {
      super(props, context);
    }
   render() {
      return (
       <div className="form-container" >
        {this.props.children}
       </div>
      );
    }
}

const { object } = PropTypes;

FormContainer.propTypes = {
  children: object.isRequired
};

export default FormContainer;
