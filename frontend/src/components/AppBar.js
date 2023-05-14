import { makeStyles } from "@material-ui/styles";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { ethers } from "ethers";
import React from "react";
import { useApp } from "../contexts/AppContext";
import { ReactComponent as Logo } from '../images/Bot.svg';
import { useAccountAbstraction } from "../store/accountAbstractionContext";
import { APP_NAME } from "../utils/constants";

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
    marginRight: "1rem",
  }
}));

export default function AppBarApp() {
  const theme = useTheme();
  const { currentAccount, setCurrentAccount } = useApp();
  const { loginWeb3Auth, logoutWeb3Auth, deploySafe, isAuthenticated, ownerAddress, safeDeployed, safeSelected, safeBalance } = useAccountAbstraction()

  const classes = useStyles();

  const connectWallet = () => {
    loginWeb3Auth(); 
  };

  const deploySafeHandler = () => {
    deploySafe();
  }

  const logoutHandler = () => {
    logoutWeb3Auth();
  }


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
          Login / Register
        </Button> : <div className={classes.userInfo}><b>Personal address</b> {ownerAddress.slice(0,5) + "..." + ownerAddress.slice(ownerAddress.length-3, ownerAddress.length)}</div>}
        {/* {isAuthenticated && !safeDeployed && <Button onClick={deploySafeHandler}>Deploy a safe</Button>} */}
        <br />
        {/* {isAuthenticated && safeDeployed && <div className={classes.userInfo}><b>Safe address</b> {safeSelected.slice(0,5) + "..." + safeSelected.slice(safeSelected.length-3, safeSelected.length)}</div>} */}
        {/* {isAuthenticated && safeDeployed && safeBalance && <div className={classes.userInfo}><b>Safe balance</b> {ethers.utils.formatEther(ethers.BigNumber.from(safeBalance))} ETH</div>} */}
        {isAuthenticated && <Button onClick={logoutHandler}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
}