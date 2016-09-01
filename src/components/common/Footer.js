import React, { PropTypes } from 'react';

const Footer = (props) => {
  return (
    <div>
      <footer className="footer dark-grey-color">{props.text}</footer>
    </div>
  );
};

const { string } = PropTypes;

Footer.propTypes = {
  text: string.isRequired
};

export default Footer;
