
import { Box, Grid, IconButton, Paper, TextField } from "@mui/material";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import { Container } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    height: "4.5rem",
    backgroundColor: "white",
    // boxShadow: "0px -1px 1px rgba(0, 0, 0, 0.25)",
  },
  input: {
  }
}));

export default function Input() {
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendClick = () => {
    // Handle send button click event here
    console.log('Send clicked');
  };


  return (
    <Box className={classes.inputContainer}>
        <Grid container style={{ alignItems: "center"}}>
          <Grid item xs={1} className={classes.microIcon}>
            <center>
              <IconButton>
                <MicIcon />
              </IconButton>
            </center>
          </Grid>
          <Grid item xs={10} className={classes.input}>
          <TextField
            fullWidth
            placeholder="Type here something"
            value={inputValue}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            InputProps={{ style: { borderRadius: '20px', margin: '0', padding: '0' } }}
          />
          </Grid>
          <Grid item xs={1} className={classes.sendIcon}>
            <center>
            <IconButton>
              <SendIcon />
            </IconButton>
            </center>
          </Grid>
        </Grid>
    </Box>
  );
}
