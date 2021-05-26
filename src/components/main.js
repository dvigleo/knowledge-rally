import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserStore from '../stores/user-store';
import TournamentsStore from '../stores/tournaments-store';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Button,
  CardActions,
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
    flex: 'flex-end',
    paddingLeft: '10px',
  },
}));

const MainScreen = () => {
  const classes = useStyles();

  const userStore = useContext(UserStore);
  const tournamentsStore = useContext(TournamentsStore);
  const { enrolledTournaments } = userStore;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userStore.getUserTournaments().then(() => {
      tournamentsStore.getOpenTournaments().then(() => {
        setLoading(false);
      });
    });
  }, [userStore, tournamentsStore]);

  return (
    <>
      <Hero joinTournament={true} />
      <Container maxWidth="md">
        {!loading ? (
          <Grid container spacing={4}>
            {enrolledTournaments.length > 0 ? (
              enrolledTournaments.map((tournament, key) => (
                <Grid item key={key} xs={12} sm={8} md={6}>
                  <Card className={classes.card}>
                    <div className={classes.details}>
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          Score: {tournament.score}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                          Tournament #{tournament.tournamentId}
                        </Typography>
                        <Typography>Positioning: TBD</Typography>
                        <Typography>
                          Remaining Days: {tournament.remainingDays}
                        </Typography>
                      </CardContent>
                    </div>
                    <div className={classes.cardActions}>
                      <CardActions>
                        <Grid container spacing={5}>
                          <Grid item xs={6}>
                            <Link
                              to={{
                                pathname: '/scoreboard',
                                state: {
                                  tournamentId: tournament.tournamentId,
                                },
                              }}
                            >
                              <Button variant="outlined" color="primary">
                                VIEW SCOREBOARD
                              </Button>
                            </Link>
                          </Grid>
                          <Grid item xs={6}>
                            <Link
                              to={{
                                pathname: '/game',
                                state: {
                                  score: tournament.score,
                                  tournamentId: tournament.tournamentId,
                                },
                              }}
                            >
                              <Button variant="contained" color="primary">
                                PLAY TOURNAMENT
                              </Button>
                            </Link>
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
                    Click on the button to join a new tournament!
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

export default MainScreen;
