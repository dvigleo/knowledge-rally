import { createContext } from "react";
import { makeAutoObservable, toJS } from "mobx";
import requests from "../api/requests";

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  tournaments = [
    {
      tournamentId: 1,
      score: 130,
      positioning: "13 / 112",
      remainingDays: "12",
    },
    {
      tournamentId: 2,
      score: 6,
      positioning: "90 / 145",
      remainingDays: "2",
    },
    {
      tournamentId: 3,
      score: 20,
      positioning: "2 / 105",
      remainingDays: "14",
    },
  ];

  updateUserScore = (tournamentId, score) => {
    console.log(tournamentId, score);
    let updatedTournaments = this.tournaments.map((t) =>
      t.tournamentId === tournamentId ? { ...t, score: score } : toJS(t)
    );
    this.tournaments = toJS(updatedTournaments);
  };

  getQuestion = async () => {
    try {
      this.tournaments = await requests.getUserData();
    } catch (err) {
      console.log("There was a problem getting the user data ", err);
    }
  };
}

export default createContext(new UserStore());
