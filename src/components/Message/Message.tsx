import React from "react";
import { Avatar, ListItem, Paper } from "@mui/material";
import cn from "classnames";

import s from "./Message.module.scss";

type MessageProps = {
  text: string;
  username: string;
  createdAt?: number;
  notice?: boolean;
  isMy?: boolean;
};

const Message: React.FC<MessageProps> = ({
  text,
  username,
  createdAt = "",
  notice = false,
  isMy = false,
}) => {
  if (notice) {
    return (
      <ListItem className={s.notice}>
        <Paper elevation={2} className={s.notice__text}>
          <p>{text}</p>
        </Paper>
      </ListItem>
    );
  }

  return (
    <ListItem className={cn(s.message, isMy && s.message_isMy)}>
      <Avatar sx={{ width: 20, height: 20 }} />
      <Paper elevation={4} className={s.message__text}>
        <p className={s.message__username}>{username}</p>
        <p>{text}</p>
        <p className={s.message__date}>
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </Paper>
    </ListItem>
  );
};

export default Message;
