import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class Download extends Component {
  render() {
    let { url } = this.props.download;
    if (url) {
      const activeLink = () => {
          document.getElementById('downloadFiled').click();
        };
      setTimeout(activeLink, 500);
    }
    return (
      <div className="hiden">
        <a id="downloadFiled" href={url} download="yourfilename">downloadFiled</a>
      </div>
     );
  }
}

const { object } = PropTypes;

Download.propTypes = {
  download: object.isRequired
};

const mapState = (state) => ({
  download: state.download
});

export default connect(mapState)(Download);
