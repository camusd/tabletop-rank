import axios from "axios";
import _ from "lodash/fp";

if (localStorage.tabletoprankJWT) {
  axios.defaults.headers.authorization = `Bearer ${
    localStorage.tabletoprankJWT
  }`;
}

export default {
  user: {
    signup: user => axios.post("/api/user", user).then(res => res.data),
    getDetail: () => axios.get("/api/user").then(res => res.data)
  },
  auth: {
    login: credentials =>
      axios.post("/login", credentials).then(res => {
        const { authorization } = res.headers;
        axios.defaults.headers.authorization = authorization;
        return _.last(authorization.split(" "));
      }),
    logout: () => {
      delete axios.defaults.headers.authorization;
    }
  }
};
