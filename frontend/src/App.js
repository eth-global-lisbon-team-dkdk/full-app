import React, { useEffect, useState } from "react";
import AppBarApp from "./components/AppBar";
import Chat from "./components/Chat";
import "./index.css";
import Input from "./components/Input/Input";
import { Box } from "@mui/material";
import { useApp } from "./contexts/AppContext";
import { AccountAbstractionProvider } from "./store/accountAbstractionContext";
import { postQuestion } from "./api/backend";
import LandingComponent from "./components/LandingPage/LandingComponent";

const dummy_messages = [
  { who: "system", isAction: false, links: [], template: [], text: "👋 gm, this is CryptoWise" },
  { who: "system", isAction: false, links: [], template: [], text: "I can help you learn about crypto and super-charge your investment research before you invest. What's more: I can even do swaps or execute transactions on your behalf." },
  { who: "system", isAction: false, links: [], template: [], text: "What are you interested in?" },
];

const initial_suggestions = [
  'What is Web3?',
  'What is Ethereum?',
  'Is crypto safe?',
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [messages, setMessages] = useState(dummy_messages);
  const [suggestions, setSuggestions] = useState(initial_suggestions);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
      window.addEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => setScrolled(true);

  const onNewMessage = async (message) => {
    setDisabled(true);
    setMessages((messages) => [...messages, message]);
    setSuggestions([]);
    await makeRequest(message.text);
  };

  const updateSuggestions = () => {
    setDisabled(false);
  }
  
  const makeRequest = async (input) => {
    console.log("Making request", input);
    const response = await postQuestion(input);
    console.log("Response", response);
    await new Promise(res => setTimeout(res, 2500));
    setMessages((messages) => [...messages, { text: response.message, who: "system", isAction: response.is_action, links: response.links, template: response.template }]);
    setSuggestions([...response.template]);
  }
  
  return (
    <AccountAbstractionProvider>
      <Box sx={{height: "100%"}}>
        <AppBarApp />
        <LandingComponent />
        <Chat messages={messages} onFinishedWriting={updateSuggestions} />
        <Input onNewMessage={onNewMessage} scrolled={scrolled} disabled={disabled} suggestions={suggestions} makeRequest={makeRequest} />
      </Box>
    </AccountAbstractionProvider>
  );
}

export default App;
