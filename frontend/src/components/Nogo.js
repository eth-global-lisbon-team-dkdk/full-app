import { makeStyles } from "@material-ui/styles";
import { Button, Container } from "@mui/material";
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
    const tx = await createTransaction(5, "0x2791bca1f2de4661ed88a30c99a7a9449aa84174", "0x461E2B57776d269544E8FFd397EFE1ce6eFBA969");
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
