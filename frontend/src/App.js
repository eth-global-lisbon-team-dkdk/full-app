import React, { useState } from "react";
import AppBarApp from "./components/AppBar";
import Chat from "./components/Chat";
import "./index.css";
import Input from "./components/Input/Input";
import { Box } from "@mui/material";
import { useApp } from "./contexts/AppContext";

const dummy_messages = [
  // { text: "Some request to the system", who: "user"},
  // { text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.", who: "system"},
  // { text: "Some request to the system", who: "user"},
  // { text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.", who: "system"},
  // { text: "Some request to the system", who: "user"},
  // { text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.", who: "system"},
];

const initial_suggestions = [
  'Learn about web3 and crypto',
  'Investment a token or project',
  'Trade or swap with zero fees',
];

function App() {
  const [messages, setMessages] = useState(dummy_messages);
  const [suggestions, setSuggestions] = useState(initial_suggestions);
  const [disabled, setDisabled] = useState(false);
  const { scrollToBottom } = useApp();

  const onNewMessage = async (message) => {
    setDisabled(true);
    setMessages((messages) => [...messages, message]);
    setSuggestions([]);
    await makeRequest();
  };

  const updateSuggestions = () => {
    setDisabled(false);
  }
  
  const makeRequest = async () => {
    scrollToBottom();
    await new Promise(res => setTimeout(res, 2500));
    setMessages((messages) => [...messages, { text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the system.", who: "system" }]);
    setSuggestions(["suggestion 1", "suggestion 2", "suggestion 3"]);
  }
  
  return (
    <Box sx={{height: "100%"}}>
      <AppBarApp />
      <Chat messages={messages} onFinishedWriting={updateSuggestions} />
      <Input onNewMessage={onNewMessage} disabled={disabled} suggestions={suggestions} makeRequest={makeRequest} />
    </Box>
  );
}

export default App;
