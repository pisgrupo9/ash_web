import React from 'react';
import AnimalListWrapper from '../components/animals/AnimalListWrapper';
import '../styles/animal-list.scss';
import AnimalFilters from '../components/animals/AnimalFilters';

const AnimalListPage = () => {
    return (
      <div className="list-flex">
        <div className="filter-section">
            <AnimalFilters/>
        </div>
        <div className="wrapper-flex">
          <AnimalListWrapper />
        </div>
      </div>
    );
};

export default AnimalListPage;
