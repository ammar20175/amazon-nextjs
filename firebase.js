import {initializeApp, getApp, getApps} from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig =JSON.parse(process.env.FIREBASE_CONFIG_CLIENT);

!getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();

export default db;
