
import React, { useState } from "react";
import { Box, Container, IconButton, InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import MicIcon from '@mui/icons-material/Mic';
import SuggestionsContainer from "./SuggestionsContainer";

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
  },
}));

export default function Input({ onNewMessage, suggestions, disabled }) {
  const [inputValue, setInputValue] = useState('');
  const classes = useStyles();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const keyPressed = (event) => {
    if (event.key === "Enter") {
      console.log("Enter pressed");
      addUserInput(inputValue);
      setInputValue("");
    }
  }

  const addUserInput = (input) => {
    console.log("NEW INPUT ", input);
    onNewMessage({ text: input, who: "user" });
  }

  return (
    <Box className={classes.inputContainer} style={{ height: suggestions.length ? "8.5rem" : "5.5rem" }}>
      <Container style={{ alignItems: "center", maxWidth: "70%"}}>
          {suggestions.length !== 0 && <SuggestionsContainer suggestions={suggestions} disabled={disabled} addUserInput={addUserInput}/>}
          <TextField
            fullWidth
            disabled={disabled}
            placeholder="Type here something"
            value={inputValue}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            onKeyDown={keyPressed}
            InputProps={{
              style: {
                backgroundColor: "white",
                borderRadius: '20px',
                margin: '0',
                padding: '0',
              },
              startAdornment: (
                <InputAdornment position="start" style={{ marginLeft: "1rem"}}>
                  <IconButton>
                    <MicIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
      </Container>
    </Box>
  );
}
