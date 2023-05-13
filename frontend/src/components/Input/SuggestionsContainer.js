import React from 'react';
import { Chip, Container } from "@mui/material";

export default function SuggestionsContainer(props) {
  
  const onSuggestionClicked = (e) => {
    console.log('clicked ', e.target.innerText);
    props.addUserInput(e.target.innerText);
  };

  return (
    <Container style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between"}}>
      {props.suggestions.map((question, i) => (
        <Chip
          key={i}
          label={question}
          variant="outlined"
          style={{ cursor: props.disabled ? 'default' : 'pointer', backgroundColor: props.disabled ? 'gray' : 'white' }}
          onClick={props.disabled ? null : onSuggestionClicked}
        />
      ))}
    </Container>
  );
};

