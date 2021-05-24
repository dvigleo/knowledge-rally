import { createContext } from 'react';
import { makeAutoObservable, toJS } from 'mobx';
import requests from '../api/requests';
import { Auth } from 'aws-amplify';

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  tournaments = [];
  username = '';

  updateUserScore = async (tournamentId, score) => {
    console.log(tournamentId, score);
    let updatedTournaments = this.tournaments.map(t =>
      t.tournamentId === tournamentId ? { ...t, score: score } : toJS(t)
    );
    // console.log('RECENTLY UPDATED, ', toJS(updatedTournaments));
    try {
      await requests.updateUserData({
        tournaments: [...updatedTournaments],
        id: this.username,
      });
      this.tournaments = toJS(updatedTournaments);
      // console.log('FROM USERSTORE', toJS(this.tournaments));
    } catch (err) {
      console.log('There was an error updating the user score ', err);
    }
  };

  getUserTournaments = async () => {
    try {
      let user = await Auth.currentAuthenticatedUser();
      this.username = user.username;
      console.log(this.username);
      let userData = await requests.getUserData(this.username);
      if (userData.body.tournaments.length > 0) {
        this.tournaments = toJS(userData.body.tournaments);
      }
      // console.log('FROM DB: ', toJS(this.tournaments));
    } catch (err) {
      console.log('There was a problem retrieving the user data ', err);
    }
  };

  cleanUpUserdata = () => {
    this.tournaments = [];
  };
}

export default createContext(new UserStore());
