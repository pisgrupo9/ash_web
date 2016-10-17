import React, { PropTypes } from 'react';
import AdopterItem from "./AdopterItem";
import '../../styles/animal-list.scss';
import '../../styles/adopter-list.scss';
import SpinnerComponent from '../common/SpinnerComponent';

const AdopterList = ({ adopters, onClick, selectedAdopterId, showViewMore, onClickViewMore, loading, loadingList }) => {
  const spinner = (<SpinnerComponent active={loading} />);
  const spinnerList = (<SpinnerComponent active={loadingList} />);
  let adopterShowList = adopters.map(adopter => {
          return (
            <AdopterItem adopter={adopter}
                          key={adopter.id}
                          selectedAdopterId={selectedAdopterId}
                          onClick={onClick}/>
            );
        });
  return (
    <div>
      <div className="titles-container">
        <div className="title-inside">NOMBRE</div>
        <div className="title-status">STATUS</div>
      </div>
      { loadingList ? spinnerList :
        <div>
          {adopterShowList}
          <div className="view-more-container">
            {loading ? spinner : showViewMore ?
            <button className="button-show view-more-button" onClick={onClickViewMore}> Ver Más </button>: ''}
          </div>
        </div>}
    </div>
  );
};

const { array, func, string, bool } = PropTypes;

AdopterList.propTypes = {
  adopters: array.isRequired,
  onClick: func.isRequired,
  onClickViewMore: func.isRequired,
  selectedAdopterId: string.isRequired,
  showViewMore: bool.isRequired,
  loading: bool.isRequired,
  loadingList: bool.isRequired
};

export default AdopterList;
