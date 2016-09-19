import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const AnimalList = ({ animals }) => {
  return (
    <div>
      { animals.map(animal => {
        return (
          <Link className="form-link" to={`/animales/${animal.id}`} key={animal.id}>
            <p>{`${animal.name}, Id: ${animal.id}`}</p>
          </Link>
        );
      })}
    </div>
  );
};

const { array } = PropTypes;

AnimalList.propTypes = {
  animals: array.isRequired
};

export default AnimalList;
