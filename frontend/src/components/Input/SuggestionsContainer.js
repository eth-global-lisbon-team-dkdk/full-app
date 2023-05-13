import React from 'react';
import { Chip, Container } from "@mui/material";

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  chip: {
    padding: "0 10px",
    minHeight: "30px",
    backgroundColor: "#9567E0",
    '&:hover': {
      backgroundColor: "#9567E0",
    }
  },
}));

export default function SuggestionsContainer(props) {
  const classes = useStyles();
  const onSuggestionClicked = (e) => {
    console.log('clicked ', e.target.innerText);
    props.addUserInput(e.target.innerText);
  };

  return (
    <Container style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap"}}>
      {props.suggestions.map((question, i) => (
        <Chip
          key={i}
          label={question}
          variant="outlined"
          className={classes.chip}
          style={{ cursor: props.disabled ? 'default' : 'pointer', backgroundColor: '#F3EEFC', color: "#7234D5", fontSize: "17px", borderRadius: "5px", marginRight: "1rem" }}
          onClick={props.disabled ? null : onSuggestionClicked}
        />
      ))}
    </Container>
  );
};

