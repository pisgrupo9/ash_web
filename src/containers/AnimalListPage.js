import React from 'react';
import AnimalListWrapper from '../components/animals/AnimalListWrapper';
import '../styles/animal-list.scss';

const AnimalListPage = () => {
    return (
      <div className="list-flex">
        <div className="filter-section">
          <div className="filter-div">
            <p>Filtros coming soon</p>
          </div>
        </div>
        <div className="wrapper-flex">
          <AnimalListWrapper />
        </div>
      </div>
    );
};

export default AnimalListPage;
