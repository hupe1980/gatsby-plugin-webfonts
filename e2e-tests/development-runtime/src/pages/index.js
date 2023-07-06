import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";

import ProTip from "../components/pro-tip";
import Link from "../components/link";

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`Built with love by the `}
      <MuiLink color="inherit" href="https://material-ui.com/">
        Material-UI
      </MuiLink>
      {` team.`}
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gatsby example
        </Typography>
        <Typography
          variant="p"
          component="p"
          fontFamily="Open Sans"
          fontWeight={400}
          data-testid="self-hosted-font"
        >
          Static Font Example
        </Typography>
        <Typography
          variant="p"
          component="p"
          fontFamily="Roboto"
          fontWeight={400}
          data-testid="google-font"
        >
          Google Font Example
        </Typography>
        <Typography
          variant="p"
          component="p"
          fontFamily="Rubik"
          fontWeight={400}
          data-testid="google2-font"
        >
          Google2 Font Example
        </Typography>
        <Link to="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <MadeWithLove />
      </Box>
    </Container>
  );
}
