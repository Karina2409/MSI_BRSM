import React from 'react';
import PropTypes from 'prop-types';

const PetitionCard = ({ petition, onDelete, onDownload }) => {

  const dateParts = petition.petition_date.split('-');
  const utcDate = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));
  
  utcDate.setUTCDate(utcDate.getUTCDate() + 1);

  const formattedDate = utcDate.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const handleDelete = () => {
    onDelete(petition.petitionId);
  };

  const handleDownload = () => {
    onDownload(petition.petitionId)
  };

  return (
    <div className="petition-card">
      <h3>{petition.petition_name}</h3>
      <p>Дата: {formattedDate}</p>
      <p>Факультет студента: {petition.studentFacultyPetition}</p>
      <p>Фамилия студента: {petition.studentLastName}</p>
      <button onClick={handleDownload}>Скачать</button>
      <button onClick={handleDelete} className="delete-button">
        Удалить
      </button>
    </div>
  );
};

PetitionCard.propTypes = {
  petition: PropTypes.shape({
    petitionId: PropTypes.number.isRequired,
    petition_name: PropTypes.string.isRequired,
    petition_date: PropTypes.string.isRequired,
    studentFacultyPetition: PropTypes.string.isRequired,
    studentLastName: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PetitionCard;