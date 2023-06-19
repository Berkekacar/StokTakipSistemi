import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDElox4nBVLvSuFGGG7xUp-fCr21uZGxDw",
  authDomain: "vtys-vue-express-app.firebaseapp.com",
  projectId: "vtys-vue-express-app",
  storageBucket: "vtys-vue-express-app.appspot.com",
  messagingSenderId: "660913808635",
  appId: "1:660913808635:web:68df633395c138fa99bc5e"
};

// Initialize Firebase
initializeApp(firebaseConfig);



createApp(App).use(router).mount('#app')
