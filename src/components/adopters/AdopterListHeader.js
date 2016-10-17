import React, { PropTypes } from 'react';
import AddAdopterButton from './AddAdopterButton';
import '../../styles/animal-list.scss';

const AdopterListHeader = ({ showBlacklist, onToggleSearch }) => {
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
          <AddAdopterButton />
          <div className="list-button-container">
            {showBlacklist ? buttonShowAll : buttonBlacklist}
          </div>
        </div>
      </div>
  );
};

const { func, bool } = PropTypes;

AdopterListHeader.propTypes = {
  showBlacklist: bool.isRequired,
  onToggleSearch: func.isRequired
};

export default AdopterListHeader;
