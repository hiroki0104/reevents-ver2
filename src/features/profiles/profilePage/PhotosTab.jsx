import React, { useState } from 'react';
import { Grid, Header, Button, Tab, Card, Image } from 'semantic-ui-react';
import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import {
  getUserPhotos,
  setMainPhoto,
  deletePhotoFromCollection,
} from '../../../app/firestore/firestoreService';
import { useDispatch, useSelector } from 'react-redux';
import { listenToUserPhotos } from '../profileAction';
import { toast } from 'react-toastify';
import { deleteFromfirebaseStorage } from '../../../app/firestore/firebaseService';

export default function PhotosTab({ profile, isCurrentUser }) {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const { loading } = useSelector((state) => state.async);
  const { photos } = useSelector((state) => state.profile);
  const [updating, setUpdating] = useState({ isUpdating: false, target: null });
  const [deleting, setDeleting] = useState({ isDeleting: false, target: null });

  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: (photos) => dispatch(listenToUserPhotos(photos)),
    deps: [profile.id, dispatch],
  });

  async function handleSetMainPhoto(photo, target) {
    setUpdating({ isUpdating: true, target: target });
    try {
      await setMainPhoto(photo);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setUpdating({ isUpdating: false, target: target });
    }
  }

  async function handleDeletePhoto(photo, target) {
    setDeleting({ isDeleting: true, target: target });
    try {
      await deleteFromfirebaseStorage(photo.name);
      await deletePhotoFromCollection(photo.id);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setDeleting({ isDeleting: false, target: target });
    }
  }

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={`About ${profile.displayName}`}
          />
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated='right'
              basic
              content={editMode ? 'Cancel' : 'Add Photo'}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUploadWidget setEditMode={setEditMode} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {photos.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  <Button
                    name={photo.id}
                    loading={
                      updating.isUpdating && updating.target === photo.id
                    }
                    disabled={photo.url === profile.photoURL}
                    basic
                    color='green'
                    onClick={(e) => handleSetMainPhoto(photo, e.target.name)}
                    content='Main'
                  />
                  <Button
                    loading={
                      deleting.isDeleting && deleting.target === photo.id
                    }
                    disabled={photo.url === profile.photoURL}
                    basic
                    color='red'
                    onClick={(e) => handleDeletePhoto(photo, e.target.name)}
                    icon='trash'
                  />
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
