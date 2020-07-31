import React from 'react';
import EventListItem from './EventListItem';

function EventList({ events, selectEvent, deleteEvent }) {
  return (
    <>
      {events.map((event) => (
        <EventListItem
          key={event.id}
          event={event}
          selectEvent={selectEvent}
          deleteEvent={deleteEvent}
        />
      ))}
    </>
  );
}

export default EventList;
