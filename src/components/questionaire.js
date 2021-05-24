import React from 'react';
import { Typography, Button, Grid, Container } from '@material-ui/core';

const questionStyle = {
  background: 'white',
  boxShadow: '0 3px 5px 2px rgba(115, 112, 111, .3)',
  border: 0,
  color: 'black',
  marginBottom: '20px',
  padding: '20px 20px',
};

const buttonStyle = {
  backgroundColor: 'white',
  color: 'black',
  padding: '20px',
  fontWeight: 500,
  width: '100%',
  boxShadow: '0 3px 5px 2px rgba(115, 112, 111, .3)',
};

const Questionaire = ({
  handleAnswer,
  data: { question, answers, correct, category },
}) => {
  const shuffledAnswers = answers.sort((a, b) => 0.5 - Math.random());

  console.log('correct: ', correct);
  return (
    <Container maxWidth="md">
      <Grid
        container
        justify="center"
        alignItems="center"
        style={questionStyle}
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center" style={{ fontWeight: 600 }}>
            {question}
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ padding: '10px' }}>
          <Typography variant="subtitle1" align="center">
            Category: {category}
          </Typography>
        </Grid>
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
    </Container>
  );
};

export default Questionaire;
