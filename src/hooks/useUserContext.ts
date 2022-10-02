import React from "react";
import UserContext from "../contexts/UserContext";

const useUserContext = () => {
  const { user } = React.useContext(UserContext);
  return user;
};

export default useUserContext;
