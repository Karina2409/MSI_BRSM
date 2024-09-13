import React from 'react';
import '../../student/my-event/eventCard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventCardEvents = ({ event, onEventDeleted  }) => {
  const { image, title, time, location, experience, petition, eventId } = event;
  
  const eventDate = new Date(event.date);
  const now = new Date();

  const navigate = useNavigate();

  const handleNavigate = (path) => (event) => {
    event.stopPropagation();
    navigate(path);
  };

  const handleCardClick = () => {
    navigate(`${eventId}/students`);
  };

  const handleDelete = async (event) => {
    event.stopPropagation();
    try {
      await axios.delete(`http://localhost:8080/events/delete/${eventId}`);
      onEventDeleted(eventId);
    } catch (error) {
      console.error('Ошибка при удалении мероприятия:', error);
    }
  };

  return (
    <div className="event-card" onClick={handleCardClick}>
      <table className='table-event-card'>
        <tbody>
          <tr>
            <td rowSpan="6"><img src={image} alt={title} className="event-image" /></td>
            <td className='bold-text'>Название:</td>
            <td>{title}</td>
            <td rowSpan="3">
              {eventDate > now ? (
                <button 
                  className="event-button" 
                  onClick={handleNavigate(`edit/${eventId}`)}
                >
                  Изменить
                </button>
              ) : (
                <button 
                  className="event-button disabled" 
                  disabled
                >
                  Изменить
                </button>
              )}
            </td>
          </tr>
          <tr>
            <td className='bold-text'>Дата:</td>
            <td>{eventDate.toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</td>
          </tr>
          <tr>
            <td className='bold-text'>Время:</td>
            <td>{time}</td>
          </tr>
          <tr>
            <td className='bold-text'>Место:</td>
            <td>{location}</td>
            <td rowSpan="3">
              <button className="event-button delete-button" onClick={handleDelete}>Удалить</button>
            </td>
          </tr>
          <tr>
            <td className='bold-text'>Опт:</td>
            <td>{experience}</td>
          </tr>
          <tr>
            <td className='bold-text'>Ходатайство:</td>
            <td>{petition}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EventCardEvents;