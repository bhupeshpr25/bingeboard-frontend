import { useStateContext } from "../context";
import { IUser } from "../api/types";

const TOKEN_KEY = "jwtToken";

const useAuth = () => {
  const { state, dispatch } = useStateContext();

  const login = (user: IUser) => {
    dispatch({ type: "SET_USER", payload: user });

    localStorage.setItem(TOKEN_KEY, user.token);
  };

  const logout = () => {
    dispatch({ type: "SET_USER", payload: null });

    localStorage.removeItem(TOKEN_KEY);
  };

  const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
  };

  return {
    user: state.authUser,
    login,
    logout,
    getToken,
  };
};

export default useAuth;
