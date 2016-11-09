import React from 'react';
import AddAdopterButton from './AddAdopterButton';
import '../../styles/animal-list.scss';

const AdopterListHeader = () => {
  return (
      <div className="animal-header">
        <div className="animal-header-title section-title adopter">
          LISTADO
          <div className="float-right">
            <AddAdopterButton />
          </div>
        </div>
      </div>
  );
};

export default AdopterListHeader;
