import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { CircularProgress, Grid } from '@material-ui/core';
import { RiskPoints, Score, Questionaire } from './index';
import { observer } from 'mobx-react-lite';
import QuestionStore from '../stores/question-store';
import UserStore from '../stores/user-store';

const Game = () => {
  const history = useHistory();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [gameEnded, setGameEnded] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [pointsToRisk, setPointsToRisk] = useState('0');
  const [won, setWon] = useState(false);

  const questionStore = useContext(QuestionStore);
  const userStore = useContext(UserStore);
  const [score, setScore] = useState();
  const [tournamentId, setTournamentId] = useState();

  useEffect(() => {
    questionStore.getQuestion().then(() => {
      setLoading(false);
      setScore(location.state?.score);
      setTournamentId(location.state?.tournamentId);
    });
  }, [
    location.state?.score,
    location.state?.tournamentId,
    questionStore,
    userStore,
  ]);

  const { question } = questionStore;

  const handlePointsToRisk = pointsToRisk => {
    setPointsToRisk(pointsToRisk);
    setStartGame(true);
  };

  const handleAnswer = selected => {
    if (selected === question.correct) {
      setWon(true);
      console.log('You did it!');
      if (pointsToRisk === '2') setScore(score + 6);
      if (pointsToRisk === '1') setScore(score + 4);
      if (pointsToRisk === '0') setScore(score + 1);
    } else {
      if (pointsToRisk === '2') setScore(score - 2);
      if (pointsToRisk === '1') setScore(score - 1);
      if (pointsToRisk === '0') setScore(score);
      setWon(false);
      console.log('You suck!');
    }
    setGameEnded(true);
  };

  const handleReturnToMain = () => {
    userStore.updateUserScore(tournamentId, score);
    history.push('/');
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ padding: '60px 90px', minHeight: '100vh' }}
      >
        {gameEnded ? (
          <Score
            score={score}
            won={won}
            handleReturnToMain={handleReturnToMain}
            correctAnswer={question.correct}
          />
        ) : !loading && startGame ? (
          <Questionaire data={question} handleAnswer={handleAnswer} />
        ) : !startGame ? (
          <RiskPoints handlePointsToRisk={handlePointsToRisk} />
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </>
  );
};

export default observer(Game);
