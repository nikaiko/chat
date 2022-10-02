import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserContext from "./contexts/UserContext";
import UserStore from "./stores/UserStore";

import "./styles/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserContext.Provider value={{ user: new UserStore() }}>
      <App />
    </UserContext.Provider>
  </React.StrictMode>
);
