
import { initializeApp } from "firebase/app";
import { enableIndexedDbPersistence, getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// firebase init
const config = {
  apiKey: import.meta.env.VITE_API_KEY as string,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_APP_ID as string,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID as string,
};

const app = initializeApp(config);
const fs = getFirestore(app);
const st = getStorage(app);

// const analytics = getAnalytics(app);

enableIndexedDbPersistence(fs).then(() => {
  console.log("Persistence Enabled")
});

export {
  fs,
  st
}

