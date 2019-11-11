import axios from "axios";

export default axios.create({
  baseURL: `https://hng-authentication.herokuapp.com`
});
