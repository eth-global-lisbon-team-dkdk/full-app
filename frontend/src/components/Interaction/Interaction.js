import React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  messageContainer: {
    margin: "1rem 0",
    backgroundColor: "red",
    borderRadius: "10px",
    maxWidth: "75%",
  },
}));

export default function Interaction(props) {
  const classes = useStyles();

  //true => left side aka system
  
  return (
    <Box className={classes.messageContainer}>
      <p>{props.message}</p>
    </Box>
  );
}
