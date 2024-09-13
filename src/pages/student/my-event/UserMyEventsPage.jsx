import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard.jsx";
import "./user-my-events-page.css";

const MyEventsPage = () => {
  const [events, setEvents] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/students/user/${userId}/events`
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchMyEvents();
  }, [userId]);

  const handleRegister = (eventId) => {
    setEvents(
      events.map((event) =>
        event.eventId === eventId ? { ...event, isRegistered: true } : event
      )
    );
  };

  const handleUnregister = (eventId) => {
    setEvents(events.filter((event) => event.eventId !== eventId));
  };

  return (
    <div className="page">
      <div className="title">Мои мероприятия</div>
      {events.length === 0 ? (
        <div className="no-events-message">Еще нет посещенных мероприятий</div>
      ) : (
        events.map((event) => (
          <EventCard
            key={event.eventId}
            event={transformEvent(event)}
            userId={userId}
            isRegistered={true}
            onRegister={handleRegister}
            onUnregister={handleUnregister}
          />
        ))
      )}
    </div>
  );
};

const transformEvent = (event) => {
  return {
    image: "/vozlozhenie.jpg",
    title: event.eventName,
    date: event.eventDate,
    time: event.event_time,
    location: event.event_place,
    experience: `${event.opt_count}ч`,
    petition: event.for_petition ? "Да" : "Нет",
    eventId: event.eventId,
  };
};

export default MyEventsPage;
