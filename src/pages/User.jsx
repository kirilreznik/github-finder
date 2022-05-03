import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import GithubContext from "../context/github/GithubContext";

const User = () => {
  const { login } = useParams();
  const { getUser, user, isLoading } = useContext(GithubContext);

  useEffect(() => {
    getUser(login);
  }, []);

  return isLoading ? <div>Loading...</div> : <div>ok</div>;
};

export default User;
