import { Box } from "@mui/material";
import React from "react";
import AppBarApp from "./components/AppBar";
import Chat from "./components/Chat";
import Input from "./components/Input";
import "./index.css";
import { AccountAbstractionProvider } from "./store/accountAbstractionContext";

function App() {
  return (
    <AccountAbstractionProvider>
        <Box sx={{height: "100%"}}>
          <AppBarApp />
          <Chat />
          <Input />
      </Box>
    </AccountAbstractionProvider>
  );
}

export default App;
