import React, { useState, useEffect } from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import "./App.css";
import { RiskPoints, Score, Questionaire } from "./components/index";
import { trivia } from "./api/requests";

function App() {
  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [pointsToRisk, setPointsToRisk] = useState("0");
  const [won, setWon] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await trivia()
        .then((response) => {
          setQuestion(response[0]);
        })
        .then(() => {
          setLoading(false);
        });
    }
    fetchData();
  }, []);

  const handleAnswer = (selected) => {
    if (selected === question.correct) {
      setWon(true);
      console.log("You did it!");
      if (pointsToRisk === "2") setScore(score + 6);
      if (pointsToRisk === "1") setScore(score + 4);
      if (pointsToRisk === "0") setScore(score + 1);
    } else {
      if (score !== 0) setScore(score - 1);
      setWon(false);
      console.log("You suck!");
    }
    setGameEnded(true);
  };

  const handlePointsToRisk = (pointsToRisk) => {
    setPointsToRisk(pointsToRisk);
    setStartGame(true);
  };

  const handlePlayAgain = () => {
    setQuestion({});
    setGameEnded(false);
    setStartGame(false);
    setWon(false);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      {gameEnded ? (
        <Score
          score={score}
          won={won}
          handlePlayAgain={handlePlayAgain}
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
  );
}

export default App;
