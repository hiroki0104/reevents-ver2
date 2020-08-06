import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'revents-course-285101.firebaseapp.com',
  databaseURL: 'https://revents-course-285101.firebaseio.com',
  projectId: 'revents-course-285101',
  storageBucket: 'revents-course-285101.appspot.com',
  messagingSenderId: '1086806059424',
  appId: '1:1086806059424:web:db85b7d314344c5525dcc5',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
