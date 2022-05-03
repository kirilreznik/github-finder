import { createContext, useReducer, useState } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_API_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: [],
    repos: [],
    isLoading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async (text) => {
    const params = new URLSearchParams({ q: text });
    setLoading();
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        accept: "application/json",
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const { items } = await response.json();
    dispatch({ type: "GET_USERS", payload: items });
  };

  const getUser = async (login) => {
    setLoading();
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        accept: "application/json",
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    if (response.status === 404) {
      window.location("/not-found");
    }
    const data = await response.json();
    dispatch({ type: "GET_USER", payload: data });
  };

  const getUserRepos = async (login) => {
    const params = new URLSearchParams({ sort: "created", per_page: 10 });
    setLoading();
    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );
    if (response.status === 404) {
      window.location("/not-found");
    }
    const data = await response.json();
    dispatch({ type: "GET_REPOS", payload: data });
  };

  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        isLoading: state.isLoading,
        clearUsers,
        setLoading,
        searchUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;
