import React, { PropTypes } from 'react';

const ReportItem = ({ report }) => {

  let estado = (report.state);
  if (report.url) {
    estado = (<a id="downloadFiled"
            href={report.url}
            download="yourfilename">
            {report.state}
            </a>);
  }

  return (
      <div className="report-titles-container-item">
        <div className="report-title-inside">{report.dateTime}</div>
        <div className="report-title-inside">{report.name}</div>
        <div className="report-title-inside-type">{report.type}</div>
        <div className="report-title-inside">{estado}</div>
      </div>
  );
};

const { object } = PropTypes;

ReportItem.propTypes = {
  report: object.isRequired
};

export default ReportItem;
