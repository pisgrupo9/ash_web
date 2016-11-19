import React, { PropTypes } from 'react';
import * as constants from '../../constants/apiConstants';
import '../../styles/logo-header.scss';

const LogoHeader = (props) => {
  return (
    <div className="contenedor-header">
      <img className="image-header" src={`${constants.STATIC_RESOURCE}/ash-assets/logo-dos.png`}/>
      <p className="title-header dark-grey-color">{props.title}</p>
    </div>
  );
};

const { string } = PropTypes;

LogoHeader.propTypes = {
  title: string.isRequired
};

export default LogoHeader;
