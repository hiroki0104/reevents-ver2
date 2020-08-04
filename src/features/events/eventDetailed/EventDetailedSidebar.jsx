import React from 'react';
import { Segment, Item, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function EventDetailedSidebar({ attendees, hostUid }) {
  return (
    <>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'>
        {attendees.length} {attendees.length > 1 ? 'People' : 'Person'} going
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {attendees.map((attendee) => (
            <Item
              as={Link}
              to={`/profile/${attendee.id}`}
              key={attendee.id}
              style={{ position: 'relative' }}>
              {hostUid === attendee.id && (
                <Label
                  style={{ position: 'absolute' }}
                  color='orange'
                  ribbon='right'
                  content='Host'
                />
              )}
              <Item.Image
                size='tiny'
                src={attendee.photoURL || '/assets/user.png'}
              />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <span>{attendee.name}</span>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
}
