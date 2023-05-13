
import React, { useState } from "react";
import { Box, Container, IconButton, InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import MicIcon from '@mui/icons-material/Mic';

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    height: "6rem",
    // backgroundColor: "white",
  },
  suggestions: {
    // width: "100%",
    // minHeight: "2rem",
    // backgroundColor: "red",
  }
}));

export default function Input() {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Box className={classes.inputContainer}>
      <Container container style={{ alignItems: "center", maxWidth: "65%",}}>
          <Container className={classes.suggestions}>

          </Container>
          <TextField
            fullWidth
            placeholder="Type here something"
            value={inputValue}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            className="reveal"
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
