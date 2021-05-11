import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { CircularProgress, Grid } from "@material-ui/core";
import { RiskPoints, Score, Questionaire } from "./index";
import { trivia } from "../api/requests";

const Game = () => {
  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState();
  const [gameEnded, setGameEnded] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [pointsToRisk, setPointsToRisk] = useState("0");
  const [won, setWon] = useState(false);
  const history = useHistory();

  const handleRedirect = () => {
    history.push("/main");
  };

  const location = useLocation();
  useEffect(() => {
    async function fetchData() {
      await trivia()
        .then((response) => {
          setQuestion(response[0]);
        })
        .then(() => {
          setScore(location.state?.score);
          setLoading(false);
        });
    }
    fetchData();
  }, [location.state?.score]);

  const handleAnswer = (selected) => {
    if (selected === question.correct) {
      setWon(true);
      console.log("You did it!");
      if (pointsToRisk === "2") setScore(score + 6);
      if (pointsToRisk === "1") setScore(score + 4);
      if (pointsToRisk === "0") setScore(score + 1);
    } else {
      if (pointsToRisk === "2") setScore(score - 2);
      if (pointsToRisk === "1") setScore(score - 1);
      if (pointsToRisk === "0") setScore(score);
      setWon(false);
      console.log("You suck!");
    }
    setGameEnded(true);
  };

  const handlePointsToRisk = (pointsToRisk) => {
    setPointsToRisk(pointsToRisk);
    setStartGame(true);
  };

  const handleReturnToMain = () => {
    console.log("This is where we return to the main screen");
    handleRedirect();
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ padding: "60px 90px", minHeight: "100vh" }}
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

export default Game;
