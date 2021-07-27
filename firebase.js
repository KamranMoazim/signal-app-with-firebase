import firebase from 'firebase/app'

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDWuidZyy7wA1wmSiOFTuEoIGdiXuJIBrk",
    authDomain: "signal-app-e501b.firebaseapp.com",
    projectId: "signal-app-e501b",
    storageBucket: "signal-app-e501b.appspot.com",
    messagingSenderId: "61702188747",
    appId: "1:61702188747:web:1d7b92a463747f1e04354e"
};

let app = firebase.initializeApp(firebaseConfig);

if (firebase.app.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {
    db,
    auth
}