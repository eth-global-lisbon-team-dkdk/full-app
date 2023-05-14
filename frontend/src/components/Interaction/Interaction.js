import React, { useState } from "react";
import { Button, Container, Paper, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as Logo } from '../../images/Bot.svg';
import TextAnimation from "./TextAnimation";
import FullWidthButtons from "./FullWidthButtons";
import { useApp } from "../../contexts/AppContext";

const useStyles = makeStyles((theme) => ({
  circle: {
    maxHeight: "50px",
    maxWidth: "50px",
  }
}));

export default function Interaction(props) {
  const classes = useStyles();
  const [visibleLinks, setVisibleLinks] = useState(!props.last && props.message && props.message.links && props.message.links.length > 0 ? true : false);
  const scrollToBottom = useApp();

  const showLinks = () => {
    if (props.message.links.length > 0) {
      setVisibleLinks(true);
    }
    props.onFinishedWriting();
    scrollToBottom();
  }

  return (
    <>
      <div style={{
        display: "flex"
      }}>
        {props.left && !props.inSequence && <Logo className={classes.circle} style={{ marginLeft:"-1.5rem", padding:"0", maxWidth: "40px", maxHeight: "40px"}} />}
        {props.left && props.inSequence && <Container style={{ position:"relative", margin:"0 0 0 -1.5rem", padding:"0", width: "40px", height: "40px"}} />}
        {props.message && <Paper
          style={{
            backgroundColor: props.left ? '#FFFFFF' : '#7234D5',
            position: 'relative',
            padding: props.left ? (props.message.isAction ? '10px 0 0 0' : '10px 15px 10px 20px') : "10px 20px",
            marginLeft: props.left ? '1rem' : 'auto',
            marginBottom: '10px',
            width: 'fit-content',
            color: props.left ? 'black' : 'white',
            maxWidth: props.left ? '70%' : '50%',
            borderRadius: props.left ? '2px 30px 30px 30px' : '30px 30px 2px 30px',
            minWidth: props.message.isAction && "400px"
          }}
          elevation={2}
        >
          { !props.message.isAction ?
            (
              props.left && props.last && !visibleLinks && !props.default ?
              <TextAnimation text={props.message.text} onFinishedWriting={showLinks} /> :
              <Typography variant="body2" textAlign={props.left ? "left" : "right"}>{props.message.text}</Typography>
            ) :
            <>
              <Typography variant="body2" textAlign={props.left ? "left" : "right"} style={{ padding: "0 20px", fontWeight: "bold" }}>Please confirm the following transaction:</Typography>
              <ul>
                <li style={{ "listStyle": "disc inside none" }}>You're attempting to swap MATIC ➜ {props.message.symbol.toUpperCase()}</li>
                <li style={{ "listStyle": "disc inside none" }}>Spending amount: {props.message.amount_matic} MATIC</li>
                <li style={{ "listStyle": "disc inside none" }}>Contract: UniSwap V2 Router</li>
                <li style={{ "listStyle": "disc inside none" }}>Chain: Polygon</li>
              </ul>
            </>
          }
          {props.left && props.message.links.length > 0 && visibleLinks && !props.message.isAction &&
            <Container style={{ marginTop: "10px", padding: "0" }}>
              <Container style={{ padding: "0" }}>
                <Typography variant="subtitle2" textAlign="left" style={{ fontSize: "12px"}}>Learn More</Typography>
                <>
                {props.message.links.map((link, index) => 
                  <Button
                    key={index}
                    onClick={() => window.open(link, "_blank")}
                    variant="outlined"
                    style={{
                      padding: '0px 10px',
                      margin: '5px 0px',
                      textDecoration: 'none',
                      textTransform: "none",
                      display: "block",
                    }}
                  >
                    {link}
                  </Button>)}
                </>
              </Container>
            </Container>
          }
          {
            props.left && props.message.isAction &&
            <FullWidthButtons transaction={props.transaction} />
          }
        </Paper>}
      </div>
    </>
  );
}
