import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Error from "../components/Error";
import Dashboard from "../pages/Dashboard";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

const AppRoutes = ({ onSubmit }: any) => {
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

export default AppRoutes;
