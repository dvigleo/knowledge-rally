import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserStore from '../stores/user-store';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CardActions,
  CircularProgress,
} from '@material-ui/core';
import { Hero } from './index';

const useStyles = makeStyles(theme => ({
  details: {
    display: 'flex',
    flex: 1,
  },
  playButton: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
  cardGrid: {
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const MainScreen = () => {
  const classes = useStyles();

  const userStore = useContext(UserStore);
  const { activeTournaments } = userStore;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userStore.getUserTournaments().then(() => {
      setLoading(false);
    });
  }, [userStore]);

  return (
    <>
      <Hero joinTournament={true} />
      <Container className={classes.cardGrid} maxWidth="md">
        {!loading ? (
          <Grid container spacing={4}>
            {activeTournaments.length > 0 ? (
              activeTournaments.map((tournament, key) => (
                <Grid item key={key} xs={12} sm={8} md={6}>
                  <Card className={classes.card}>
                    <div className={classes.details}>
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          Score: {tournament.score}
                        </Typography>
                        <Typography>
                          Positioning: {tournament.positioning}
                        </Typography>
                        <Typography>
                          Remaining Days: {tournament.remainingDays}
                        </Typography>
                      </CardContent>
                    </div>
                    <div className={classes.playButton}>
                      <CardActions>
                        <Link
                          to={{
                            pathname: '/game',
                            state: {
                              score: tournament.score,
                              tournamentId: tournament.tournamentId,
                            },
                          }}
                        >
                          PLAY
                        </Link>
                      </CardActions>
                    </div>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography
                variant="h4"
                align="center"
                style={{ fontWeight: 600 }}
              >
                Click on the button to join a new tournament!
              </Typography>
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
