import React, { useState, useEffect } from 'react';
import {
  Segment,
  Grid,
  Item,
  Header,
  Statistic,
  Divider,
  Reveal,
  Button,
} from 'semantic-ui-react';
import { toast } from 'react-toastify';
import {
  followUser,
  unfollowUser,
  getFollowingDoc,
} from '../../../app/firestore/firestoreService';
import { useSelector, useDispatch } from 'react-redux';
import { setFollowUser, setUnFollowUser } from '../profileAction';
import { CLEAR_FOLLOWINGS } from '../profileConstants';

export default function ProfileHeader({ profile, isCurrentUser }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { followingUser } = useSelector((state) => state.profile);

  useEffect(() => {
    if (isCurrentUser) return;
    setLoading(true);
    async function fetchFollowingDoc() {
      try {
        const followingDoc = await getFollowingDoc(profile.id);
        if (followingDoc && followingDoc.exists) {
          dispatch(setFollowUser());
        } else {
          dispatch(setUnFollowUser());
        }
      } catch (e) {
        toast.error(e.message);
      }
    }
    fetchFollowingDoc().then(() => setLoading(false));

    return () => {
      dispatch({ type: CLEAR_FOLLOWINGS });
    };
  }, [dispatch, profile.id, isCurrentUser]);

  async function handleFollowUser() {
    setLoading(true);
    try {
      await followUser(profile);
      dispatch(setFollowUser());
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleUnFollowUser() {
    setLoading(true);
    try {
      await unfollowUser(profile);
      dispatch(setUnFollowUser());
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={profile.photoURL || '/assets/user.png'}
              />
              <Item.Content verticalAlign='middle'>
                <Header
                  as='h1'
                  style={{ display: 'block', marginBottom: 10 }}
                  content={profile.displayName}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group>
            <Statistic label='Followers' value={profile.followerCount || 0} />
            <Statistic label='Following' value={profile.followingCount || 0} />
          </Statistic.Group>
          {!isCurrentUser && (
            <>
              <Divider />
              <Reveal animated='move'>
                <Reveal.Content visible style={{ width: '100%' }}>
                  <Button
                    fluid
                    color='teal'
                    content={followUser ? 'Following' : 'Not following'}
                  />
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: '100%' }}>
                  <Button
                    onClick={
                      followingUser
                        ? () => handleUnFollowUser()
                        : () => handleFollowUser()
                    }
                    loading={loading}
                    fluid
                    color={followingUser ? 'red' : 'green'}
                    content={followingUser ? 'unfollow' : 'follow'}
                  />
                </Reveal.Content>
              </Reveal>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
