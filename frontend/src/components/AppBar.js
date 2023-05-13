import { makeStyles } from "@material-ui/styles";
import GitHubIcon from '@mui/icons-material/GitHub';
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import React from "react";
import { useApp } from "../contexts/AppContext";
import { useAccountAbstraction } from "../store/accountAbstractionContext";

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
  userInfo: {
    color: "black",
  }
}));

export default function AppBarApp() {
  const theme = useTheme();
  const { currentAccount, setCurrentAccount } = useApp();
  const { loginWeb3Auth, isAuthenticated, ownerAddress } = useAccountAbstraction()


  const classes = useStyles();

  const connectWallet = async () => {
    loginWeb3Auth();
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
        {/* TODO: modify styling + how user info are displayed} */}
        {!isAuthenticated ? <Button
          variant="contained"
          color="primary"
          onClick={connectWallet}
          className={classes.connectButton}
          disabled={currentAccount !== null}
          style={{ "background": !currentAccount && 'black', "color": !currentAccount && 'white'}}
        >
          Connect Wallet
        </Button> : <div className={classes.userInfo}>{ownerAddress}</div>}
      </Toolbar>
    </AppBar>
  );
}