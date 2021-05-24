import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';
import requests from '../api/requests';

class TournamentsStore {
  constructor() {
    makeAutoObservable(this);
  }

  tournaments = [];

  getTournaments = async () => {
    try {
      //   const tournaments = await requests.getTournaments();
      this.tournaments = [
        { tournamentId: 4, remainingDays: 13, highScore: 100, players: 15 },
        { tournamentId: 5, remainingDays: 12, highScore: 90, players: 10 },
      ];
    } catch (err) {
      console.log('There was a problem getting the question ', err);
    }
  };
}

export default createContext(new TournamentsStore());
