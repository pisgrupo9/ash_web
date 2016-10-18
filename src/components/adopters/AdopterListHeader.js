import React, { PropTypes } from 'react';
import AddAdopterButton from './AddAdopterButton';
import AdopterSearch from './AdopterSearch';
import '../../styles/animal-list.scss';

const AdopterListHeader = ({ showBlacklist, onToggleSearch, startLoading }) => {
  const buttonBlacklist = (<button className="button-list" onClick={onToggleSearch}>
                              <p> Ver Blacklisted </p>
                            </button>);
  const buttonShowAll = (<button className="button-list" onClick={onToggleSearch}>
                              <p> Ver Todos </p>
                            </button>);
  return (
      <div className="animal-header">
        <div className="animal-header-title section-title">
          LISTADO
          <div className="list-button-container">
            {showBlacklist ? buttonShowAll : buttonBlacklist}
          </div>
        </div>
        <div className="float-right">
          <AddAdopterButton />
          <AdopterSearch startLoading={startLoading}/>
        </div>
      </div>
  );
};

const { func, bool } = PropTypes;

AdopterListHeader.propTypes = {
  showBlacklist: bool.isRequired,
  onToggleSearch: func.isRequired,
  startLoading: func.isRequired
};

export default AdopterListHeader;
