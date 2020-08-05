import React from 'react';
import { Link } from 'react-router-dom';
import { FeedEvent, Feed } from 'semantic-ui-react';
import { formatDistance } from 'date-fns';

export default function EventFeedItem({ post }) {
  let summary;
  switch (post.code) {
    case 'join-event':
      summary = (
        <>
          <Link to={`/profile/${post.userUid}`}>{post.displayName}</Link>
          has signed up to
          <Link to={`/events/${post.eventId}`}>{post.title}</Link>
        </>
      );
      break;
    case 'left-event':
      summary = (
        <>
          <Link to={`/profile/${post.userUid}`}>{post.displayName}</Link>
          has cancel their place on
          <Link to={`/events/${post.eventId}`}>{post.title}</Link>
        </>
      );
      break;
    default:
      summary = 'Something happened';
      break;
  }
  return (
    <FeedEvent>
      <Feed.Label image={post.photoURL} />
      <Feed.Content>
        <Feed.Date>
          {formatDistance(new Date(post.date), new Date())} ago
        </Feed.Date>
        <Feed.Summary>{summary}</Feed.Summary>
      </Feed.Content>
    </FeedEvent>
  );
}
