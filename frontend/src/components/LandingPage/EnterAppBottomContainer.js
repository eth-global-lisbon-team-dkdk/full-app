import React from 'react';
import { Chip, Container } from "@mui/material";
import { useApp } from '../../contexts/AppContext';

export default function EnterAppBottomContainer(props) {
  const { scrollToBottom } = useApp();

  const onEnterClick = () => {
    scrollToBottom();
  };

  return (
    <Container style={{ marginTop: "1rem", padding: "0", textAlign: "center" }}>
      <Chip
        label={"Start chat with CryptoWise"}
        variant="outlined"
        style={{ cursor: props.disabled ? 'default' : 'pointer', backgroundColor: '#9567E0', color: "#FFFFFF", fontSize: "15px", borderRadius: "10px" , fontWeight: "bold", padding: "20px 8px" }}
        onClick={onEnterClick}
      />
    </Container>
  );
};

