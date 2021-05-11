import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Game, MainScreen, SignIn } from "./components/index";
import { userData } from "./api/requests";

const App = () => {
  const [score, setScore] = useState(0);
  const [tournaments, setTournaments] = useState([]);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    setTournaments([
      {
        score: 129,
        positioning: "13 / 112",
        remainingDays: "12",
      },
      {
        score: 7,
        positioning: "90 / 145",
        remainingDays: "2",
      },
      {
        score: 20,
        positioning: "2 / 105",
        remainingDays: "14",
      },
    ]);
  }, []);

  const handleLogin = (data) => {
    console.log(data);
    setLogin(true);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/sign-in">
          <SignIn handleLogin={handleLogin} />
        </Route>
        {login && (
          <>
            <Route exact path="/main">
              <MainScreen tournaments={tournaments} />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default App;
