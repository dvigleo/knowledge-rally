import React, { useState } from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Typography,
  Button,
  Radio,
  Grid,
  Container,
} from '@material-ui/core';

const points = [
  {
    value: '0',
    label: '0 points',
  },
  {
    value: '1',
    label: '1 point',
  },
  {
    value: '2',
    label: '2 points',
  },
];

const RiskPoints = ({ handlePointsToRisk }) => {
  const [pointsToRisk, setPointsToRisk] = useState('0');

  const handleChange = event => {
    setPointsToRisk(event.target.value);
  };

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" style={{ fontWeight: 600 }}>
          Select the points to risk for the next question
        </Typography>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ padding: '20px' }}
        >
          <form>
            <FormControl component="fieldset" fullWidth={true}>
              <RadioGroup
                aria-label="pointsToRisk"
                name="pointsToRisk"
                value={pointsToRisk}
                onChange={handleChange}
                row
              >
                {points.map(option => (
                  <FormControlLabel
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                    key={option.value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Grid container>
              <Grid item xs={12} style={{ padding: '20px' }}>
                <Button
                  onClick={() => handlePointsToRisk(pointsToRisk)}
                  fullWidth
                  color="primary"
                  variant="contained"
                >
                  START GAME
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </>
  );
};

export default RiskPoints;
