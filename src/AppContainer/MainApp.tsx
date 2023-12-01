import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import Error from "../components/Error";

const MainApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<h1>hii, defalt...</h1>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default MainApp;
