import axios from 'axios';
import { API } from 'aws-amplify';

const responseBody = response => response.data;

const requests = {
  getQuestion: API_URL => axios.get(API_URL).then(responseBody),

  // user
  getUserData: body => API.get('knowledgeRallyGameApi', `/user/${body}`),
  updateUserData: body =>
    API.put('knowledgeRallyGameApi', `/user/${body.id}`, {
      body: {
        tournaments: body.tournaments,
      },
    }),
  joinTournament: body =>
    API.put('knowledgeRallyGameApi', `/user/${body.id}`, {
      body: {
        tournaments: body.tournaments,
      },
    }),

  // tournaments
  getTournaments: () => API.get('knowledgeRallyGameApi', '/tournaments/id'),
  enrolUser: body =>
    API.put('knowledgeRallyGameApi', `/tournaments`, {
      body: {
        id: body.id,
        ...body,
      },
    }),
  updateTournamentData: body =>
    API.put('knowledgeRallyGameApi', `/tournaments`, {
      body: {
        id: body.id,
        ...body,
      },
    }),
};

export default requests;
