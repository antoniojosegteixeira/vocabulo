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
    case "REMOVE_LETTER":
      if (state.currentWord.length >= 1) {
        const newWord = state.currentWord.slice(0, -1);
        return { ...state, currentWord: newWord };
      } else {
        return state;
      }
    case "ENTER_WORD":
      if (state.currentWord.length === 5) {
        const newWordArray = [...state.words];
        newWordArray.push(state.currentWord);
        return {
          ...state,
          currentWord: "",
          words: newWordArray,
          round: state.round + 1,
        };
      } else {
        return state;
      }

    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
