import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './App.css';
import { Game, MainScreen, Tournaments, ScoreBoard } from './components/index';
import Amplify from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import config from './aws-exports';
import './index.css';
Amplify.configure(config);

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainScreen} />
        <Route path="/game" component={Game} />
        <Route path="/tournaments" component={Tournaments} />
        <Route path="/scoreboard" component={ScoreBoard} />
      </Switch>
    </Router>
  );
};

export default withAuthenticator(observer(App));
