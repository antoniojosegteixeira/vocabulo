import { createContext, useReducer } from "react";
import axios from "axios";

export const Store = createContext();

const initialState = {
  todaysWord: "",
  round: 0,
  currentWord: "",
  words: [],
  guessedPosition: [],
  guessedLetters: [],
  totalLetters: [],
  isRight: false,
  error: false,
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
      if (state.currentWord.length === 5 && !state.error) {
        const isRight = action.payload.matchingWordPosition.every(
          (bool) => bool === true
        );

        // Adding the new word to the board
        // Including information about the matching positions
        const words = [
          ...state.words,
          {
            guessedWord: action.payload.guessedWord,
            matchingWordPosition: action.payload.matchingWordPosition,
          },
        ];

        ////////// Adding the overall right position guesses to the state ////////
        // Used to highlight the keyboard
        const guessedPosition = [
          ...state.guessedPosition,
          ...action.payload.matchingWordPosition,
        ];

        // All the correct letters entered, not specifying if it's position is matching
        const guessedLetters = [
          ...state.guessedLetters,
          ...action.payload.guessedLetters,
        ];

        // Every character sent
        const totalLetters = [
          ...state.totalLetters,
          ...state.currentWord.split(""),
        ];

        if (isRight) {
          // if the word is guessed right
          return state;
        } else {
          return {
            ...state,
            words,
            guessedPosition,
            guessedLetters,
            totalLetters,
            currentWord: "",
            round: state.round + 1,
          };
        }
      } else {
        return state;
      }

    case "SHOW_ERROR":
      return { ...state, error: true };

    case "HIDE_ERROR":
      return { ...state, error: false };

    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
