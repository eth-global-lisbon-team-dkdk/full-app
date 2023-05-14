import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@mui/material';
import { postQuestion } from '../../api/backend';
import { useAccountAbstraction } from '../../store/accountAbstractionContext';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      flex: '0 0 50%',
      margin: 0,
      padding: 0,
    },
  },
}));

export default function FullWidthButtons({ transaction, onNewMessage }) {
  const { signAndConfirmTransaction, executeTransaction } = useAccountAbstraction();
  const classes = useStyles();

  const onReject = async () => {
    onNewMessage({ text: "I reject your suggestion.", who: "user", is_action: false, links: [], template: [] });
  }

  const onSuccess = async () => {
    signAndConfirmTransaction(transaction);
    executeTransaction(transaction);
  }

  return (
    <div className={classes.buttonContainer}>
      <Button disableElevation onClick={onSuccess} variant="contained" color="primary" style={{ textTransform: "none", borderRadius: "0 0 0 30px", borderTop: "0.5px solid #802EBF", fontWeight: "bold"}}>
        Accept
      </Button>
      <Button disableElevation onClick={onReject} variant="contained" style={{ color: "red", backgroundColor: "white", borderRadius: "0 0 30px 0", borderTop: "0.5px solid #802EBF", textTransform: "none", fontWeight: "bold"}}>
        Reject
      </Button>
    </div>
  );
};
