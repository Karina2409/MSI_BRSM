import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './eventStudents.css';
import StudentCard from '../students-page/StudentCard';
import { useNavigate } from 'react-router-dom';

const EventStudents = () => {
  const { eventId } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/events/${eventId}/students`);
        setStudents(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных студентов:', error);
      }
    };

    fetchStudents();
  }, [eventId]);

  const navigate = useNavigate();

  const handleNavigate = (path) => () => {
    navigate(path);
  };

  return (
    <div className='page'>
      <button className='back-button' onClick={handleNavigate(-1)}>Назад</button>
      <h2 className='title'>Студенты, записанные на мероприятие</h2>
      <div>
        {students.length === 0 ? (
          <p>Нет студентов для отображения</p>
        ) : (
          <ul className="students-list-event">
            {students.map(student => (
              <StudentCard key={student.studentId} student={student} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EventStudents;