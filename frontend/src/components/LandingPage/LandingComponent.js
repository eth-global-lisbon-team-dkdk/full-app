import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FeatureComponent from "./FeatureComponent";

export default function LandingComponent() {

  return (
    <Box sx={{width: "70%", margin: "6rem auto 13rem auto"}}>
      <Typography variant="h2" align="center" style={{ color: "#4A3A4D", fontWeight: "bold"}}>Invest smarter, better,<br />faster, stronger.</Typography>
      <Grid container justifyContent="center" spacing={2} style={{marginTop: "2rem"}}>
        <Grid item lg={4}>
          <FeatureComponent title={<>Ultra-accessible<br/>knowledge base</>} emoji="📚" description="Learn about crypto if you're new to Web3. You can finally ask all the questions you were afraid to ask." />
        </Grid>
        <Grid item lg={4}>
          <FeatureComponent title="AI powered researcher" emoji="🤓" description="Find investment opportunities and supercharge your due diligence research on tokens and projects" />
        </Grid>
        <Grid item lg={4}>
          <FeatureComponent title="Swaps and automation" emoji="🔄" description="Trade with the lowest fees, and execute transactions while you sleep. Plus, your first swap is on us!" />
        </Grid>
      </Grid>
    </Box>
  );
}
