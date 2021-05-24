import React from 'react';
import {
  Button,
  Divider,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';

const Score = ({ score, won, handleReturnToMain, correctAnswer }) => {
  return (
    <Container maxWidth="md">
      {won ? (
        <Typography variant="h4" align="center" style={{ fontWeight: 600 }}>
          Correct
        </Typography>
      ) : (
        <Grid>
          <Typography variant="h4" align="center" style={{ fontWeight: 600 }}>
            Sorry that is not correct
          </Typography>
          <Typography variant="h5" align="center">
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
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={handleReturnToMain}
            fullWidth
            color="primary"
            style={{ maxWidth: '100%' }}
          >
            RETURN TO MENU
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Score;
