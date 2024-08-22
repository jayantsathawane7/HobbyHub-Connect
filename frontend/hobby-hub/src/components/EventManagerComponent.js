import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventFormComponent from './EventFormComponent';
import EventCardComponent from './EventCardComponent';
import '../CSS/EventManagerComponent.css'; // Import your CSS file for styling

const EventManagerComponent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get('http://localhost:8080/events/active');
      setEvents(response.data);
    };
    fetchEvents();
  }, []);

  const handleEventAdded = (newEvent) => {
    setEvents([newEvent, ...events]);
  };

  return (
    <div className="event-manager">
      <EventFormComponent onEventAdded={handleEventAdded} />
      <div className="event-list">
        {events.map((event) => (
          <EventCardComponent key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventManagerComponent;
