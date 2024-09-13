import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCardEvents from './EventCardEvents';
import './eventsPage.css';
import { useNavigate } from 'react-router-dom';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const navigate = useNavigate();

  const handleNavigate = (path) => () => {
    navigate(path);
  };


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных мероприятий:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleEventDeleted = (deletedEventId) => {
    setEvents(events.filter(event => event.eventId !== deletedEventId));
  };

  const filteredEvents = events
    .filter(event => event.eventName && event.eventName.toLowerCase().startsWith(searchTitle.toLowerCase()))
    .filter(event => {
      if (!startDate && !endDate) return true;
      const eventDate = new Date(event.eventDate);
      const start = startDate ? new Date(startDate) : new Date(-8640000000000000);
      const end = endDate ? new Date(endDate) : new Date(8640000000000000);
      return eventDate >= start && eventDate <= end;
    })
    .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));

  return (
    <div className="page">
      <div className="title">Мероприятия</div>
      <div className="controls">
        <div className="search-event">
          <input
            type="text"
            placeholder="Введите название мероприятия"
            value={searchTitle}
            onChange={handleSearchChange}
          />
        </div>
        <button
          className="create-button"
          onClick={handleNavigate("/secretary/events/create")}
        >
          Создать мероприятие
        </button>
      </div>
      <div className="date-filters">
        <label className="date-input-label">
          Начальная дата:
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="date-input"
          />
        </label>
        <label className="date-input-label">
          Конечная дата:
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="date-input"
          />
        </label>
      </div>
      <div className="events-list">
        {filteredEvents.length === 0 ? (
          <div>Нет мероприятий для отображения</div>
        ) : (
          filteredEvents.map((event) => (
            <>
              <EventCardEvents
                key={event.eventId}
                event={transformEvent(event)}
                onEventDeleted={handleEventDeleted}
              />
            </>
          ))
        )}
      </div>
    </div>
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

export default EventsPage;