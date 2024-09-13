import React from 'react';
import './studentCard.css';
import PetitionSuns from '../../student/student-profile/PetitionSuns';
import { useNavigate } from 'react-router-dom';

const StudentCard = ({ student }) => {
  const { studentId, lastName, firstName, middle_name, date_of_birth, group_number } = student;

  const navigate = useNavigate();

  const handleNavigate = (path) => () => {
    navigate(path);
  };

  const dateParts = date_of_birth ? date_of_birth.split('-') : ["", "", ""];
  const utcDate = dateParts[0] && dateParts[1] && dateParts[2] ? new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2])) : null;
  
  if (utcDate) {
    utcDate.setUTCDate(utcDate.getUTCDate() + 1);
  }

  const formattedDate = utcDate ? utcDate.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }) : "";

  return (
    <div className="student-card" onClick={handleNavigate(`/secretary/students/student-details/${studentId}`)}>
      <div className="student-info">
        
        <div className="student-details">
        <div className="student-name">{`${lastName} ${firstName} ${middle_name}`}</div>
          <div><strong>Дата рождения:</strong> {formattedDate}</div>
          <div><strong>Группа:</strong> {group_number}</div>
        </div>
        <div className='sun-comp'>
          <PetitionSuns  studentId={studentId}/>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;