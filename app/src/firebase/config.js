import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
   apiKey: "AIzaSyCL1ner14Jq9c89entxi5nyL5gExWEgM1g",
  authDomain: "fir-final-2fc2d.firebaseapp.com",
  projectId: "fir-final-2fc2d",
  storageBucket: "fir-final-2fc2d.firebasestorage.app",
  messagingSenderId: "248859437989",
  appId: "1:248859437989:web:6340514de10b0b6ab9164c"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()