import github from "../../axios";

export const searchUsers = async (text) => {
  const params = new URLSearchParams({ q: text });
  const response = await github.get(`/search/users?${params}`);
  return response.data.items;
};

export const getUserData = async (login) => {
  const params = new URLSearchParams({ sort: "created", per_page: 10 });
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}?${params}`),
    github.get(`/users/${login}/repos?${params}`),
  ]);

  return { user: user.data, repos: repos.data };
};
