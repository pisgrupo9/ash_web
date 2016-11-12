import React, { PropTypes } from 'react';

const Legend = ({ info }) => {
  return (
    <div className="legend-container">
      {info.map(infoItem => {
        let color = infoItem.color;
        let label = infoItem.label;
        return (<div className="legend-item" key={label}>
                  <i className="material-icons color-round" style={{ color }}>fiber_manual_record</i> {label}
                </div>);
      })}
    </div>
  );
};

const { array } = PropTypes;

Legend.propTypes = {
  info: array.isRequired
};

export default Legend;
