import axios from "axios";

const auth = {
  username: "user",
  password: "password"
};

export default {
  user: {
    login: credentials =>
      axios({
        method: "post",
        url: "api/auth",
        data: credentials,
        auth
      }).then(res => res.data)
  }
};
