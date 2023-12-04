import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import AppRoutes from "./AppRoute";
import { message } from "antd";

export const logoutUser = () => {
  signOut(auth);
  message.info("Logout succesfully !");
};

const MainApp = () => {
  return <AppRoutes />;
};

export default MainApp;
