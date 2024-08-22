// import React from 'react';
// import '../CSS/EventCardComponent.css'; // Import your CSS file for styling

// const EventCardComponent = ({ event }) => {
//   return (
//     <div className="event-card">
//       <h3>{event.name}</h3>
//       <p>{event.description}</p>
//       <p><strong>Date:</strong> {event.eventDate}</p>
//       <p><strong>Time:</strong> {event.eventTime}</p>
//       <p><strong>Location:</strong> {event.location}</p>
//       <p><strong>Organizer ID:</strong> {event.organizerId}</p>
//       <p><strong>Group:</strong> {event.group.name}</p>
//       <p><strong>Registration Start:</strong> {event.registrationStartDate}</p>
//       <p><strong>Registration End:</strong> {event.registrationEndDate}</p>
//       <p><strong>Fees:</strong> ${event.fees}</p>
//     </div>
//   );
// };

// export default EventCardComponent;
import React from 'react';
import '../CSS/EventCardComponent.css'; // Import your CSS file for styling

const EventCardComponent = ({ event }) => {
  return (
    <div className="event-card">
      <h3 className="event-card-title">{event.name}</h3>
      <p className="event-card-description">{event.description}</p>
      <p><strong>Date:</strong> {event.eventDate}</p>
      <p><strong>Time:</strong> {event.eventTime}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Organizer ID:</strong> {event.organizerId}</p>
      <p><strong>Group:</strong> {event.group.name}</p>
      <p><strong>Registration Start:</strong> {event.registrationStartDate}</p>
      <p><strong>Registration End:</strong> {event.registrationEndDate}</p>
      <p><strong>Fees:</strong> ${event.fees}</p>
    </div>
  );
};

export default EventCardComponent;
