import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  round: 1,
  currentWord: "",
  words: [],
  letters: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_LETTER":
      return state.currentWord.length === 5
        ? state
        : { ...state, currentWord: state.currentWord + action.payload };
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
