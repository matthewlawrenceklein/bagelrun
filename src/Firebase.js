import { initializeApp } from "Firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAadF0XMRCL5mzMyj05iQSO8yWr0HQfXzg",
  authDomain: "bagelrun-cf28e.firebaseapp.com",
  projectId: "bagelrun-cf28e",
  storageBucket: "bagelrun-cf28e.appspot.com",
  messagingSenderId: "465224694989",
  appId: "1:465224694989:web:ec0f1e756ff4bc10253d84",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
