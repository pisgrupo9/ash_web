import React, { PropTypes } from 'react';
import Spinner from 'react-spinkit';

const SpinnerComponent = ({ active }) => {
    return (
        <div className={active ? 'spinner-div' : 'hide'}>
          <div className="spinner-icon">
            <Spinner spinnerName="three-bounce" noFadeIn />
          </div>
        </div>
    );
};

const { bool } = PropTypes;

SpinnerComponent.propTypes = {
  active: bool
};

export default SpinnerComponent;
