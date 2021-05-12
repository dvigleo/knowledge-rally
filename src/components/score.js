import React from "react";
import { Button, Divider, Grid, Typography } from "@material-ui/core";

const containerStyle = {
  background: "white",
  boxShadow: "0 3px 5px 2px rgba(115, 112, 111, .3)",
  border: 0,
  color: "black",
  marginBottom: "20px",
  width: "100vh",
  height: "40vh",
  padding: "20px 20px",
};

const Score = ({ score, won, handleReturnToMain, correctAnswer }) => {
  return (
    <Grid item xs={8} style={containerStyle}>
      <Grid container justify="center">
        {won ? (
          <Typography variant="h4" align="center" style={{ fontWeight: 600 }}>
            Correct
          </Typography>
        ) : (
          <>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                align="center"
                style={{ fontWeight: 600 }}
              >
                Sorry, that is not correct
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                The correct answer was:
                <Typography
                  variant="h6"
                  align="center"
                  style={{ fontWeight: 600, color: "green" }}
                >
                  {correctAnswer}
                </Typography>
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
      <Divider />
      <Grid container>
        <Grid item xs={12} style={{ marginTop: "15px" }}>
          <Typography variant="h4" align="center">
            {score}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="center">
            Score
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={handleReturnToMain}
            fullWidth
            color="primary"
            style={{ maxWidth: "100%" }}
          >
            RETURN TO MENU
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Score;
