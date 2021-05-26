import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import logo from '../assets/images/blue2.png';
import tinyLogo from '../assets/images/tiny.png';
import {
  Typography,
  Button,
  Grid,
  AppBar,
  Toolbar,
  CssBaseline,
  Container,
} from '@material-ui/core';
import { Auth } from 'aws-amplify';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(10),
  },
  title: {
    flexGrow: 1,
    fontWeight: 600,
  },
  heroContent: {
    backgroundColor: '#fce043',
    backgroundImage: 'linear-gradient(315deg, #fce043 0%, #fb7ba2 74%)',
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

const Hero = ({ joinTournament }) => {
  const history = useHistory();
  const classes = useStyles();

  async function signOut() {
    try {
      await Auth.signOut({ global: true });
      history.push('/');
      window.location.reload();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="relative" color="default">
          <Toolbar>
            <img src={tinyLogo} alt="Knowledge-rally Tiny Logo" />
            <Typography variant="h6" className={classes.title}>
              Knowledge Rally
            </Typography>
            <Button variant="contained" color="primary" onClick={signOut}>
              SIGNOUT
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Grid container spacing={2} justify="center">
              <img src={logo} alt="Knowledge-rally Logo" />
            </Grid>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  {joinTournament ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => history.push('/tournaments')}
                    >
                      JOIN NEW TOURNAMENT
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => history.push('/')}
                    >
                      BACK TO MAIN MENU
                    </Button>
                  )}
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Hero;
