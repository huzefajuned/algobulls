import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import AppRoutes from "./AppRoute";

export const logoutUser = () => {
  signOut(auth);
};

const MainApp = () => {
  return <AppRoutes />;
};

export default MainApp;
