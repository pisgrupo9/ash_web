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
            <div className="center tabel-div adopter">
              <table className="table-borderless">
                <tbody>
                 <tr>
                    <td><b>NOMBRE:</b></td>
                    <td><b>{`${adopter.first_name} ${adopter.last_name}`}</b></td>
                  </tr>
                  <tr>
                    <td>CI:</td>
                    <td>{adopter.ci}</td>
                  </tr>
                  <tr>
                    <td>EMAIL:</td>
                    <td>{adopter.email ? adopter.email : '-'}</td>
                  </tr>
                  <tr>
                    <td>TELEFONO:</td>
                    <td>{adopter.phone ? adopter.phone : '-'}</td>
                  </tr>
                  <tr>
                    <td>DIRECCIÓN:</td>
                    <td>{adopter.home_address ? adopter.home_address : '-'}</td>
                  </tr>
                  <tr>
                    <td>LISTA NEGRA:</td>
                    <td>{adopter.blacklisted ? <b> SI </b> : 'NO'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="house-des">
              <p className="black-color">DESCRIPCIÓN CASA</p>
              {adopter.house_description}
            </div>
            {!adopter.blacklisted && <AddToBlackListButton loading={loadingFunc} adopterId={adopterId}/>}
            <EditAdopterButton adopter={adopter} loading={loadingFunc} adopterId={adopterId}/>
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
