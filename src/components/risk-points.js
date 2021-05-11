import React, { useState } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Typography,
  Button,
  Radio,
  Divider,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const points = [
  {
    value: "0",
    label: "0 points",
  },
  {
    value: "1",
    label: "1 point",
  },
  {
    value: "2",
    label: "2 points",
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
      <Grid container justify="center">
        <Typography variant="h4" align="center" style={{ fontWeight: 600 }}>
          Select the points to risk
        </Typography>
      </Grid>
      <Divider />
      <Grid container justify="center">
        <form>
          <FormControl component="fieldset" fullWidth={true}>
            <RadioGroup
              aria-label="pointsToRisk"
              name="pointsToRisk"
              value={pointsToRisk}
              onChange={handleChange}
              row
            >
              {points.map((option) => (
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
            <Grid item xs={6}>
              <Button
                onClick={() => handlePointsToRisk(pointsToRisk)}
                fullWidth
                color="primary"
                style={{ maxWidth: "100%" }}
              >
                START GAME
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Link to="/main">
                <Button fullWidth color="primary" style={{ maxWidth: "100%" }}>
                  RETURN TO MAIN SCREEN
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default RiskPoints;
