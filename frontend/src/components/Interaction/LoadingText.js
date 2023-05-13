import { Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

export default function LoadingText(props) {

  //true => left side => aka system

  // buttons with suggestions only when user input is next

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: "2rem", marginBottom: "1rem" }}>
      <CheckIcon style={{ marginRight: '8px', color: 'green' }} />
      <Typography variant="body1">{props.text}</Typography>
    </div>
  );
}
