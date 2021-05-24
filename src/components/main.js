import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserStore from '../stores/user-store';
import kr from '../assets/images/knowledge-rally.png';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  Grid,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { AmplifySignOut } from '@aws-amplify/ui-react';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginBottom: '10px',
    marginTop: '10px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    paddingLeft: '10px',
    height: 38,
    width: 38,
    paddingTop: '35px',
  },
}));

const MainScreen = () => {
  const classes = useStyles();

  const userStore = useContext(UserStore);
  const { tournaments } = userStore;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userStore.getUserTournaments().then(() => {
      setLoading(false);
    });
  }, [userStore]);

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{
          padding: '60px 90px',
          minHeight: '100vh',
        }}
      >
        {!loading ? (
          <Grid
            item
            lg={12}
            style={{
              backgroundColor: 'white',
              padding: '100px 100px',
              boxShadow: '0 3px 5px 2px rgba(115, 112, 111, .3)',
            }}
          >
            <Grid
              container
              justify="center"
              style={{ marginTop: '20px', marginBottom: '20px' }}
            >
              <img src={kr} alt="Knowledge-rally Logo" />
            </Grid>
            <AmplifySignOut />
            <Grid
              container
              style={{
                marginTop: '20px',
                marginBottom: '20px',
              }}
            >
              <Typography variant="h3" style={{ fontWeight: 600 }}>
                Active Tournaments
                <Divider />
              </Typography>
            </Grid>
            <Grid container justify="flex-end">
              <Button disabled={true} key="new-tournament" variant="contained">
                Join new tournament
              </Button>
            </Grid>
            {tournaments.length > 0 ? (
              tournaments.map((tournament, key) => (
                <Card className={classes.root} key={key}>
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <Typography component="h5" variant="h5">
                        Score: {tournament.score}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        Positioning: {tournament.positioning} players
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        Remaining days: {tournament.remainingDays}
                      </Typography>
                    </CardContent>
                  </div>
                  <Link
                    to={{
                      pathname: '/game',
                      state: {
                        score: tournament.score,
                        tournamentId: tournament.tournamentId,
                      },
                    }}
                  >
                    <IconButton aria-label="play">
                      <PlayArrowIcon className={classes.playIcon} />
                    </IconButton>
                  </Link>
                </Card>
              ))
            ) : (
              <Grid container justify="center">
                <Typography component="h5" variant="h5">
                  Join a new tournament to start playing!
                </Typography>
              </Grid>
            )}
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </>
  );
};

export default MainScreen;
