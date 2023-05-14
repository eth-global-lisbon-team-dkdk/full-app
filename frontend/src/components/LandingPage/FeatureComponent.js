import { Typography } from "@mui/material";

export default function FeatureComponent({ title, emoji, description }) {

  return (
    <div align="center">
      <div>
        <Typography variant="h6" minHeight="65px">{title}</Typography>
      </div>
      <div style={{ margin: "1rem 0", fontSize: "100px" }}>{emoji}</div>
      <Typography variant="body2">{description}</Typography>
    </div>
  );
}
