import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBXvBcQyR2UOvRTYoV_vL-vQEfvIYF7q8g",
  authDomain: "ctse-assignment-8b8aa.firebaseapp.com",
  projectId: "ctse-assignment-8b8aa",
  storageBucket: "ctse-assignment-8b8aa.appspot.com",
  messagingSenderId: "666248968096",
  appId: "1:666248968096:web:f0b79aab45e10e9e1156c5",
  measurementId: "G-X0GC9CHETH"
};
  
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export { firebase };
const auth = firebase.auth();
export { auth };