import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {

 apiKey: "AIzaSyBHlShZrafrNBmOIYy_wo6ROXjuOXbF5Mo",

 authDomain: "eastern-map-408209.firebaseapp.com",

 projectId: "eastern-map-408209",

 storageBucket: "eastern-map-408209.appspot.com",

 messagingSenderId: "519827458859",

 appId: "1:519827458859:web:7407b09288f583996a136e",

 measurementId: "G-14H64KVC49"

};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app); // Initialize Firebase Authentication
