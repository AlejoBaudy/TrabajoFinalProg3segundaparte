import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
        apiKey: "AIzaSyAGIiFd--VKiPCd0Kjw0iIVfQQ7g9VLTYI",
        authDomain: "trabajofinalprog3segundaparte.firebaseapp.com",
        projectId: "trabajofinalprog3segundaparte",
        storageBucket: "trabajofinalprog3segundaparte.firebasestorage.app",
        messagingSenderId: "710805976005",
        appId: "1:710805976005:web:43675034455e1bd61311ac"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
