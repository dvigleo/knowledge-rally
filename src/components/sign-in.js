import React, { useState } from "react";
import {
  Typography,
  Button,
  Divider,
  TextField,
  Grid,
} from "@material-ui/core";
import kr from "../assets/images/knowledge-rally.png";

const SignIn = ({ handleLogin }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(false);

  const handleSubmit = () => {
    handleLogin({ username: username, password: password });
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{
          padding: "60px 90px",
          minHeight: "100vh",
        }}
      >
        <Grid
          item
          lg={12}
          style={{
            backgroundColor: "white",
            padding: "100px 100px",
            boxShadow: "0 3px 5px 2px rgba(115, 112, 111, .3)",
          }}
        >
          <Grid container justify="center" style={{ marginTop: "20px" }}>
            <img src={kr} alt="Knowledge-rally Logo" /> />
          </Grid>
          <br></br>
          <Grid
            justify="center"
            container
            style={{
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <Typography variant="h3" style={{ fontWeight: 600 }}>
              Sign In
            </Typography>
          </Grid>
          <Divider />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: `rgb(251, 79, 20)`, color: "white" }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;
