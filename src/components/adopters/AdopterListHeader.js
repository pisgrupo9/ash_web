import React, { PropTypes } from 'react';
import '../../styles/animal-list.scss';

const AdopterListHeader = ({ onClickBlacklist, showBlacklist, onClickShowAll }) => {
  const buttonBlacklist = (<button className="button-list" onClick={onClickBlacklist}>
                              <p> Ver Blacklisted </p>
                            </button>);
  const buttonShowAll = (<button className="button-list" onClick={onClickShowAll}>
                              <p> Ver Todos </p>
                            </button>);
  return (
    <div>
      <div className="animal-header">
        <div className="animal-header-title section-title">
          LISTADO
          <div className="list-button-container">
            {showBlacklist ? buttonShowAll : buttonBlacklist}
          </div>
        </div>
      </div>
    </div>
  );
};

const { func, bool } = PropTypes;

AdopterListHeader.propTypes = {
  onClickBlacklist: func.isRequired,
  showBlacklist: bool.isRequired,
  onClickShowAll: func.isRequired
};

export default AdopterListHeader;
