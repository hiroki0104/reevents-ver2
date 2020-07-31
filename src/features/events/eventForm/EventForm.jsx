import React, { useState } from 'react';
import { Segment, Header, Form, Button } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom';

function EventForm({
  setFormOpen,
  setEvents,
  createEvent,
  selectedEvent,
  updateEvent,
}) {
  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
  };

  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    selectedEvent
      ? updateEvent({ ...selectedEvent, ...values })
      : createEvent({
          ...values,
          id: cuid(),
          hostedBy: 'Bob',
          attendees: [],
          hostPhotoURL: '/assets/user.png',
        });
    setFormOpen(false);
  };

  return (
    <Segment clearing>
      <Header content={selectedEvent ? 'Edit Event' : 'Create new event'} />
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <input
            type='text'
            placeholder='Event title'
            value={values.title}
            onChange={handleChange}
            name='title'
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            placeholder='Category'
            value={values.category}
            name='category'
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            placeholder='Description'
            value={values.description}
            name='description'
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            placeholder='City'
            value={values.city}
            name='city'
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            placeholder='Venue'
            value={values.venue}
            name='venue'
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type='date'
            placeholder='Date'
            value={values.date}
            name='date'
            onChange={handleChange}
          />
        </Form.Field>
        <Button type='submit' floated='right' content='Submit' positive />
        <Button
          as={Link}
          to='/events'
          type='submit'
          floated='right'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
}

export default EventForm;
