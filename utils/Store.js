import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  todaysWord: "",
  round: 0,
  currentWord: "",
  words: [],
  letters: [],
  isRight: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TODAYS_WORD":
      return { ...state, todaysWord: action.payload };
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
        console.log("word is", action.payload);

        const isRight = action.payload.matchingWordPosition.every(
          (bool) => bool === true
        );

        if (isRight) {
          return {
            ...state,
            words: [...state.words, action.payload],
            isRight,
          };
        } else {
          return {
            ...state,
            currentWord: "",
            words: [...state.words, action.payload],
            round: state.round + 1,
          };
        }
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
