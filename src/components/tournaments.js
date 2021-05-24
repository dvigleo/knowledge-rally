import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TournamentsStore from '../stores/tournaments-store';
import UserStore from '../stores/user-store';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CardActions,
  Button,
  CircularProgress,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
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
  },
}));

const Tournaments = () => {
  const classes = useStyles();
  const history = useHistory();

  const tournamentsStore = useContext(TournamentsStore);
  const { tournaments } = tournamentsStore;
  const userStore = useContext(UserStore);

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    tournamentsStore.getTournaments().then(() => {
      setLoading(false);
    });
  }, [tournamentsStore]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleJoinTournament = tournamentId => {
    setOpen(true);
    userStore.joinTournament(tournamentId).then(() => {});
    history.push('/');
  };

  const SnackbarMessage = () => {
    return (
      <>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity="success"
          >
            This is a success message!
          </MuiAlert>
        </Snackbar>
      </>
    );
  };

  return (
    <>
      <Hero joinTournament={false} />
      {open && <SnackbarMessage />}
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
                          Remaining days: {tournament.remainingDays}
                        </Typography>
                        <Typography>
                          High Score: {tournament.highScore}
                        </Typography>
                        <Typography>
                          Players enrolled: {tournament.players}
                        </Typography>
                      </CardContent>
                    </div>
                    <div>
                      <CardActions className={classes.cardActions}>
                        <Button>VIEW SCOREBOARD</Button>
                        <Button
                          onClick={() =>
                            handleJoinTournament(tournament.tournamentId)
                          }
                        >
                          JOIN TOURNAMENT
                        </Button>
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

export default Tournaments;
