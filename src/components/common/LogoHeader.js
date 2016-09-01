import React, { PropTypes } from 'react';
import '../../styles/logo-header.scss';

const LogoHeader = ({ title }) => {
  return (
    <div className="contenedor-header">
      <img className="image-header" src="https://s3-sa-east-1.amazonaws.com/ash-assets/logo-dos.png" />
      <p className="title-header dark-grey-color">{title.text}</p>
    </div>
  );
};

const { object } = PropTypes;

LogoHeader.propTypes = {
  title: object.isRequired
};

export default LogoHeader;
