import React, { PropTypes } from 'react';
import ReportItem from './ReportItem';
import Spinner from '../common/SpinnerComponent';

const ReportList = ({ reports, loading }) => {
  let reportList;
  if (reports.length) {
    reportList = reports.map(report => {
      return (
        <ReportItem report={report} key={report.name+report.generated_date}/>
      );
    });
  } else {
    reportList =(<div className="no-result-search">NO SE ENCONTRARON REPORTES</div>);
  }

  return (
     <div className="report-table" >
      <div className="report-titles-container title">
        <div className="report-inside">FECHA</div>
        <div className="report-inside">NOMBRE</div>
        <div className="report-inside-type">TIPO</div>
        <div className="report-inside">ESTADO</div>
      </div>
      {loading ? <Spinner active={loading} /> :
        reportList
      }
    </div>
  );
};

const { array, bool } = PropTypes;

ReportList.propTypes = {
  reports: array.isRequired,
  loading: bool
};

export default ReportList;
