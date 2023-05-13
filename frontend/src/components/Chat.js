import React from "react";
import { Container } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import Interaction from "./Interaction/Interaction";

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    margin: "5rem 0 9rem 0",
  },
}));

export default function Chat({ messages, onFinishedWriting }) {
  const classes = useStyles();

  console.log(messages);

  return (
    <>
    <Container className={classes.chatContainer} style={{ maxWidth: "70%" }}>
      {messages.map((message, i) => (
        <>
          {/*
            { i === messages.length-1 && message.who === "system" && !loaded ?
            <LoadingText text="Scraping data sources..."/> : }*/}
            {/* message !== "" &&  */}
            <Interaction onFinishedWriting={onFinishedWriting} message={message.text} who={message.who === "system" ? true : false} key={i} last={i === messages.length-1} />
          {/* } */}
        </>
      ))}
    </Container>
    </>
  );
}
