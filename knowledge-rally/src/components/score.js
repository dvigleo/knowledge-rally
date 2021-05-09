import React from "react";
import { Button, Divider, Grid, Typography } from "@material-ui/core";

const containerStyle = {
  background: "white",
  boxShadow: "0 3px 5px 2px rgba(115, 112, 111, .3)",
  border: 0,
  color: "black",
  marginBottom: "20px",
  width: "100vh",
  padding: "20px 20px",
};

const Score = ({ score, won, handlePlayAgain, correctAnswer }) => {
  return (
    <Grid item xs={8} style={containerStyle}>
      <Grid container alignItems="center">
        {won ? (
          <Typography variant="h4" align="center" style={{ fontWeight: 600 }}>
            Correct
          </Typography>
        ) : (
          <>
            <Typography variant="h4" align="center" style={{ fontWeight: 600 }}>
              Sorry, that is not correct
            </Typography>
            <Typography variant="h6" align="center" style={{ fontWeight: 600 }}>
              The correct answer was: {correctAnswer}
            </Typography>
          </>
        )}
      </Grid>
      <Divider />
      <Grid container alignItems="center">
        <Grid itemxs={12}>
          <Typography variant="h6" align="center">
            Score
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            {score}
          </Typography>
        </Grid>
        <Button
          onClick={handlePlayAgain}
          fullWidth
          color="primary"
          style={{ maxWidth: "100%" }}
          disabled={true}
        >
          PLAY AGAIN
        </Button>
      </Grid>
    </Grid>
  );
};

export default Score;
