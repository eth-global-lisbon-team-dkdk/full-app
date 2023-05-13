import { Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingText(props) {

  //true => left side => aka system

  // buttons with suggestions only when user input is next

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: "4rem", marginBottom: "1rem" }}>
      <CircularProgress color="success" size={20} style={{ marginRight: '8px', color: 'green' }} />
      <Typography variant="body1" color="GrayText" >{props.text}</Typography>
    </div>
  );
}
