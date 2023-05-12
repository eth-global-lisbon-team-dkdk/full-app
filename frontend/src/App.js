import React from "react";
import AppBarApp from "./components/AppBar";
import Chat from "./components/Chat";
import "./index.css";
import Input from "./components/Input";
import { Box } from "@mui/material";

function App() {
  return (
    <Box sx={{height: "100%"}}>
      <AppBarApp />
      <Chat />
      <Input />
    </Box>
  );
}

export default App;
