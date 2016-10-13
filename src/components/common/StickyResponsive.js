import React, { Component, PropTypes } from 'react';
import { Sticky } from 'react-sticky';

class StickyResponsive extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { windowWidth: window.innerWidth };

    this.handleResize = this.handleResize.bind(this);
  }

  handleResize() {
    this.setState({ windowWidth: window.innerWidth });
  }

  render() {
    let { children } = this.props;
    let smallWindows = (this.state.windowWidth <= 541);
    const webView = (
      <Sticky>
        {children}
      </Sticky>
    );

    return (
      <div>
        {smallWindows ? children : webView }
      </div>
    );
  }
}

const { array } = PropTypes;

StickyResponsive.propTypes = {
  children: array.isRequired
};

export default StickyResponsive;
