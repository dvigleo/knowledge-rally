import { createContext } from 'react';
import { makeAutoObservable, toJS } from 'mobx';
import requests from '../api/requests';
import { Auth } from 'aws-amplify';

class TournamentsStore {
  constructor() {
    makeAutoObservable(this);
  }

  openTournaments = []; // Tournaments available in the DB
  tournaments = []; // Tournaments that ara available to the User (all the tournaments the user is not currently enrollled to)
  scoreboard = []; // Data of players and their score

  /**
   * Get all tournaments open in the DB
   */
  getOpenTournaments = async () => {
    const tournaments = await requests.getTournaments();
    this.openTournaments = toJS(tournaments.response.Items);
  };

  /**
   * Obtain the tournaments the user can enroll to (those where the user is not currently enrolled to)
   */
  getTournaments = async () => {
    // Get the username
    let user = await Auth.currentAuthenticatedUser();

    // Tournaments the user is able to enroll to
    let whitelisted = [];

    // Get all tournaments from the DB
    const tournaments = await requests.getTournaments();
    this.tournaments = toJS(tournaments.response.Items);

    // Iterate through all the tournaments and verify if the user is already enrolled to or not
    for (let i = 0; i < this.tournaments.length; i++) {
      // If there are no players enrolled to the tournament, immediately add the user to the tournament
      if (this.tournaments[i].players.length === 0) {
        whitelisted.push(this.tournaments[i].id);
      } else {
        // If there are more than 1 players in the tournament, iterate through all the players
        for (let j = 0; j < this.tournaments[i].players.length; j++) {
          // If the player userId is different from the username AND the tournamentId is not yet added to the "whitelisted" array, add it
          if (this.tournaments[i].players[j].userId !== user.username) {
            if (!whitelisted.includes(this.tournaments[i].id)) {
              whitelisted.push(this.tournaments[i].id);
            }
          } else {
            // If the 'whitelisted' array already includes the tournament id and the user shouldn't be enrolled to it, remove it from the 'whitelisted' array.
            if (whitelisted.includes(this.tournaments[i].id)) {
              let index = whitelisted.indexOf(this.tournaments[i].id);
              if (index !== -1) {
                whitelisted.splice(index, 1);
              }
            }
            break;
          }
        }
      }
    }

    // Update the available tournamnets according to the 'whitelisted' array so those are shown to the user
    try {
      this.tournaments = this.tournaments.filter(tournament =>
        whitelisted.includes(tournament.id)
      );
      this.tournaments.sort((a, b) => (a.id > b.id ? -1 : 1));
    } catch (err) {
      console.log('There was a problem getting the the tournaments ', err);
    }
  };

  /**
   * Adds a user to a tournament
   * @param  {String} tournamentId  The tournament id to enroll the player to
   */
  enrollUser = async tournamentId => {
    // Obtain the username
    let user = await Auth.currentAuthenticatedUser();

    // Find the tournament to enroll the player to
    let updatedTournament = this.tournaments.find(
      tournament => tournament.id === tournamentId
    );
    // Add the player data to the tournament (the score is always 0 when first enrolled)
    updatedTournament.players.push({ userId: user.username, score: 0 });

    // Remove the recently enrolled tournament from the list of tournaments available to enroll to
    this.tournaments = this.tournaments.filter(
      tournament => tournament.id !== tournamentId
    );

    // Add +1 to the number of players enrolled to the tournament
    let playersEnrolled = updatedTournament.playersEnrolled + 1;

    // Update the tournament in the DB with the new player enrolled and the number of players in the tournament
    try {
      await requests.enrolUser({
        id: tournamentId,
        ...updatedTournament,
        playersEnrolled: playersEnrolled,
      });
    } catch (err) {
      console.log('There was a problem enroling the user', err);
    }
  };

  /**
   * Updates the tournament highscore and players score in the client and DB
   * @param  {String} tournamentId  The tournament id to edit
   * @param  {Number} score         The score to edit
   */
  updateTournamentData = async (tournamentId, score) => {
    // Obtain the current user ID
    let user = await Auth.currentAuthenticatedUser();
    let tournamentToUpdate = this.openTournaments.find(
      tournament => tournament.id === tournamentId
    );

    // Update the players score in the tournament (client-side)
    let playersUpdated = tournamentToUpdate.players.map(player =>
      player.userId === user.username
        ? { ...player, score: score }
        : toJS(player)
    );

    // Get tournament's current high score and verify if the score is bigger than the curreny highscore. If so, change it, otherwise just update the tournament with the new user score
    let currentHighScore = tournamentToUpdate.highScore;
    if (score > currentHighScore) {
      tournamentToUpdate = {
        ...tournamentToUpdate,
        highScore: score,
        players: playersUpdated,
      };
    } else {
      tournamentToUpdate = {
        ...tournamentToUpdate,
        players: playersUpdated,
      };
    }
    // Update the tournament data in the DB
    try {
      await requests.updateTournamentData({
        id: tournamentId,
        ...tournamentToUpdate,
      });
    } catch (err) {
      console.log(
        'There was an error updating the tournaments (score-wise) ',
        err
      );
    }
  };

  /**
   * Get the players along with their score ordered in a descendant manner
   * @param  {String} tournamentId  The tournament id to obtain
   * @return  {Array} players  The tournament id to edit
   */
  getScoreboard = async tournamentId => {
    // Get the desired tournament
    let temp = this.openTournaments.find(
      tournament => tournament.id === tournamentId
    );
    try {
      if (temp.players.length > 0) {
        this.scoreboard = temp.players;
        // Sort the players by their score in a descendant manner
        this.scoreboard.sort((a, b) => (a.score > b.score ? -1 : 1));
      }
    } catch (err) {
      console.log(
        'There was an error getting the tournaments scoreboard ',
        err
      );
    }
  };
}

export default createContext(new TournamentsStore());
