import React from "react";
import UserStore from "../stores/UserStore";

type State = {
  user: UserStore;
};

const user = new UserStore();

const UserContext = React.createContext<State>({
  user,
});

export default UserContext;
