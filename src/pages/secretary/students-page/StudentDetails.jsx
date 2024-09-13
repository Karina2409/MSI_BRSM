import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PetitionSuns from '../../student/student-profile/PetitionSuns';
import './studentDetails.css';
import StudentInfo from '../../student/student-profile/StudentInfo';
import SecretaryEventCard from './SecretaryEventCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentDetails = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  const handleNavigate = (path) => () => {
    navigate(path);
  };

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:8080/students/${studentId}`);
        if (response.ok) {
          const data = await response.json();
          setStudent(data);
        } else {
          console.error('Failed to fetch student data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchStudentEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/students/${studentId}/events`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching student events:', error);
      }
    };

    fetchStudent();
    fetchStudentEvents();
  }, [studentId]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='page'>
        <button className='back-button' onClick={handleNavigate(-1)}>Назад</button>
        <div className='title'>Подробная информация о {student.lastName} {student.firstName}</div>
        <div className='user-info'>
          <div className='cont-1'>
            <StudentInfo student={student} />
          </div>
          <div className='sun-comp-1'>
            <PetitionSuns  studentId={student.studentId}/>
          </div>
        </div>
        <div className='student-events'>
          <h2 className='title'>Мероприятия</h2>
          {events.length > 0 ? (
            events.map(event => (
              <>
                <SecretaryEventCard key={event.eventId} event={transformEvent(event)}  />
              </>
            ))
          ) : (
            <p>Нет мероприятий для отображения</p>
          )}
        </div>
      </div>
    </>
  );
};

const transformEvent = (event) => {
  return {
    image: '/vozlozhenie.jpg',
    title: event.eventName,
    date: event.eventDate,
    time: event.event_time,
    location: event.event_place,
    experience: `${event.opt_count}ч`,
    petition: event.for_petition ? 'Да' : 'Нет',
    eventId: event.eventId
  };
};

export default StudentDetails;