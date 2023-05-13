import React, { useState } from "react";
import { Button, Container, Paper, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as Logo } from '../../images/Bot.svg';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import TextAnimation from "./TextAnimation";
import LoadingText from "./LoadingText";
import { APP_NAME } from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  circle: {
    maxHeight: "50px",
    maxWidth: "50px",
    borderRadius: "50%",
  }
}));

export default function Interaction(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [visibleLinks, setVisibleLinks] = useState(props.last ? false : true);

  //true => left side => aka system

  const showLinks = () => {
    setVisibleLinks(true);
    props.onFinishedWriting();
  }

  return (
    <>
      <div style={{
        display: "flex"
      }}>
        {props.left && <Logo className={classes.circle} style={{ backgroundColor:"blue", margin:"0", padding:"0", maxWidth: "40px", maxHeight: "40px"}} />}
        {props.message && <Paper
          style={{
            backgroundColor: props.left ? '#FFFFFF' : '#7234D5',
            position: 'relative',
            padding: props.left ? '10px 15px 10px 20px' : "10px 20px",
            marginLeft: props.left ? '1rem' : 'auto',
            marginRight: !props.left && '2rem',
            marginBottom: '20px',
            width: 'fit-content',
            color: props.left ? 'black' : 'white',
            maxWidth: props.left ? '65%' : '50%',
            transition: expanded ? 'max-height 1s ease' : 'none',
            maxHeight: expanded ? '100%' : 'fit-content',
            borderRadius: props.left ? '2px 30px 30px 30px' : '30px 30px 2px 30px',
          }}
          elevation={1}
          >
            {
              props.left && props.last && !visibleLinks ?
              <TextAnimation text={props.message} onFinishedWriting={showLinks} /> :
              <Typography variant="body1" textAlign={props.left ? "left" : "right"}>{props.message}</Typography>
            }
            {/* (
              expanded ?
              <Typography variant="body1" textAlign={props.left ? "left" : "right"}>{props.message}</Typography> : 
              <Typography variant="body1" textAlign={props.left ? "left" : "right"}>{props.message.substring(0,250) + "..."}</Typography>
            ) */}

          {props.left && visibleLinks &&
            <Container style={{ marginTop: "10px", padding: "0" }}>
              <Container style={{ padding: "0" }}>
                <Typography variant="subtitle2" textAlign="left" style={{ color: "gray", fontSize: "12px"}}>Learn More</Typography>
                <Button
                  onClick={() => window.open("https://www.coingecko.com/", "_blank")}
                  style={{
                    padding: '0px 15px',
                    textDecoration: 'none',
                    textTransform: "none",
                    backgroundColor: "gray",
                  }}  
                >
                  coingecko.com
                </Button>
              </Container>
            </Container>
          }
      {/*       
          { props.message.length > 250 && props.left && !props.last &&
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
          } */}
        </Paper>}
      </div>
    </>
  );
}
