import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGddkLHr4OJRYNlTJnnpJeE0DenHUIBOg",
  authDomain: "phoneauth-by-shahzad.firebaseapp.com",
  projectId: "phoneauth-by-shahzad",
  storageBucket: "phoneauth-by-shahzad.appspot.com",
  messagingSenderId: "152207948402",
  appId: "1:152207948402:web:8fc4dadfadaa2c301a20eb"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);