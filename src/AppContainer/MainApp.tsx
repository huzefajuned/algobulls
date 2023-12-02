import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import AppRoutes from "./Routes";
import { toast } from "react-toastify";
import { useState } from "react";
import Loading from "../components/Loading";
export const logoutUser = () => {
  signOut(auth);
};

const MainApp = () => {
  const [loading, setLoading] = useState(false);

  // when user submit the form---
  const onSubmit = (values: any) => {
    const { title, email, password } = values;

    if (title == "SignUp") {
      registerWithEmailAndPassword(email, password);
    } else {
      logInWithEmailAndPassword(email, password);
    }
  };

  const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      if (res) {
        toast.success("User Logged In");
      }
    } catch (err:any) {
      console.error(err);
      toast.error(err.message);
    }
  };


  const registerWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      setLoading(true);

      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log("ress", res);
      if (res) {
        toast.success("User created");
        logInWithEmailAndPassword(email, password);
      }
      setLoading(false);

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err:any) {
      toast.error(err.message);
      setLoading(false);

    } 
  };

  return (
    <>
    {loading && <Loading />}
      <AppRoutes onSubmit={onSubmit} />
    </>
  );
};

export default MainApp;
