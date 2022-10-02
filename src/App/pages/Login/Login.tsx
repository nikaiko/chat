import React from "react";
import { observer } from "mobx-react-lite";
import { Button, Paper, TextField } from "@mui/material";
import useUserContext from "../../../hooks/useUserContext";

import s from "./Login.module.scss";

const Login: React.FC = () => {
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [name, setName] = React.useState("");
  const user = useUserContext();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name) {
      user.login(name);
      setName("");
      return;
    }

    setIsEmpty(true);
  };

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    []
  );

  return (
    <Paper
      elevation={4}
      className={s.login}
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        fullWidth
        error={isEmpty}
        helperText={isEmpty && "Введите имя"}
        label="Имя"
        variant="outlined"
        value={name}
        onChange={handleChange}
      />
      <Button fullWidth variant="contained" type="submit">
        Войти
      </Button>
    </Paper>
  );
};

export default observer(Login);
