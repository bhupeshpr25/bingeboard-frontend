import { createContext, useReducer, ReactNode } from "react";
import { IUser } from "../api/types";
import { MediaContextProvider } from "./MediaContext";

type State = {
  authUser: IUser | null;
};

type Action = {
  type: string;
  payload: IUser | null;
};

type Dispatch = (action: Action) => void;

const initialState: State = {
  authUser: null,
};

export const StateContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

type StateContextProviderProps = { children: ReactNode };

const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        authUser: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

export const StateContextProvider = ({
  children,
}: StateContextProviderProps) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const value = { state, dispatch };

  return (
    <StateContext.Provider value={value}>
      <MediaContextProvider>{children}</MediaContextProvider>
    </StateContext.Provider>
  );
};
