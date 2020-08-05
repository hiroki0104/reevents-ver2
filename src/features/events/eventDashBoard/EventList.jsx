import React from 'react';
import EventListItem from './EventListItem';
import InfiniteScroll from 'react-infinite-scroller';

function EventList({ events, getNextEvents, moreEvents, loading }) {
  return (
    <>
      {events.length !== 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextEvents}
          hasMore={!loading && moreEvents}
          initialLoad={false}>
          {events.map((event) => (
            <EventListItem key={event.id} event={event} />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
}

export default EventList;
