import React from "react";
import { Box } from "@mui/material";


export default function SeeMoreComponent() {

  return (
    <Box sx={{
      position: "absolute",
      maxWidth: "10%",
      backgroundColor: "red",
      borderRadius: "20px",
      bottom: "30px",
      textAlign: "center",
      margin: "0 auto",
    }}>
      <p>Expand</p>
    </Box>
  );
}
