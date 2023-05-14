
import React, { useState } from "react";
import { Box, Container, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import SuggestionsContainer from "./SuggestionsContainer";
import Footer from "../Footer/Footer";

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#F3EEFC",
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
      addUserInput(inputValue);
      setInputValue("");
    }
  }

  const addUserInput = (input) => {
    onNewMessage({ text: input, who: "user" });
  }

  return (
    <Box className={classes.inputContainer} >
      <Container style={{ alignItems: "center", maxWidth: "45%"}}>
          {suggestions.length !== 0 && <SuggestionsContainer suggestions={suggestions} disabled={disabled} addUserInput={addUserInput}/>}
          <Box boxShadow={3} borderRadius={4} className={classes.textField} style={{ margin: suggestions.length !== 0 ? '0 0 1rem 0' : '1rem 0 1rem 0' }}>
            <TextField
              fullWidth
              disabled={disabled}
              placeholder="Ask me anything crypto, fren!"
              value={inputValue}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
              onKeyDown={keyPressed}
              style={{ padding: '0', margin: '0' }}
              InputProps={{
                style: {
                  backgroundColor: "white",
                  borderRadius: '10px',
                  margin: '0',
                  padding: '0',
                  elevation: '1',
                },
                // startAdornment: (
                //   <InputAdornment position="start" style={{ marginLeft: "1rem"}}>
                //     <IconButton>
                //       <MicIcon />
                //     </IconButton>
                //   </InputAdornment>
                // ),
              }}
            />
          </Box>
      </Container>
      <Footer />
    </Box>
  );
}
