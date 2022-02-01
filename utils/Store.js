import { createContext, useReducer, useEffect } from "react";

export const Store = createContext();

const initialState = {
  todaysWord: "",
  round: 0,
  currentWord: "",
  words: [],
  guessedPosition: [],
  guessedLetters: [],
  totalLetters: [],
  isGameFinished: false,
  win: false,
  error: { active: false, message: "" },
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
        // Checking if the game is finished
        const isGameFinished = action.payload.matchingWordPosition.every(
          (bool) => bool !== false
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

        if (isGameFinished) {
          // if the word is guessed right
          return {
            ...state,
            words,
            guessedPosition,
            guessedLetters,
            totalLetters,
            isGameFinished: true,
            win: true,
          };
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
      return {
        ...state,
        error: { active: true, message: action.payload ? action.payload : "" },
      };

    case "HIDE_ERROR":
      return { ...state, error: { active: false, message: "" } };

    case "FINISH_GAME":
      return { ...state, isGameFinished: true };
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
