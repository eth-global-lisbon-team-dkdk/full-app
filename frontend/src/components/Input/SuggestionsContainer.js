import React from 'react';
import { Chip, Container } from "@mui/material";
import { useAccountAbstraction } from "../../store/accountAbstractionContext";

export default function SuggestionsContainer(props) {
  const { loginWeb3Auth } = useAccountAbstraction();

  const onSuggestionClicked = (e) => {
    if (e.target.innerText === "Connect wallet") {
      loginWeb3Auth();
    } else {
      props.addUserInput(e.target.innerText);
    }
  };

  return (
    <Container style={{ margin: "1rem 0 0 0", padding: "0", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {props.suggestions.map((question, i) => (
        <Chip
          key={i}
          label={question}
          variant="outlined"
          style={{ cursor: props.disabled ? 'default' : 'pointer', backgroundColor: '#9567E0', color: "#FFFFFF", fontSize: "15px", borderRadius: "10px", margin: "0 0.25rem 0.5rem 0.25rem" , fontWeight: "bold", padding: "20px 8px" }}
          onClick={props.disabled ? null : onSuggestionClicked}
        />
      ))}
    </Container>
  );
};

