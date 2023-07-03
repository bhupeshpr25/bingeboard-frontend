// useAuth.ts
import { useStateContext } from "../context";
import { IUser } from "../api/types";

const TOKEN_KEY = "jwtToken"; // Define a constant for the token key in localStorage

const useAuth = () => {
  const { state, dispatch } = useStateContext();

  const login = (user: IUser) => {
    dispatch({ type: "SET_USER", payload: user });

    // Save the token in localStorage when the user logs in
    localStorage.setItem(TOKEN_KEY, user.token);
  };

  const logout = () => {
    dispatch({ type: "SET_USER", payload: null });

    // Clear the token from localStorage when the user logs out
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
