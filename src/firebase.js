import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth"
import { getDatabase, ref } from "firebase/database"


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signUp = async (email, pass) => await createUserWithEmailAndPassword(auth, email, pass);

export const signIn = async (email, pass) => await signInWithEmailAndPassword(auth, email, pass);

export const logOut = async () => await signOut(auth);

//-----------------------------------------------------------------------------

export const db = getDatabase(app);

export const usersRef = ref(db, "users");

export const getUserRef = (id) => ref(db, `users/${id}`);

export const getUserFavoritesWeatherRef = (id) => ref(db, `users/${id}/favoritWeather`);

export const getUserFavoritesWeatherListRef = (id) => ref(db, `users/${id}/favoritWeather/citys`);

export const getUserFavoritesWeatherListItemRef = (id, idItem) => ref(db, `users/${id}/favoritWeather/citys/${idItem}`);