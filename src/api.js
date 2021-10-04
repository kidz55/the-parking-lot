import * as firebase from 'firebase/app';
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  getFirestore,
  addDoc,
  connectFirestoreEmulator,
  collection,
} from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

// connectAuthEmulator(getAuth(), 'http://localhost:9099');
const db = getFirestore();
// connectFirestoreEmulator(db, 'localhost', 8080);
const Api = {
  setParking: async (parking) => {
    const docRef = collection(db, 'parkingSpot');
    const ref = await addDoc(docRef, parking);
    return ref;
  },
  getParkingSpot: async (id) => {
    const docRef = doc(db, 'parkingSpot', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error('not_found');
    }
    return docSnap.data();
  },
  updateParkingSpot: async (spot) => {
    const { id } = spot;
    const docRef = doc(db, 'parkingSpot', id);
    await updateDoc(docRef, spot);
  },
  getDona: async (donaId) => {
    const docRef = doc(db, 'sedonas', donaId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      console.error('not found', donaId);
      return null;
    }
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  },
  updateDona: async (dona) => {
    const { id } = dona;
    const docRef = doc(db, 'sedonas', id);
    await updateDoc(docRef, dona);
  },
  getParking: async () => {
    let parkingData = [];
    const query = await getDocs(collection(db, 'parkingSpot'));
    query.forEach((doc) => {
      parkingData.push({ ...doc.data(), id: doc.id });
    });
    console.log(parkingData);
    return parkingData.sort((a, b) => a.index - b.index);
  },
};

export default Api;
