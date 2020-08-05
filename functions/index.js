const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.addFollowing = functions.firestore
  .document('following/{userUid}/userFollowing/{profileId}')
  .onCreate(async (snapshot, context) => {
    const following = snapshot.data();
    try {
      const userDoc = await db
        .collection('users')
        .doc(context.params.userUid)
        .get();
      const batch = db.batch();
      batch.set(
        db
          .collection('following')
          .doc(context.params.profileId)
          .collection('userFollowers')
          .doc(context.params.userUid),
        {
          displayName: userDoc.data().displayName,
          photoURL: userDoc.data().photoURL,
          uid: userDoc.id,
        }
      );
      batch.update(db.collection('users').doc(context.params.profileId), {
        followerCount: admin.firestore.FieldValue.increment(1),
      });
      return await batch.commit();
    } catch (e) {
      return console.log(e);
    }
  });

exports.removeFollowing = functions.firestore
  .document('following/{userUid}/userFollowing/{profileId}')
  .onDelete(async (snapshot, context) => {
    const batch = db.batch();
    try {
      batch.delete(
        db
          .collection('following')
          .doc(context.params.profileId)
          .collection('userFollowers')
          .doc(context.params.userUid)
      );
      batch.update(db.collection('users').doc(context.params.profileId), {
        followerCount: admin.firestore.FieldValue.increment(-1),
      });
      return await batch.commit();
    } catch (e) {
      return console.log(e);
    }
  });

exports.eventUpdated = functions.firestore
  .document('events/{eventId}')
  .onUpdate(async (snapshot, context) => {
    const before = snapshot.before.data();
    const after = snapshot.after.data();
    if (before.attendees.length < after.attendees.length) {
      let attendeeJoined = after.attendees.filter(
        (item1) => !before.attendees.some((item2) => item2.id === item1.id)
      )[0];
      try {
        const followerDocs = await db
          .collection('following')
          .doc(attendeeJoined.id)
          .collection('userFollowers')
          .get();
        followerDocs.forEach((doc) => {
          admin
            .database()
            .ref(`/posts/${doc.id}`)
            .push(
              newPost(
                attendeeJoined,
                'join-event',
                context.params.eventId,
                before
              )
            );
        });
      } catch (e) {
        return console.log(e);
      }
    }

    if (before.attendees.length > after.attendees.length) {
      let attendeeLeft = before.attendees.filter(
        (item1) => !after.attendees.some((item2) => item2.id === item1.id)
      )[0];
      try {
        const followerDocs = await db
          .collection('following')
          .doc(attendeeLeft.id)
          .collection('userFollowers')
          .get();
        followerDocs.forEach((doc) => {
          admin
            .database()
            .ref(`/posts/${doc.id}`)
            .push(
              newPost(
                attendeeLeft,
                'left-event',
                context.params.eventId,
                before
              )
            );
        });
      } catch (e) {
        return console.log(e);
      }
    }

    return console.log('finished');
  });

function newPost(user, code, eventId, event) {
  return {
    title: event.title,
    photoURL: user.photoURL,
    date: admin.database.ServerValue.TIMESTAMP,
    code,
    displayName: user.name,
    eventId,
    userUid: user.id,
  };
}
