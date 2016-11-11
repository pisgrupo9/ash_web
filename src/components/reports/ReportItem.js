import React, { PropTypes } from 'react';
import moment from 'moment';

const ReportItem = ({ report }) => {

  let name = (report.name);
  if (report.url) {
    name = (<a id="downloadFiled" href={report.url} download="yourfilename">
            {report.name}
            </a>);
  }
  let pdf = <div className="report-type-pdf"> PDF </div>;
  let xls = <div className="report-type-xls"> XLS </div>;
  return (
      <div className="report-titles-container-item report-item">
        <div className="report-inside">{moment(report.generated_date).format('D-M-YYYY h:mm:ss')}</div>
        <div className="report-inside">{name}</div>
        <div className="report-inside-type">{report.type_file === 'pdf' ? pdf : xls }</div>
        <div className="report-inside">{report.state}</div>
      </div>
  );
};

const { object } = PropTypes;

ReportItem.propTypes = {
  report: object.isRequired
};

export default ReportItem;
