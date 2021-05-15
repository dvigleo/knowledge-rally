import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './App.css';
import { Game, MainScreen } from './components/index';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
Amplify.configure(awsconfig);
Auth.configure(awsconfig);

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainScreen} />
        <Route path="/game" component={Game} />
      </Switch>
    </Router>
  );
};

export default withAuthenticator(observer(App));
