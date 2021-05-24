import axios from 'axios';
import { API } from 'aws-amplify';

const responseBody = response => response.data;

const requests = {
  getQuestion: API_URL => axios.get(API_URL).then(responseBody),
  getUserData: body => API.get('knowledgeRallyGameApi', `/tournaments/${body}`),
  updateUserData: body =>
    API.put('knowledgeRallyGameApi', `/tournaments/${body.id}`, {
      body: {
        tournaments: body.tournaments,
      },
    }),
  joinTournament: body =>
    console.log('user will be joined to a tournament here'),
};

export default requests;
