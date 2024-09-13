import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../my-event/EventCard.jsx';
import './user-events-page.css';

const UserEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [showPetitionEvents, setShowPetitionEvents] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.userId;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [eventsResponse, registeredEventsResponse] = await Promise.all([
          axios.get('http://localhost:8080/events/upcoming'),
          axios.get(`http://localhost:8080/students/user/${userId}/events`)
        ]);

        setEvents(eventsResponse.data);
        setRegisteredEvents(registeredEventsResponse.data.map(event => event.eventId));
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    const checkProfileCompletion = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/student/${userId}`);
        const student = response.data;

        const isComplete = student.lastName && student.firstName && student.middle_name && student.group_number && student.student_faculty && student.date_of_birth && student.email_adress;
        setIsProfileComplete(isComplete);
      } catch (error) {
        console.error('Ошибка при проверке профиля:', error);
        setIsProfileComplete(false);
      }
    };

    fetchEvents();
    checkProfileCompletion();
  }, [userId]);

  const handleEventRegistration = (eventId) => {
    setRegisteredEvents((prevRegisteredEvents) => [...prevRegisteredEvents, eventId]);
  };

  const handleCheckboxChange = () => {
    setShowPetitionEvents(!showPetitionEvents);
  };

  const handleUnregister = (eventId) => {
    setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
  };

  const filteredEvents = showPetitionEvents
    ? events.filter(event => event.for_petition)
    : events;

  return (
    <div className='page'>
      <div className='title'>Мероприятия</div>
      <div className='checkbox-container'>
          <input 
          type="checkbox" 
          checked={showPetitionEvents} 
          onChange={handleCheckboxChange} 
        />
        <label>Показывать только мероприятия для ходатайства</label>
      </div>
      {filteredEvents.map((event) => (
        <EventCard 
          key={event.eventId} 
          event={transformEvent(event)} 
          userId={userId}
          isRegistered={registeredEvents.includes(event.eventId)} 
          onRegister={handleEventRegistration}
          onUnregister={handleUnregister}
          isProfileComplete={isProfileComplete}
        />
      ))}
    </div>
  );
}

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

export default UserEventsPage;