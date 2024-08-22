import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/EventFormComponent.css';
import AdminNavbarComponent from './AdminNavbarComponent';
import EventListComponent from './EventListComponent'; // Import EventListComponent

const EventComponent = ({ onEventAdded }) => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    eventDate: '',
    eventTime: '',
    location: '',
    organizerId: '', // Set by useEffect
    registrationStartDate: '',
    registrationEndDate: '',
    fees: '',
  });

  const [showEventList, setShowEventList] = useState(false); // New state to toggle views

  useEffect(() => {
    const loginId = localStorage.getItem('user_id');
    if (loginId) {
      setEventData((prevData) => ({
        ...prevData,
        organizerId: loginId,
      }));
    } else {
      console.error("No loginId found in storage.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventData.organizerId) {
      console.error('Organizer ID is missing');
      return;
    }

    const formattedEventTime = eventData.eventTime ? `${eventData.eventTime}:00` : '';

    const formattedEventData = {
      ...eventData,
      eventTime: formattedEventTime,
    };

    try {
      const response = await axios.post('http://localhost:8080/events', formattedEventData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response from server:', response);

      if (onEventAdded && typeof onEventAdded === 'function') {
        console.log('Calling onEventAdded with:', response.data);
        onEventAdded(response.data);
      } else {
        console.error('onEventAdded is not a function', onEventAdded);
      }

      toast.success('Event added successfully!');

      setEventData({
        name: '',
        description: '',
        eventDate: '',
        eventTime: '',
        location: '',
        organizerId: localStorage.getItem('user_id') || '',
        registrationStartDate: '',
        registrationEndDate: '',
        fees: '',
      });
    } catch (error) {
      console.error('There was an error creating the event!', error.response ? error.response.data : error.message);
      toast.error('Error adding event. Please try again.');
    }
  };

  return (
    <>
      <AdminNavbarComponent 
        isAuthenticated={!!localStorage.getItem('user_id')} 
        onLogout={() => {
          localStorage.removeItem('user_id');
          window.location.href = '/login'; // Redirect to login page
        }} 
      />
      <button onClick={() => setShowEventList(!showEventList)}>
        {showEventList ? 'Add Event' : 'Show Event List'}
      </button>
      {showEventList ? (
        <EventListComponent /> // Render EventListComponent if in list view
      ) : (
        <form className="event-form" onSubmit={handleSubmit}>
          <h2>Add New Event</h2>
          <label htmlFor="name">Event Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Event Name"
            value={eventData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="description">Event Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Event Description"
            value={eventData.description}
            onChange={handleChange}
            required
          />
          <label htmlFor="eventDate">Event Date</label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={eventData.eventDate}
            onChange={handleChange}
            required
          />
          <label htmlFor="eventTime">Event Time</label>
          <input
            type="time"
            id="eventTime"
            name="eventTime"
            value={eventData.eventTime}
            onChange={handleChange}
            required
          />
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
            value={eventData.location}
            onChange={handleChange}
            required
          />
          <input
            type="hidden"
            id="organizerId"
            name="organizerId"
            value={eventData.organizerId}
          />
          <label htmlFor="registrationStartDate">Registration Start Date</label>
          <input
            type="date"
            id="registrationStartDate"
            name="registrationStartDate"
            value={eventData.registrationStartDate}
            onChange={handleChange}
            required
          />
          <label htmlFor="registrationEndDate">Registration End Date</label>
          <input
            type="date"
            id="registrationEndDate"
            name="registrationEndDate"
            value={eventData.registrationEndDate}
            onChange={handleChange}
            required
          />
          <label htmlFor="fees">Fees</label>
          <input
            type="number"
            id="fees"
            name="fees"
            placeholder="Fees"
            value={eventData.fees}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Event</button>
        </form>
      )}
      <ToastContainer />
    </>
  );
};

EventComponent.propTypes = {
  onEventAdded: PropTypes.func.isRequired,
};

export default EventComponent;
