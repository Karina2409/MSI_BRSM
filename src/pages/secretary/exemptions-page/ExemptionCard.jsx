import React from 'react';
import PropTypes from 'prop-types';

const ExemptionCard = ({ exemption, onDelete, onDownload }) => {

  const dateParts = exemption.exemption_date.split('-');
  const utcDate = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));
  
  utcDate.setUTCDate(utcDate.getUTCDate() + 1);

  const formattedDate = utcDate.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const handleDelete = () => {
    onDelete(exemption.exemptionId);
  };

  const handleDownload = () => {
    onDownload(exemption.exemptionId)

  };

  return (
    <div className="exemption-card">
      <h3>{exemption.exemption_name}</h3>
      <p>Дата: {formattedDate}</p>
      <p>Факультет: {exemption.studentsFacultyExemption}</p>
      <p>Мероприятие: {exemption.eventName}</p>
      <button onClick={handleDownload}>Скачать</button>
      <button onClick={handleDelete} className="delete-button">Удалить</button>
    </div>
  );
};

ExemptionCard.propTypes = {
  exemption: PropTypes.shape({
    exemptionId: PropTypes.number.isRequired,
    exemption_name: PropTypes.string.isRequired,
    exemption_date: PropTypes.string.isRequired,
    studentsFacultyExemption: PropTypes.string.isRequired,
    eventName: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ExemptionCard;