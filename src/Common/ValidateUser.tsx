import { useEffect, useState } from "react";

export const useUserValidation = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const validateUser = () => {
      const user:any = localStorage.getItem("logUser");
      const isLoggedIn = !!user; // Check if user is logged in

      setIsUserLoggedIn(isLoggedIn);
      setUserData(user);
    };

    validateUser();
  }, []);

  return { isUserLoggedIn, userData };
};
