import React, { useState } from 'react';
import EventComponent from './EventComponent';

const ParentComponent = () => {
  const [events, setEvents] = useState([]);

  const handleEventAdded = (newEvent) => {
    // Update the events list or perform other actions
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <div>
      <EventComponent onEventAdded={handleEventAdded} />
      {/* Render events or other components */}
    </div>
  );
};

export default ParentComponent;
