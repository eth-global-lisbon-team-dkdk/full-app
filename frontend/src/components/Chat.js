import React from "react";
import { Container } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import Interaction from "./Interaction/Interaction";
import LoadingText from "./Interaction/LoadingText";
import { APP_NAME } from "../utils/constants";

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    margin: "5rem 0 9rem 0",
  },
}));

export default function Chat({ messages, onFinishedWriting, loading }) {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.chatContainer} style={{ maxWidth: "70%" }}>
        {messages.map((message, i) => (
          <Interaction loading={loading} onFinishedWriting={onFinishedWriting} message={message.text} left={message.who === "system" ? true : false} key={i} last={i === messages.length-1} />
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
