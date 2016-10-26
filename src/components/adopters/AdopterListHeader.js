import React, { PropTypes } from 'react';
import AddAdopterButton from './AddAdopterButton';
import AdopterSearch from './AdopterSearch';
import '../../styles/animal-list.scss';

const AdopterListHeader = ({ startLoading }) => {
  return (
      <div className="animal-header">
        <div className="animal-header-title section-title adopter">
          LISTADO
          <div className="float-right">
            <AddAdopterButton />
          </div>
        </div>
        <div className="float-right">
          <AdopterSearch startLoading={startLoading}/>
        </div>
      </div>
  );
};

const { func } = PropTypes;

AdopterListHeader.propTypes = {
  startLoading: func.isRequired
};

export default AdopterListHeader;
