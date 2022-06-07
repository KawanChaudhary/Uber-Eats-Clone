import firebase from "firebase";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDnbw2aXIEJqJ9k1bdaZLabXh9vDiXxUUI",
  authDomain: "apt-trainer-337315.firebaseapp.com",
  projectId: "apt-trainer-337315",
  storageBucket: "apt-trainer-337315.appspot.com",
  messagingSenderId: "951292230850",
  appId: "1:951292230850:web:ed52009f805cbd22800f5b"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;
