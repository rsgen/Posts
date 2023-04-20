import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Button, Card, Grid, Toolbar, Typography } from "@mui/material";

export const NotFoundPage = ({ navigate, setRefresh }) => {
  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Toolbar />
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
      <Toolbar />
      <Button
        onClick={() => {
          navigate("/");
          setRefresh((refresh) => !refresh);
        }}
        variant="outlined"
        size="small"
        color="inherit"
        sx={{ marginBottom: 2 }}
      >
        Main Page
      </Button>
    </Grid>
  );
};
