import React, { PropTypes } from 'react';
import ReportItem from './ReportItem';

const ReportList = ({ reports }) => {

  return (
     <div className="report-table" >
      <div className="report-titles-container">
        <div className="report-title-inside">FECHA</div>
        <div className="report-title-inside">NOMBRE</div>
        <div className="report-title-inside-type">TIPO</div>
        <div className="report-title-inside">ESTADO</div>
      </div>
      { reports.map(report => {
          return (<ReportItem report={report} key={report.fecha}/>);
      })}
    </div>
  );
};

const { array } = PropTypes;

ReportList.propTypes = {
  reports: array.isRequired,
};

export default ReportList;
