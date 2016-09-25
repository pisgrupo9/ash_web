import React from 'react';
import * as messages from '../../constants/apiMessage';

const UploadImageMessage = () => {
      return (<div className="loading-container">
                <span className="loading-text">{messages.CARGANDO_IMAGEN}</span>
                <div className="loading-images">
                  <i className="material-icons loading-icon">pets</i>
                </div>
              </div>);
  };

export default UploadImageMessage;
