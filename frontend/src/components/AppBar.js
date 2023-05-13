import React from "react";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import { useApp } from "../contexts/AppContext";
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: "4rem",
  },
  toolbar: {
    margin: "0 17%"
  },
  disabled: {
    cursor: "alias",
    color: "gray",
  },
  connectButton: {
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "white",
      color: "white"
    },
  },
}));

export default function AppBarApp() {
  const theme = useTheme();
  const { currentAccount, setCurrentAccount } = useApp();

  const classes = useStyles();

  const connectWallet = async () => {
  };

  return (
    <AppBar className={classes.appBar} color="secondary" position="fixed">
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          style={{ flexGrow: 1 }}
        >
          <b>App Name</b>
        </Typography>
        <IconButton href="https://github.com/" style={{"marginRight": "1rem"}} color="primary">
          <GitHubIcon />
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          onClick={connectWallet}
          className={classes.connectButton}
          disabled={currentAccount !== null}
          style={{ "background": !currentAccount && 'black', "color": !currentAccount && 'white'}}
        >
          Connect Wallet
        </Button>
      </Toolbar>
    </AppBar>
  );
}