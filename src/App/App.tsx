import React from "react";
import { observer } from "mobx-react-lite";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import useUserContext from "../hooks/useUserContext";
import socket from "../configs/socket";
import ChatService from "../services/ChatService";

import s from "./App.module.scss";

const App: React.FC = () => {
  const user = useUserContext();

  React.useEffect(() => {
    socket.on("message", () => {
      ChatService.fetchUsers().then(({ data }) => user.setUsers(data));
      ChatService.fetchMessages(user.user?.createdAt).then(({ data }) =>
        user.setMessages(data)
      );
    });
  }, []);

  return <div className={s.wrapper}>{!user.isAuth ? <Login /> : <Chat />}</div>;
};

export default observer(App);
