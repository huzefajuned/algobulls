import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Error from "../components/Error";
import Dashboard from "../pages/Dashboard";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const AppRoutes = () => {
  const [loading, setLoading] = useState(false);

  function afterNavigate() {
    const host = window.location.origin;
    window.location.href = host;
  }

  const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      setLoading(true);

      const res = await signInWithEmailAndPassword(auth, email, password);

      if (res) {
        toast.success("User Logged In");
        afterNavigate();
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
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

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        authProvider: "local",
        email,
      });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Additional setup or effects can go here
  }, []); // Empty dependency array for running the effect only once

  const onSubmit = (values: any) => {
    const { title, email, password } = values;

    if (title === "SignUp") {
      registerWithEmailAndPassword(email, password);
    } else {
      logInWithEmailAndPassword(email, password);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/signup"
          element={<SignUp onSubmit={onSubmit} loading={loading} />}
        />
        <Route
          path="/login"
          element={<Login onSubmit={onSubmit} loading={loading} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
