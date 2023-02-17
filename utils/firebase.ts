import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { browserSessionPersistence, getAuth, setPersistence } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyA-U_8_2rw6mf4oZMcvqPMgL20YkElfDhg",
  authDomain: "github-favorites.firebaseapp.com",
  projectId: "github-favorites",
  storageBucket: "github-favorites.appspot.com",
  messagingSenderId: "729735405365",
  appId: "1:729735405365:web:a94c86cf4e382f38c5b67c",
  measurementId: "G-44Q5VFRN3F"
};

const app = typeof window !== 'undefined' && initializeApp(firebaseConfig);
typeof window !== 'undefined' && app && getAnalytics(app);

const auth = app ? getAuth() : false;
auth && setPersistence(auth, browserSessionPersistence);
