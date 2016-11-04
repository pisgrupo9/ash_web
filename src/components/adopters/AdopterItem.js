import React, { PropTypes } from 'react';
import { Collapse } from 'react-bootstrap';
import { Link } from 'react-router';
import ReactTooltip from 'react-tooltip';
import MiniAdopterPerfil from './MiniAdopterPerfil';
import '../../styles/animal-perfil.scss';
import * as util from '../../util/validateForm';
import * as message from '../../constants/apiMessage';

const AdopterItem = ({ adopter, selectedAdopterId, onClick, addToBlackList, userPermission }) => {
  const showButton = util.editAdopterPerfil(userPermission);
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
                        : showButton ? <i className="material-icons dark-grey-color cursor-button"
                          onClick={() => addToBlackList(adopter.id, adopter.animals.length)}
                          data-tip data-for="add-blacklist">
                          not_interested</i>
                          : <i className="material-icons dark-grey-color">
                            not_interested</i>
          }
        <ReactTooltip id="add-blacklist" delayShow={500} place="left" type="warning" effect="solid">
          {message.TOOLTIP_ADD_ADOPTER_BLACKLIST}
        </ReactTooltip>
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
  userPermission: string.isRequired,
  selectedAdopterId: string.isRequired,
  onClick: func.isRequired,
  addToBlackList: func.isRequired
};

export default AdopterItem;
