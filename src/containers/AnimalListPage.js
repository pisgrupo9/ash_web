import React from 'react';
import AnimalListWrapper from '../components/animals/AnimalListWrapper';
import '../styles/animal-list.scss';
import AnimalFilters from '../components/animals/AnimalFilters';
import { StickyContainer, Sticky } from 'react-sticky';

const AnimalListPage = () => {
  return (
    <div className="list-flex">
      <StickyContainer className="filter-section">
        <Sticky>
          <AnimalFilters/>
        </Sticky>
      </StickyContainer>
      <div className="wrapper-flex">
        <AnimalListWrapper />
      </div>
    </div>
  );
};

export default AnimalListPage;
