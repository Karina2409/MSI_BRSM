import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const CreateExemptionModal = ({ isOpen, onClose, onSubmit }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/events/past');
        setEvents(response.data);
      } catch (error) {
        console.error('Ошибка при получении мероприятий:', error);
      }
    };

    if (isOpen) {
      fetchEvents();
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedEvent) {
      const fetchStudents = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/events/${selectedEvent}/students`);
          setStudents(response.data);
        } catch (error) {
          console.error('Ошибка при получении списка студентов:', error);
        }
      };

      fetchStudents();
    }
  }, [selectedEvent]);

  const handleEventChange = (e) => {
    setSelectedEvent(e.target.value);
    setSelectedStudents([]);
  };

  const handleStudentChange = (e) => {
    const { value, checked } = e.target;
    setSelectedStudents((prevSelected) =>
      checked ? [...prevSelected, value] : prevSelected.filter((id) => id !== value)
    );
  };

  const handleSelectAll = (e) => {
    setSelectedStudents(e.target.checked ? students.map((student) => student.studentId.toString()) : []);
  };

  const handleSubmit = async () => {
    console.log('Submitting exemption with eventId:', selectedEvent, 'and studentIds:', selectedStudents);
    onSubmit({ eventId: selectedEvent, studentIds: selectedStudents });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-exemption">
      <div className="modal-content-exemption">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Создать освобождение</h2>
        <div className="form-group-exemption">
          <label htmlFor="event">Выберите мероприятие:</label>
          <select id="event" value={selectedEvent} onChange={handleEventChange}>
            <option value="" disabled>
              Выберите мероприятие
            </option>
            {events.map((event) => (
              <option key={event.eventId} value={event.eventId}>
                {event.eventName}
              </option>
            ))}
          </select>
        </div>
        {selectedEvent && (
          <div className="form-group-exemption">
            <label>Выберите студентов:</label>
            <div>
              <input
                type="checkbox"
                id="select-all"
                checked={selectedStudents.length === students.length}
                onChange={handleSelectAll}
              />
              <label htmlFor="select-all">Выбрать всех</label>
            </div>
            <div className="students-list-exemption">
              {students.map((student) => (
                <div key={student.studentId}>
                  <input
                    type="checkbox"
                    id={`student-${student.studentId}`}
                    value={student.studentId}
                    checked={selectedStudents.includes(student.studentId.toString())}
                    onChange={handleStudentChange}
                  />
                  <label htmlFor={`student-${student.studentId}`}>{student.lastName} {student.firstName} {student.middle_name}</label>
                </div>
              ))}
            </div>
          </div>
        )}
        <button onClick={handleSubmit}>Сформировать</button>
      </div>
    </div>
  );
};

CreateExemptionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateExemptionModal;