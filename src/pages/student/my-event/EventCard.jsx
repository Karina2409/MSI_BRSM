import React from 'react';
import './eventCard.css';
import axios from 'axios';

const EventCard = ({ event, userId, isRegistered, onRegister, onUnregister, isProfileComplete }) => {
  const { image, title, time, location, experience, petition, eventId } = event;

  const eventDate = new Date(event.date);
  const now = new Date();

  const handleSignUp = async () => {
    if (!isProfileComplete) {
      alert("Пожалуйста, заполните профиль перед регистрацией на мероприятие.");
      return;
    }
    if (!isRegistered) {
      try {
        await axios.post(`http://localhost:8080/se/${userId}/events/${eventId}`);
        alert('Вы успешно записались на мероприятие!');
        if (onRegister) onRegister(eventId);
      } catch (error) {
        console.error('Ошибка при записи на мероприятие:', error);
        alert('Произошла ошибка при записи на мероприятие.');
      }
    }
  };

  const handleUnsubscribe = async () => {
    if (isRegistered) {
      try {
        await axios.delete(`http://localhost:8080/se/remove/student/${userId}/event/${eventId}`);
        alert('Вы успешно отписались от мероприятия!');
        if (onUnregister) onUnregister(eventId);
      } catch (error) {
        console.error('Ошибка при отписке от мероприятия:', error);
        alert('Произошла ошибка при отписке от мероприятия.');
      }
    }
  };

  return (
    <div className="event-card">
      <table className='table-event-card'>
        <tbody>
          <tr>
              <td rowSpan="6"><img src={image} alt={title} className="event-image" /></td>
              <td className='bold-text'>Название:</td>
              <td>{title}</td>
              <td rowSpan="6">
                {eventDate > now ? (
                  isRegistered ? (
                    <button 
                      className="event-button unsubscribe" 
                      onClick={handleUnsubscribe}
                    >
                      Отписаться
                    </button>
                  ) : (
                    <button 
                      className="event-button" 
                      onClick={handleSignUp}
                    >
                      Записаться
                    </button>
                  )
                ) : (
                  <span></span>
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

export default EventCard;