import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATFzWxObebEhv08b1I2RzVIbkY0gPPIGA",
  authDomain: "myeshop-41b57.firebaseapp.com",
  projectId: "myeshop-41b57",
  storageBucket: "myeshop-41b57.appspot.com",
  messagingSenderId: "1051199433044",
  appId: "1:1051199433044:web:903da2b3fc48e2577e40c1"

};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);