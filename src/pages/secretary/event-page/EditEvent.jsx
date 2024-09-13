import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './editEvent.css';

const EditEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    eventName: '',
    eventDate: '',
    event_time: '',
    event_place: '',
    opt_count: '',
    for_petition: false
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных мероприятия:', error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/events/event/update/${eventId}`, event);
      navigate('/secretary/events');
    } catch (error) {
      console.error('Ошибка при обновлении мероприятия:', error);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="page">
      <button className='back-button' onClick={handleBackClick}>Назад</button>
      <h2 className='title'>Изменить мероприятие</h2>
      <div className='edit-event-page'>
        
        <form onSubmit={handleSubmit} className="edit-event-form">
          <label>
            Название:
            <input
              type="text"
              name="eventName"
              value={event.eventName}
              onChange={handleChange}
            />
          </label>
          <label>
            Дата:
            <input
              type="date"
              name="eventDate"
              value={event.eventDate}
              onChange={handleChange}
            />
          </label>
          <label>
            Время:
            <input
              type="time"
              name="event_time"
              value={event.event_time}
              onChange={handleChange}
            />
          </label>
          <label>
            Место:
            <input
              type="text"
              name="event_place"
              value={event.event_place}
              onChange={handleChange}
            />
          </label>
          <label>
            Опт:
            <input
              type="number"
              name="opt_count"
              value={event.opt_count}
              onChange={handleChange}
            />
          </label>
          <label>
            Ходатайство:
            <input
              type="checkbox"
              name="for_petition"
              checked={event.for_petition}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Сохранить изменения</button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;