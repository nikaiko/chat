import React from "react";
import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmojiButton from "../EmojiButton";
import ChatService from "../../services/ChatService";
import useUserContext from "../../hooks/useUserContext";
import socket from "../../configs/socket";

import s from "./Input.module.scss";

const Input: React.FC = () => {
  const [text, setText] = React.useState("");
  const [isEmpty, setIsEmpty] = React.useState(false);
  const user = useUserContext();
  const ENTER_KEY = "Enter";

  const handleClick = React.useCallback(() => {
    if (!text) {
      setIsEmpty(true);
      return;
    }

    ChatService.sendMessage(text, user.user?.username);
    socket.emit("message");
    setText("");
  }, [text, user.user?.username]);

  const handleEnterKey = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ENTER_KEY) {
        handleClick();
      }
    },
    [handleClick]
  );

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    []
  );

  return (
    <Box className={s.input}>
      <TextField
        label="Написать сообщение..."
        variant="outlined"
        helperText={isEmpty && "Введите сообщение"}
        error={isEmpty}
        value={text}
        onChange={handleChange}
        onKeyDown={handleEnterKey}
        fullWidth
      />

      {React.useMemo(
        () => (
          <>
            <EmojiButton addEmoji={setText} />

            <IconButton onClick={handleClick}>
              <SendIcon color="primary" />
            </IconButton>
          </>
        ),
        [handleClick]
      )}
    </Box>
  );
};

export default Input;
