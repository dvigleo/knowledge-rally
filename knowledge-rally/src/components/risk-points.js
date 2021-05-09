import React, { useState } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Typography,
  Button,
  Radio,
  Grid,
} from "@material-ui/core";

const points = [
  {
    value: "0",
  },
  {
    value: "1",
  },
  {
    value: "2",
  },
];

const containerStyle = {
  background: "white",
  boxShadow: "0 3px 5px 2px rgba(115, 112, 111, .3)",
  border: 0,
  color: "black",
  marginBottom: "20px",
  padding: "20px 20px",
  width: "100vh",
};

const RiskPoints = ({ handlePointsToRisk }) => {
  const [pointsToRisk, setPointsToRisk] = useState("0");

  const handleChange = (event) => {
    setPointsToRisk(event.target.value);
  };
  return (
    <Grid item xs={8} style={containerStyle}>
      <Grid container alignItems="center">
        <Typography variant="h4" align="center" style={{ fontWeight: 600 }}>
          Select the points to risk
        </Typography>
      </Grid>
      <Grid container alignItems="center">
        <form>
          <FormControl component="fieldset" fullWidth={true}>
            <RadioGroup
              aria-label="pointsToRisk"
              name="pointsToRisk"
              value={pointsToRisk}
              onChange={handleChange}
            >
              {points.map((option) => (
                <FormControlLabel
                  value={option.value}
                  control={<Radio />}
                  label={option.value}
                  key={option.value}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Button
            onClick={() => handlePointsToRisk(pointsToRisk)}
            fullWidth
            color="primary"
            style={{ maxWidth: "100%" }}
          >
            START GAME
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default RiskPoints;
