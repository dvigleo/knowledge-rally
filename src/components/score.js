import React from 'react';
import {
  Button,
  Divider,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';

const Score = ({ score, won, handleReturnToMain, correctAnswer, points }) => {
  return (
    <Container maxWidth="md">
      {won ? (
        <Grid>
          <Typography
            variant="h4"
            align="center"
            style={{ fontWeight: 600, color: 'green' }}
          >
            Correct!
          </Typography>
        </Grid>
      ) : (
        <Grid>
          <Typography variant="h4" align="center" style={{ fontWeight: 600 }}>
            Sorry that is not correct
          </Typography>
          <Typography variant="h6" align="center">
            The correct answer was:
            <Typography
              variant="subtitle1"
              align="center"
              style={{ fontWeight: 600, color: 'green' }}
            >
              {correctAnswer}
            </Typography>
          </Typography>
        </Grid>
      )}
      <Divider />
      <Grid container>
        <Grid item xs={12} style={{ marginTop: '15px' }}>
          <Typography variant="h4" align="center">
            {score}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="center">
            Score
          </Typography>
          {won ? (
            <Typography
              variant="subtitle2"
              align="center"
              style={{ fontWeight: 600 }}
            >
              Nice! You won +{points} points
            </Typography>
          ) : (
            <Typography
              variant="subtitle2"
              align="center"
              style={{ fontWeight: 600 }}
            >
              Yikes! You lost {points} points
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} align="center" style={{ marginTop: '15px' }}>
          <Button
            onClick={handleReturnToMain}
            // fullWidth
            color="primary"
            variant="contained"
          >
            RETURN TO MENU
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Score;
