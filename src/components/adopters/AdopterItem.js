import React, { PropTypes } from 'react';
import { Collapse } from 'react-bootstrap';
import { Link } from 'react-router';
import MiniAdopterPerfil from './MiniAdopterPerfil';
import '../../styles/animal-perfil.scss';

const AdopterItem = ({ adopter, selectedAdopterId, onClick }) => {

  const focusedbutton = (<i className="material-icons arrow-button">arrow_drop_up</i>);
  const unfocusedbutton = (<i className="material-icons arrow-button">arrow_drop_down</i>);
  const showAdopter = selectedAdopterId === adopter.id.toString();

  return (
    <div>
      <div className={showAdopter ? 'selected-item-container' :'animal-item-container'}>
        <button className="button-show" onClick={() => onClick(adopter.id)}>
          {showAdopter ? focusedbutton : unfocusedbutton}
        </button>
        <div className="adopter-name">
          <Link className="link-style" to={`/adoptantes/${adopter.id}`}>
            <div className={adopter.blacklisted ? "light-red" : ""}>
              {adopter.first_name} {adopter.last_name}
            </div>
          </Link>
        </div>
        <div className="view-interested-icon">
          {adopter.blacklisted ? <i className="material-icons light-red">not_interested</i>
                        : <i className="material-icons dark-grey-color">not_interested</i>
          }
        </div>
      </div>
      <Collapse in={showAdopter}>
        <div className="center-me">
          <MiniAdopterPerfil adopter={adopter} />
        </div>
      </Collapse>
    </div>
  );
};

const { object, string, func } = PropTypes;

AdopterItem.propTypes = {
  adopter: object.isRequired,
  selectedAdopterId: string.isRequired,
  onClick: func.isRequired
};

export default AdopterItem;
