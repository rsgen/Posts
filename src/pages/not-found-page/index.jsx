import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import {
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { padding } from "@mui/system";

export const NotFoundPage = () => {
  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Typography variant="h1">
          <SentimentVeryDissatisfiedIcon fontSize="70px" />
        </Typography>
        <Typography variant="h1">404</Typography>
        <Typography variant="h1">Page not found !</Typography>
      </Card>
    </Grid>
  );
};
