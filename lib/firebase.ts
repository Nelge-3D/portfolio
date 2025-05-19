// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiXmXCYJiVV1x0WGZPjKQOvujf-4zLP9U",
  authDomain: "portfolio-f01f3.firebaseapp.com",
  projectId: "portfolio-f01f3",
  storageBucket: "portfolio-f01f3.firebasestorage.app",
  messagingSenderId: "139731978131",
  appId: "1:139731978131:web:d4d30b810999e615614a66",
  measurementId: "G-62PXDD7R6N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);