import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './App.css';
import { Game, MainScreen, Tournaments } from './components/index';
import Amplify from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import config from './aws-exports';
Amplify.configure(config);

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainScreen} />
        <Route path="/game" component={Game} />
        <Route path="/tournaments" component={Tournaments} />
      </Switch>
    </Router>
  );
};

export default withAuthenticator(observer(App));
