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
import { useEffect, useState } from "react";
import { afterNavigate } from "../Common/common";
import { message } from "antd";

const AppRoutes = () => {
  const [loading, setLoading] = useState(false);

  const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      setLoading(true);

      const res = await signInWithEmailAndPassword(auth, email, password);

      if (res) {
        message.success("User Logged In");
        afterNavigate();
      }
    } catch (err: any) {
      console.error(err);
      message.error(err.message);
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
        message.success("User created");
        logInWithEmailAndPassword(email, password);
      }

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        authProvider: "local",
        email,
      });
    } catch (err: any) {
      message.error(err.message);
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
