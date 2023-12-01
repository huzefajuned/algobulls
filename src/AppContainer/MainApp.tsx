import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import Error from "../components/Error";
import Dashboard from "../pages/Dashboard";
import { toast } from "react-toastify";

const MainApp = () => {
  // when user submit the form---
  const onSubmit = (values: any) => {
    const { title, email, password } = values;

    if (title == "SignUp") {
      regUser(email, password);
    } else {
      logUser(email, password);
    }
  };

  // Register a user-
  // save registered user on local strorage-

  async function regUser(email: string, password: string) {
    const payload = { email, password };

    await localStorage.setItem("regUser", JSON.stringify(payload));

    if (localStorage.getItem("regUser")) {
      toast.success("User created successfully");
      // once user Registered
      //login user automatically
      logUser(email, password);
    } else {
      toast.error("Something went Wrong!");
    }
  }

  async function logUser(email: string, password: string) {
    const payload = { email, password };

    // validate credentials--
    if (localStorage.getItem("regUser")) {
      const userData = await localStorage.getItem("regUser");

      // compare old userData with Login Credentails---
      if (userData == JSON.stringify(payload)) {
        toast.success("User loggedIn");
      } else {
        toast.info("User not found!");
      }
    } else {
      toast.info("User not found! Register Now");
    }
  }
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp onSubmit={onSubmit} />} />
        <Route path="/login" element={<Login onSubmit={onSubmit} />} />
      </Routes>
    </Router>
  );
};

export default MainApp;
