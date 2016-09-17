import React, { PropTypes } from 'react';
import Spinner from 'react-spinkit';

const SpinnerComponet = ({ active }) => {
    return (
        <div className={active ? 'spinner-div' : 'hide'}>
          <div className="spinner-icon">
            <Spinner spinnerName="three-bounce" noFadeIn />
          </div>
        </div>
    );
};

const { bool } = PropTypes;

SpinnerComponet.propTypes = {
  active: bool
};

export default SpinnerComponet;
