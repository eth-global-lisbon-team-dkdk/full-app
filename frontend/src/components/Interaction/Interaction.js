import React from "react";
import { Paper, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({

}));

export default function Interaction(props) {
  const classes = useStyles();

  //true => left side => aka system

  // buttons with suggestions only when user input is next

  return (
    <Paper
      style={{
        padding: '8px',
        marginLeft: props.who ? '2rem' : 'auto',
        marginRight: !props.who && '2rem',
        marginBottom: '20px',
        backgroundColor: props.who ? '#e0e0e0' : '#f5f5f5',
        width: 'fit-content',
        maxWidth: props.who ? '65%' : '50%',
      }}
      elevation={1}
    >
      <Typography variant="body1" textAlign={props.who ? "left" : "right"}>{props.message}</Typography>
    </Paper>
  );
}
