import React, { useState } from "react";
import { Button, Container, Paper, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as Logo } from '../../images/Bot.svg';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import TextAnimation from "./TextAnimation";
import FullWidthButtons from "./FullWidthButtons";

const useStyles = makeStyles((theme) => ({
  circle: {
    maxHeight: "50px",
    maxWidth: "50px",
  }
}));

export default function Interaction(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [visibleLinks, setVisibleLinks] = useState(!props.last && props.message && props.message.links && props.message.links.length > 0 ? true : false);

  //true => left side => aka system

  const showLinks = () => {
    console.log("finished writing 0");
    if (props.message.links.length > 0) {
      console.log("finished writing 1");
      setVisibleLinks(true);
      console.log("finished writing 2");
    }
    props.onFinishedWriting();
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
            transition: expanded ? 'max-height 1s ease' : 'none',
            maxHeight: expanded ? '100%' : 'fit-content',
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
                  <li style={{ "listStyle": "disc inside none" }}>You're attempting to swap ETH ➜ PEPE</li>
                  <li style={{ "listStyle": "disc inside none" }}>Spending amount: 0.100 ETH</li>
                  <li style={{ "listStyle": "disc inside none" }}>Contract: UniSwap V2 Router</li>
                  <li style={{ "listStyle": "disc inside none" }}>Chain: Polygon</li>
                </ul>
              </>
            }
            {/* (
              expanded ?
              <Typography variant="body1" textAlign={props.left ? "left" : "right"}>{props.message}</Typography> : 
              <Typography variant="body1" textAlign={props.left ? "left" : "right"}>{props.message.substring(0,250) + "..."}</Typography>
            ) */}

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
            props.left && visibleLinks && props.message.isAction &&
            <FullWidthButtons />
          }
          {/*
            {
              props.message.length > 250 && props.left && !props.last &&
              <div key={props.key} style={{ position: 'absolute', bottom: '-15px', left: '45%' }}>
                <Button
                  style={{
                    padding: '6px 16px',
                    backgroundColor: 'white',
                    border: '1px solid black',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '0.7rem',
                    textTransform: "none",
                  }}
                  endIcon={!expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  onClick={() => setExpanded(!expanded)}
                >
                  {!expanded ? "See More" : "See Less"}
                </Button>
              </div>
            }
          */}
        </Paper>}
      </div>
    </>
  );
}
