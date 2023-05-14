import React from "react";
import { Container } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import Interaction from "./Interaction/Interaction";
import LoadingText from "./Interaction/LoadingText";
import { APP_NAME } from "../utils/constants";

const useStyles = makeStyles(() => ({
  chatContainer: {
    margin: "5rem 0 15rem 0",
  },
}));

export default function Chat({ messages, onNewMessage, addNewMessageToList, onFinishedWriting, transaction }) {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.chatContainer} style={{ maxWidth: "50%" }}>
        {messages.map((message, i) => (
          <Interaction addNewMessageToList={addNewMessageToList} onNewMessage={onNewMessage} transaction={transaction} onFinishedWriting={onFinishedWriting} message={message} left={message.who === "system" ? true : false} key={i} last={i === messages.length-1} inSequence={i !== 0 && message.who === messages[i-1].who} default={i <= 2}/>
        ))}
        {
          messages.length !== 0 && messages[messages.length-1].who === "user" &&
          <LoadingText
            text={APP_NAME + " is thinking..."}
            style={{ marginRight: "auto", marginLeft: "2rem" }}
          />
        }
      </Container>
    </>
  );
}
