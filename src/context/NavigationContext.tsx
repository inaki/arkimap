import React, { ReactNode, createContext, useContext, useReducer } from "react";

type ActionType = {
  type: string;
  payload?: any;
};

type InitialStateType = {
  state: {
    activeSection: "arquitects" | "projects" | "cities" | null;
  };
  dispatch: (action: ActionType) => void;
};

const initialState = {
  state: {
    activeSection: null,
  },
  dispatch: () => {},
};

export const NavigationContext = createContext<InitialStateType>(initialState);

const reducer = (state: typeof initialState, action: ActionType) => {
  switch (action.type) {
    case "updateSection":
      return { ...state, activeSection: action.payload };
    default:
      return state;
  }
};

export const useNavigationContext = () => useContext(NavigationContext);

export const NavigationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState.state);

  return (
    <NavigationContext.Provider value={{ state, dispatch }}>
      {children}
    </NavigationContext.Provider>
  );
};
