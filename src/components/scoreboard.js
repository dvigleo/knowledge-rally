import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TournamentsStore from '../stores/tournaments-store';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Paper,
  CircularProgress,
} from '@material-ui/core';
import { Hero } from './index';
import { useLocation } from 'react-router-dom';

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
  table: {
    minWidth: 700,
  },
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3F51B5',
    color: theme.palette.common.white,
    fontWeight: '600',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: 'rgba(63, 81, 181, 25%)',
    },
  },
}))(TableRow);

const ScoreBoard = () => {
  const classes = useStyles();
  const location = useLocation();

  const tournamentsStore = useContext(TournamentsStore);
  const { scoreboard } = tournamentsStore;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tournamentsStore.getScoreboard(location.state?.tournamentId).then(() => {
      setLoading(false);
    });
  }, [tournamentsStore, location.state?.tournamentId]);

  return (
    <>
      <Hero joinTournament={false} backToTournaments={true} />
      <Container className={classes.cardGrid} maxWidth="md">
        {!loading ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>PLAYER</StyledTableCell>
                  <StyledTableCell>SCORE</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scoreboard.map((positioning, key) => (
                  <StyledTableRow key={key}>
                    <StyledTableCell>{positioning.userId}</StyledTableCell>
                    <StyledTableCell>{positioning.score}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <CircularProgress />
        )}
      </Container>
    </>
  );
};

export default ScoreBoard;
