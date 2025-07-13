import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // tambahkan ini

const firebaseConfig = {
   apiKey: "AIzaSyAQP7jE-zz9sy1KJlggDCXDgd-O6Mhgt-g",
   authDomain: "rekap-kitol.firebaseapp.com",
   projectId: "rekap-kitol",
   storageBucket: "rekap-kitol.appspot.com",
   messagingSenderId: "1049880285807",
   appId: "1:1049880285807:web:0ee91a3f07e64c5452f39a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };