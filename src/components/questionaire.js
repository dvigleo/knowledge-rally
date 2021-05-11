import React from "react";
import { Typography, Button, Grid } from "@material-ui/core";

const questionStyle = {
  background: "white",
  boxShadow: "0 3px 5px 2px rgba(115, 112, 111, .3)",
  border: 0,
  color: "black",
  marginBottom: "20px",
  padding: "20px 20px",
};

const buttonStyle = {
  backgroundColor: "white",
  color: "black",
  padding: "20px",
  fontWeight: 600,
  width: "100%",
  boxShadow: "0 3px 5px 2px rgba(115, 112, 111, .3)",
};

const Questionaire = ({
  handleAnswer,
  data: { question, answers, correct },
}) => {
  const shuffledAnswers = answers.sort((a, b) => 0.5 - Math.random());
  console.log("correct: ", correct);
  return (
    <Grid item xs={8}>
      <Grid container alignItems="center" style={questionStyle}>
        <Typography variant="h4" align="center" style={{ fontWeight: 600 }}>
          {question}
        </Typography>
      </Grid>
      <Grid container spacing={4}>
        {shuffledAnswers.map((answer, key) => (
          <Grid item xs={6} key={key}>
            <Button
              key={answer}
              onClick={() => handleAnswer(answer)}
              style={buttonStyle}
            >
              {answer}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Questionaire;
