import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "demo",
  authDomain: "demo",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
