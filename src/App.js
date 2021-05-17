import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './App.css';
import { Game, MainScreen, SignIn } from './components/index';

const App = () => {
  const [login, setLogin] = useState(false);

  useEffect(() => {}, []);

  const handleLogin = data => {
    console.log(data);
    setLogin(true);
  };

  return (
    <Router>
      <Switch>
        {/* <Route exact path="/">
          <SignIn handleLogin={handleLogin} />
        </Route> */}
        {/* {login && ( */}
        <Route exact path="/" component={MainScreen} />
        <Route path="/game" component={Game} />
      </Switch>
    </Router>
  );
};

export default observer(App);
