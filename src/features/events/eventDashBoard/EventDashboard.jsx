import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import EventForm from '../eventForm/EventForm';
import { sampleData } from '../../../app/api/sampleData';

function EventDashboard({ formOpen, setFormOpen, selectEvent, selectedEvent }) {
  const [events, setEvents] = useState(sampleData);
  function handleCreateEvent(event) {
    setEvents([...events, event]);
  }
  function handleUpdateEvent(updateEvent) {
    setEvents(
      events.map((event) => (event.id === updateEvent.id ? updateEvent : event))
    );
    selectEvent(null);
    setFormOpen(false);
  }
  function handleDeleteEvent(eventId) {
    setEvents(events.filter((event) => event.id !== eventId));
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
          selectEvent={selectEvent}
          deleteEvent={handleDeleteEvent}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen && (
          <EventForm
            setFormOpen={setFormOpen}
            setEvents={setEvents}
            createEvent={handleCreateEvent}
            selectedEvent={selectedEvent}
            updateEvent={handleUpdateEvent}
            key={selectedEvent ? selectedEvent.id : null}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}

export default EventDashboard;
