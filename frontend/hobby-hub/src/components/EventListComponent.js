import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/EventListComponent.css';

const EventListComponent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/events/active');
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch events.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="event-list">
      <h2>Event List</h2>
      {events.length === 0 ? (
        <p className="no-events">No events available.</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {event.eventDate}</p>
              <p><strong>Time:</strong> {event.eventTime}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Fees:</strong> ${event.fees}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventListComponent;
