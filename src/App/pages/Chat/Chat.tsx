import React from "react";
import { observer } from "mobx-react-lite";
import { Divider, List, ListSubheader, Paper } from "@mui/material";
import Input from "../../../components/Input";
import Message from "../../../components/Message";
import User from "../../../components/User";
import useUserContext from "../../../hooks/useUserContext";
import ChatService from "../../../services/ChatService";

import s from "./Chat.module.scss";

const Chat: React.FC = () => {
  const scrollBottomRef = React.useRef<HTMLUListElement>(null);
  const user = useUserContext();

  React.useEffect(() => {
    ChatService.fetchUsers().then(({ data }) => user.setUsers(data));
    ChatService.fetchMessages(user.user?.createdAt).then(({ data }) =>
      user.setMessages(data)
    );
  }, []);

  React.useEffect(() => {
    scrollBottomRef.current?.scroll(0, scrollBottomRef.current.scrollHeight);
  }, [user.messages]);

  const usersList = React.useMemo(
    () =>
      user.users.map(({ createdAt, username }) => (
        <User key={createdAt} username={username} />
      )),
    [user.users.length]
  );

  const messagesList = React.useMemo(
    () =>
      user.messages.map((message) => (
        <Message
          {...message}
          isMy={user.user?.username === message.username}
          key={message.createdAt}
        />
      )),
    [user.messages.length]
  );

  return (
    <Paper elevation={4} className={s.container}>
      <List
        subheader={
          <ListSubheader>
            Участники: <Divider />
          </ListSubheader>
        }
        className={s.users}
      >
        {usersList}
      </List>

      <Divider orientation="vertical" flexItem />

      <div className={s.chat}>
        <List className={s.chat__messages} ref={scrollBottomRef}>
          {messagesList}
        </List>

        <Divider flexItem />

        <Input />
      </div>
    </Paper>
  );
};

export default observer(Chat);
