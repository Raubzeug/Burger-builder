import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-b920e.firebaseio.com/"
});

export default instance;
