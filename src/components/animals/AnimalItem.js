import React, { PropTypes } from 'react';
import { Collapse, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router';
import MiniInfoPerfil from './MiniInfoPerfil';
import _ from 'lodash';
import '../../styles/animal-perfil.scss';

const AnimalItem = ({ animal, selectedAnimalId, checkedAnimals, onClick, onCheck }) => {

  const focusedbutton = (<i className="material-icons arrow-button">arrow_drop_up</i>);
  const unfocusedbutton = (<i className="material-icons arrow-button">arrow_drop_down</i>);
  const showAnimal = selectedAnimalId === animal.id.toString();
  const adopt = (<div className="adopted-animal"> ADOPTADO </div>);
  const notAdopt = (<div className="not-adopted-animal"> EN ADOPCIÓN </div>);
  const linkIcon = (
    <Link className="link-style" to={`/animales/${animal.id}`}>
      <i className="material-icons dark-grey-color">description</i>
    </Link>
  );
  const findAnimal = () => {
    return _.indexOf(checkedAnimals, animal.id);
    /*return _.findIndex(checkedAnimals, function(o) {
      return o === animal.id;
    });*/
  };
  const isChecked = findAnimal() !== -1;
  const checkAnimal = (
    <Checkbox className="adopt-checkbox"
              name="checkedAnimal"
              onChange={() => onCheck(animal.id)}
              checked={isChecked}/>
  );

  return (
    <div>
      <div className={showAnimal ? 'selected-item-container' :'animal-item-container'}>
        <button className="button-show" onClick={() => onClick(animal.id)}>
          {showAnimal ? focusedbutton : unfocusedbutton}
        </button>
        <div className="animal-name">
          <Link className="link-style" to={`/animales/${animal.id}`}>
            {animal.name}
          </Link>
        </div>
        <div className="animal-state not-so-dark-grey-color"> {animal.species} </div>
        <div className="animal-state"> {animal.id % 2 === 1 ? adopt : notAdopt} </div>
        <div className="view-info-icon">
          {onCheck ? checkAnimal : linkIcon}
        </div>
      </div>
      <Collapse in={showAnimal}>
        <div className="center-me">
          <MiniInfoPerfil animal={animal} />
        </div>
      </Collapse>
    </div>
  );
};

const { object, string, func, array } = PropTypes;

AnimalItem.propTypes = {
  animal: object.isRequired,
  selectedAnimalId: string.isRequired,
  checkedAnimals: array,
  onClick: func.isRequired,
  onCheck: func
};

export default AnimalItem;
