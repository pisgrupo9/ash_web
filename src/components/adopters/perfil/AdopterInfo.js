import React, { PropTypes } from 'react';
import Spinner from '../../common/SpinnerComponent';
import StickyResponsive from '../../common/StickyResponsive';
import EditAdopterButton from './EditAdopterButton';
import AddToBlackListButton from './AddToBlackListButton';

const AdopterInfo = ({ adopter, loading, styleClass, loadingFunc, adopterId }) => {
  return (
    <div className={`${styleClass} perfil-box`}>
      { loading ? (<Spinner active={loading} />) : (
      <div>
        <StickyResponsive>
          <div>
            <div className="adopter-info-row">
              <p className="row-title"><b>NOMBRE:</b></p>
              <p><b>{`${adopter.first_name} ${adopter.last_name}`}</b></p>
            </div>
            <div className="adopter-info-row">
              <p className="row-title">CI:</p>
              <p>{adopter.ci}</p>
            </div>
            <div className="adopter-info-row">
              <p className="row-title">EMAIL:</p>
              <p>{adopter.email ? adopter.email : '-'}</p>
            </div>
            <div className="adopter-info-row">
              <p className="row-title">TELEFONO:</p>
              <p>{adopter.phone ? adopter.phone : '-'}</p>
            </div>
            <div className="adopter-info-row">
              <p className="row-title">DIRECCIÓN:</p>
              <p>{adopter.home_address ? adopter.home_address : '-'}</p>
            </div>
            <div className="adopter-info-row">
              <p className="row-title">LISTA NEGRA:</p>
              <p>{adopter.blacklisted ? <b> SI </b> : 'NO'}</p>
            </div>
            <div className="house-des">
              <p className="black-color">DESCRIPCIÓN CASA</p>
              <p>{adopter.house_description}</p>
            </div>
            <div className="acction-button">
              <EditAdopterButton adopter={adopter} loading={loadingFunc} adopterId={adopterId}/>
              {!adopter.blacklisted && <AddToBlackListButton loading={loadingFunc} adopterId={adopterId}/>}
            </div>
          </div>
        </StickyResponsive>
      </div>
      )}
    </div>
  );
};

const { object, string, bool, func } = PropTypes;

AdopterInfo.propTypes = {
  adopter: object.isRequired,
  adopterId: string.isRequired,
  loading: bool.isRequired,
  styleClass: string,
  loadingFunc: func.isRequired
};

export default AdopterInfo;
