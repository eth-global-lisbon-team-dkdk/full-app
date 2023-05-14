import { makeStyles } from "@material-ui/styles";
import { Button, Container } from "@mui/material";
import { ethers } from "ethers";
import { React, useState } from "react";
import { useAccountAbstraction } from "../store/accountAbstractionContext";


const useStyles = makeStyles((theme) => ({
  chatContainer: {
    margin: "5rem 0 9rem 0",
  },
}));

export default function Nogo() {
  const classes = useStyles();
  const {createTransaction, signAndConfirmTransaction, executeTransaction, isAuthenticated} = useAccountAbstraction();
  const [transaction, setTransaction] = useState(null);

  const createTransactionHandler = async () => {
    const tx = await createTransaction(ethers.utils.parseEther("1").toString(), "0x5fe2B58c013d7601147DcdD68C143A77499f5531", "0x8C28d9e60E05BcDCf7A4d2FeA259aBb4Bc4Ee51f");
    setTransaction(tx);
  }

  const signAndConfirmTransactionHandler = () => {
    signAndConfirmTransaction(transaction);
  }
  
  const executeTransactionHandler = () => {
    executeTransaction(transaction);
  }

  return (
    <Container className={classes.chatContainer} style={{ maxWidth: "70%" }}>
      {isAuthenticated && 
        <div>
          <Button onClick={createTransactionHandler}>Create tx</Button>
          <Button onClick={signAndConfirmTransactionHandler}>Sign the tx</Button>
          <Button onClick={executeTransactionHandler}>Execute the tx</Button>
        </div>}
    </Container>
  );
}
