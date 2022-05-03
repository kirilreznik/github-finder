import axios from "axios";

const instanceConfig = {
  baseURL: process.env.REACT_APP_GITHUB_URL,
  headers: {
    accept: "application/json",
    Authorization: `token ${process.env.REACT_APP_API_TOKEN}`,
  },
};

const github = axios.create(instanceConfig);

export default github;
