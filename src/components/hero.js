import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import kr from '../assets/images/knowledge-rally.png';
import { Link } from 'react-router-dom';
import {
  Typography,
  Button,
  Grid,
  AppBar,
  Toolbar,
  CssBaseline,
  Container,
} from '@material-ui/core';
import { AmplifySignOut } from '@aws-amplify/ui-react';

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
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="relative" color="default">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Knowledge Rally
            </Typography>
            <AmplifySignOut />
          </Toolbar>
        </AppBar>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Grid container spacing={2} justify="center">
              <img src={kr} alt="Knowledge-rally Logo" />
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
