import axios from "axios";

const responseBody = (response) => response.data;

const requests = {
  getQuestion: () =>
    axios
      .get("https://opentdb.com/api.php?amount=1&type=multiple")
      .then(responseBody),
  getUserData: () => axios.get("").then(responseBody),
};

export default requests;
