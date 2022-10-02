import React from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

type UserProps = {
  username: string;
};

const User: React.FC<UserProps> = ({ username }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText primary={username} />
    </ListItem>
  );
};

export default User;
