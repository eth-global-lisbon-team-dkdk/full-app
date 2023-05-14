import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@mui/material';

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

export default function FullWidthButtons() {
  const classes = useStyles();

  return (
    <div className={classes.buttonContainer}>
      <Button disableElevation variant="contained" color="primary" style={{ textTransform: "none", borderRadius: "0 0 0 30px", borderTop: "0.5px solid #802EBF", fontWeight: "bold"}}>
        Accept
      </Button>
      <Button disableElevation variant="contained" style={{ color: "red", backgroundColor: "white", borderRadius: "0 0 30px 0", borderTop: "0.5px solid #802EBF", textTransform: "none", fontWeight: "bold"}}>
        Reject
      </Button>
    </div>
  );
};
