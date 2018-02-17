import axios from "axios";

if (localStorage.tabletoprankJWT) {
  axios.defaults.headers.authorization = `Bearer ${
    localStorage.tabletoprankJWT
  }`;
}

export default {
  user: {
    login: credentials =>
      axios.post("/login", credentials).then(res => {
        axios.defaults.headers.authorization = res.headers.authorization;
        return res;
      }),
    logout: () => {
      delete axios.defaults.headers.authorization;
    },
    signup: user => axios.post("/api/user", user).then(res => res.data),
    getDetail: () => axios.get("/api/user").then(res => res.data)
  }
};
