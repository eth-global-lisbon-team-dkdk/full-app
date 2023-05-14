import { makeStyles } from "@material-ui/styles";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import React from "react";
import { useApp } from "../contexts/AppContext";
import { useAccountAbstraction } from "../store/accountAbstractionContext";
import { APP_NAME } from "../utils/constants";
import { ReactComponent as Logo } from '../images/Bot.svg';

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: "4rem",
  },
  toolbar: {
    margin: "0 15%"
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
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar className={classes.toolbar}>
        <Logo className={classes.circle} style={{ marginRight:"1rem", padding:"0", maxWidth: "40px", maxHeight: "40px"}} />
        <Typography
          variant="h6"
          style={{ flexGrow: 1 }}
          color={theme.palette.primary.main}
        >
          <b>{APP_NAME}</b>
        </Typography>
        {/* TODO: modify styling + how user info are displayed} */}
        {!isAuthenticated ? <Button
          variant="contained"
          color="primary"
          onClick={connectWallet}
          className={classes.connectButton}
          disabled={currentAccount !== null}
          style={{ "background": !currentAccount && 'linear-gradient(to right top, #7B1EA2, #695be5)'}}
        >
          Connect Wallet
        </Button> : <div className={classes.userInfo}>{ownerAddress.slice(0,5) + "..." + ownerAddress.slice(ownerAddress.length-3, ownerAddress.length)}</div>}
      </Toolbar>
    </AppBar>
  );
}