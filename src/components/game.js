import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { RiskPoints, Score, Questionaire, Hero } from './index';
import { observer } from 'mobx-react-lite';
import QuestionStore from '../stores/question-store';
import UserStore from '../stores/user-store';
import TournamentsStore from '../stores/tournaments-store';

const Game = () => {
  const history = useHistory();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [gameEnded, setGameEnded] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [pointsToRisk, setPointsToRisk] = useState('0');
  const [pointsEarned, setPointsEarned] = useState(0);
  const [won, setWon] = useState(false);

  const questionStore = useContext(QuestionStore);
  const userStore = useContext(UserStore);
  const tournamentsStore = useContext(TournamentsStore);
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
      if (pointsToRisk === '2') {
        setScore(score + 6);
        setPointsEarned(6);
      } else if (pointsToRisk === '1') {
        setScore(score + 4);
        setPointsEarned(4);
      } else if (pointsToRisk === '0') {
        setScore(score + 1);
        setPointsEarned(1);
      } else setScore(score);
    } else {
      setWon(false);
      if (pointsToRisk === '2') {
        if (score <= 1) {
          setScore(0);
          setPointsEarned(0);
        } else {
          setScore(score - 2);
          setPointsEarned(-2);
        }
      } else if (pointsToRisk === '1') {
        if (score === 0) {
          setScore(0);
          setPointsEarned(0);
        } else {
          setScore(score - 1);
          setPointsEarned(-1);
        }
      } else if (pointsToRisk === '0') {
        setScore(score);
        setPointsEarned(0);
      } else setScore(score);
    }
    setGameEnded(true);
  };

  const handleReturnToMain = async () => {
    await userStore
      .updateUserScore(tournamentId, score)
      .then(tournamentsStore.updateTournamentData(tournamentId, score));
    history.push('/');
  };

  return (
    <>
      <Hero />
      {gameEnded ? (
        <Score
          score={score}
          won={won}
          handleReturnToMain={handleReturnToMain}
          correctAnswer={question.correct}
          points={pointsEarned}
        />
      ) : !loading && startGame ? (
        <Questionaire data={question} handleAnswer={handleAnswer} />
      ) : !startGame ? (
        <RiskPoints handlePointsToRisk={handlePointsToRisk} />
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default observer(Game);
