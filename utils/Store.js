import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  todaysWord: "",
  round: 0,
  currentWord: "",
  words: [],
  guessedLetters: [],
  usedLetters: [],
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
        const isRight = action.payload.matchingWordPosition.every(
          (bool) => bool === true
        );

        if (isRight) {
          return {
            ...state,
            words: [
              ...state.words,
              {
                guessedWord: action.payload.guessedWord,
                matchingWordPosition: action.payload.matchingWordPosition,
              },
            ],
            isRight,
            guessedLetters: [
              ...state.guessedLetters,
              ...action.payload.guessedLetters,
            ],
          };
        } else {
          return {
            ...state,
            currentWord: "",
            words: [
              ...state.words,
              {
                guessedWord: action.payload.guessedWord,
                matchingWordPosition: action.payload.matchingWordPosition,
              },
            ],
            round: state.round + 1,
            guessedLetters: [
              ...state.guessedLetters,
              ...action.payload.guessedLetters,
            ],
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
