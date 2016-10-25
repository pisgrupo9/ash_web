import React, { PropTypes } from 'react';
import AddAnimalButton from './AddAnimalButton.js';
import { ButtonGroup, Button } from 'react-bootstrap';

const AnimalListHeader = ({ exportXLS, exportPDF }) => {
  return (
    <div>
      <div className="animal-header">
        <div className="animal-header-title section-title">
            <p>LISTADO
            <ButtonGroup className="list-export-group">
              <Button
                className="btn btn-export bg-orange-color"
                onClick={exportPDF}>PDF
              </Button>
              <Button
                className="btn btn-export bg-dark-grey-color"
                onClick={exportXLS}>XLS
              </Button>
            </ButtonGroup>
            </p>
        </div>
        <div className="float-right"><AddAnimalButton /></div>
      </div>
    </div>
  );
};

const { func } = PropTypes;

AnimalListHeader.propTypes = {
  exportXLS: func.isRequired,
  exportPDF: func.isRequired
};

export default AnimalListHeader;
