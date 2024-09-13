import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './createEventPage.css';

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    eventName: '',
    eventDate: '',
    event_time: '',
    event_place: '',
    student_count: 1,
    opt_count: 0,
    for_petition: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData({
      ...eventData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/events/post', {
        ...eventData,
        eventDate: new Date(eventData.eventDate),
        event_time: `${eventData.event_time}:00`,
      });
      navigate('/secretary/events');
    } catch (error) {
      console.error('Ошибка при создании мероприятия:', error);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };


  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()+1).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="page">
      <button className='back-button' onClick={handleBackClick}>Назад</button>
      <div className='secretary-events-page'>
        <div className="title-events">Создание мероприятия</div>
        <form className="event-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название мероприятия</label>
            <input
              type="text"
              name="eventName"
              value={eventData.eventName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Дата мероприятия</label>
            <input
              type="date"
              name="eventDate"
              value={eventData.eventDate}
              onChange={handleChange}
              required
              min={getCurrentDate()}
            />
          </div>
          <div className="form-group">
            <label>Время мероприятия</label>
            <input
              type="time"
              name="event_time"
              value={eventData.event_time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Место проведения</label>
            <input
              type="text"
              name="event_place"
              value={eventData.event_place}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Количество студентов</label>
            <input
              type="number"
              name="student_count"
              value={eventData.student_count}
              onChange={handleChange}
              required
              min={1}
            />
          </div>
          <div className="form-group">
            <label>ОПТ в часах</label>
            <input
              type="number"
              name="opt_count"
              value={eventData.opt_count}
              onChange={handleChange}
              required
              min={0}
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="for_petition"
                checked={eventData.for_petition}
                onChange={handleChange}
              />
              Для ходатайства
            </label>
          </div>
          <button type="submit" className="submit-button">Создать</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;