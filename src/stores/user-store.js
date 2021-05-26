import { createContext } from 'react';
import { makeAutoObservable, toJS } from 'mobx';
import requests from '../api/requests';
import { Auth } from 'aws-amplify';

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  enrolledTournaments = []; // Tournaments the player is enrolled to
  username = '';

  /**
   * Updates the user socre in the desired tournament
   * @param  {String} tournamentId  The tournament id to edit
   * @param  {Number} score         The score to edit
   */
  updateUserScore = async (tournamentId, score) => {
    // Update the user score in the tournament (client-side)
    let updatedTournaments = this.enrolledTournaments.map(tournament =>
      tournament.tournamentId === tournamentId
        ? { ...tournament, score: score }
        : toJS(tournament)
    );

    // Update the user score in the DB
    try {
      await requests.updateUserData({
        tournaments: [...updatedTournaments],
        id: this.username,
      });
      this.enrolledTournaments = toJS(updatedTournaments);
    } catch (err) {
      console.log('There was an error updating the user score ', err);
    }
  };

  /**
   * Obtain the tournaments the user is enrolled to
   */
  getUserTournaments = async () => {
    let user = await Auth.currentAuthenticatedUser();
    this.username = user.username;

    // Get the user data from the DB
    try {
      let userData = await requests.getUserData(this.username);

      // IF there are tournaments, save them in the variable
      if (userData.body.tournaments.length > 0) {
        this.enrolledTournaments = toJS(userData.body.tournaments);
      }
    } catch (err) {
      console.log('There was a problem retrieving the user data ', err);
    }
  };

  /**
   * Updates the tournament highscore and players score in the client and DB
   * @param  {String} tournamentId      The tournament id to edit
   * @param  {Number} remainingDays     Remaining days in the tournament
   * @param  {Number} playersEnrolled   Number of players enrolled to the tournament
   */
  joinTournament = async (tournamentId, remainingDays, playersEnrolled) => {
    let user = await Auth.currentAuthenticatedUser();
    this.username = user.username;

    // Update the array of objects of tournaments in the player
    let updatedTournaments = [
      {
        remainingDays: remainingDays,
        score: 0,
        positioning: '0 / ' + playersEnrolled,
        tournamentId: tournamentId,
      },
      ...this.enrolledTournaments,
    ];
    this.enrolledTournaments = toJS(updatedTournaments);

    // Update the user data
    try {
      await requests.joinTournament({
        id: this.username,
        tournaments: [...updatedTournaments],
      });
    } catch (err) {
      console.log('There was an error joining a tournament ', err);
    }
  };
}

export default createContext(new UserStore());
