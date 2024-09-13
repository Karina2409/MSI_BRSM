import React from 'react';
import '../../student/my-event/eventCard.css';

const SecretaryEventCard = ({ event }) => {
  const { image, title, date, time, location, experience, petition } = event;

  const eventDate = new Date(date);

  return (
    <div className="event-card">
      <table className='table-event-card'>
        <tbody>
          <tr>
              <td rowSpan="6"><img src={image} alt={title} className="event-image" /></td>
              <td className='bold-text'>Название:</td>
              <td>{title}</td>
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

export default SecretaryEventCard;