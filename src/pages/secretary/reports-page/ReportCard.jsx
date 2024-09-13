import React from 'react';
import PropTypes from 'prop-types';

const ReportCard = ({ report, onDelete, onDownload }) => {

  const dateParts = report.report_date.split('-');
  const utcDate = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));
  
  utcDate.setUTCDate(utcDate.getUTCDate() + 1);

  const formattedDate = utcDate.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const handleDelete = () => {
    onDelete(report.reportId);
  };

  const handleDownload = () => {
    onDownload(report.reportId)
  };

  return (
    <div className="report-card">
      <h3>{report.report_name}</h3>
      <p>Дата: {formattedDate}</p>
      <p>Номер общежития: {report.dormNumber}</p>
      <button onClick={handleDownload}>Скачать</button>
      <button onClick={handleDelete} className="delete-button">
        Удалить
      </button>
    </div>
  );
};

ReportCard.propTypes = {
  report: PropTypes.shape({
    reportId: PropTypes.number.isRequired,
    report_name: PropTypes.string.isRequired,
    report_date: PropTypes.string.isRequired,
    dormNumber: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ReportCard;