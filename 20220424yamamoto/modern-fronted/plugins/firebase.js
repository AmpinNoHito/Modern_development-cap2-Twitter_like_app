import firebase from 'firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyAaDfdo81btAV8jE34Q8EI1pX1FlrVf6kY",
      authDomain: "modern-a54d9.firebaseapp.com",
      databaseURL: "https://modern-a54d9-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "modern-a54d9",
      storageBucket: "modern-a54d9.appspot.com",
      messagingSenderId: "51738330772",
      appId: "1:51738330772:web:6d8134dfba3591cc2d5681",
      measurementId: "G-ENS8FN5T7Q"
    }
  );
}

export default firebase;