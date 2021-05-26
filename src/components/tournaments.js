import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TournamentsStore from '../stores/tournaments-store';
import UserStore from '../stores/user-store';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CardActions,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { Hero } from './index';

const useStyles = makeStyles(theme => ({
  details: {
    display: 'flex',
    flex: 1,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions: {
    // flex: 'flex-end',
    paddingLeft: '10px',
  },
}));

const Tournaments = () => {
  const classes = useStyles();
  const tournamentsStore = useContext(TournamentsStore);
  const { tournaments } = tournamentsStore;
  const userStore = useContext(UserStore);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tournamentsStore.getTournaments().then(() => {
      tournamentsStore.getOpenTournaments().then(() => {
        setLoading(false);
      });
    });
    // tournamentsStore
    //   .getOpenTournaments()
    //   .then(tournamentsStore.getTournaments().then(setLoading(false)));
    // tournamentsStore.getTournaments().then(
    //   tournamentsStore.getOpenTournaments().then(() => {
    //     setLoading(false);
    //   })
    // );
  }, [tournamentsStore]);

  const handleJoinTournament = (
    tournamentId,
    remainingDays,
    playersEnrolled
  ) => {
    setLoading(true);
    userStore
      .joinTournament(tournamentId, remainingDays, playersEnrolled)
      .then(tournamentsStore.enrollUser(tournamentId))
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Hero joinTournament={false} />
      <Container maxWidth="md">
        {!loading ? (
          <Grid container spacing={4}>
            {tournaments.length > 0 ? (
              tournaments.map((tournament, key) => (
                <Grid item key={key} xs={12} sm={8} md={6}>
                  <Card className={classes.card}>
                    <div className={classes.details}>
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          Tournament #{tournament.id}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                          Remaining days: {tournament.remainingDays}
                        </Typography>
                        <Typography>
                          High Score: {tournament.highScore}
                        </Typography>
                        <Typography>
                          Players enrolled: {tournament.playersEnrolled}
                        </Typography>
                      </CardContent>
                    </div>
                    <div>
                      <CardActions className={classes.cardActions}>
                        <Grid container spacing={8}>
                          <Grid item xs={6}>
                            <Link
                              to={{
                                pathname: '/scoreboard',
                                state: {
                                  tournamentId: tournament.id,
                                },
                              }}
                            >
                              <Button variant="outlined" color="primary">
                                VIEW SCOREBOARD
                              </Button>
                            </Link>
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              onClick={() =>
                                handleJoinTournament(
                                  tournament.id,
                                  tournament.remainingDays,
                                  tournament.playersEnrolled
                                )
                              }
                              variant="contained"
                              color="primary"
                            >
                              JOIN TOURNAMENT
                            </Button>
                          </Grid>
                        </Grid>
                      </CardActions>
                    </div>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid container justify="center">
                <Grid item>
                  <Typography
                    variant="h4"
                    align="center"
                    style={{ fontWeight: 600 }}
                  >
                    There are no tournaments available.
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        ) : (
          <Grid container alignItems="center" justify="center">
            <CircularProgress />
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Tournaments;
