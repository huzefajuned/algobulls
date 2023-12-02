import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB3FE3a2EbGhN4FQ14iwm5fW9YBUFVX4jo",
  authDomain: "algobulls-35b22.firebaseapp.com",
  projectId: "algobulls-35b22",
  storageBucket: "algobulls-35b22.appspot.com",
  messagingSenderId: "992004610009",
  appId: "1:992004610009:web:977798d460304745676bc8",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export { auth, db, sendPasswordReset };
