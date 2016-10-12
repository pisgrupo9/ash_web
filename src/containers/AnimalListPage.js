import React from 'react';
import AnimalListWrapper from '../components/animals/AnimalListWrapper';
import '../styles/animal-list.scss';
import AnimalFilters from '../components/animals/AnimalFilters';
import { StickyContainer } from 'react-sticky';
import StickyResponsive from '../components/common/StickyResponsive';

const AnimalListPage = () => {
  return (
    <div className="list-flex">
      <StickyContainer className="filter-section">
        <StickyResponsive>
          <AnimalFilters/>
        </StickyResponsive>
      </StickyContainer>
      <div className="wrapper-flex">
        <AnimalListWrapper />
      </div>
    </div>
  );
};

export default AnimalListPage;
