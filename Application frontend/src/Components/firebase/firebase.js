// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAnE5J3zUqg4cQeth9NbyTQuE_OTWS8WFk",

  authDomain: "contact-image.firebaseapp.com",

  projectId: "contact-image",

  storageBucket: "contact-image.appspot.com",

  messagingSenderId: "933663537902",

  appId: "1:933663537902:web:da40525e5639c9c5d111ff",

};

const app = initializeApp(firebaseConfig);


const storage = getStorage(app);


export { storage, app };