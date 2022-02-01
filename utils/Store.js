import { createContext, useReducer, useEffect } from "react";

export const Store = createContext();

const initialState = {
  todaysWord: "",
  wordCount: {},
  round: 0,
  currentWord: "",
  guessedCharacters: [],
  rows: [],
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
        const isGameFinished = false;
        // Checking if the game is finished
        /*
        const isGameFinished = action.payload.matchingWordPosition.every(
          (bool) => bool !== false
        );
        */

        // Adding the new word to the board
        // Including information about the matching positions
        const newWord = state.currentWord;
        const newWordArr = newWord.split("");
        const todaysWordArr = state.todaysWord.split("");

        const countArr = state.todaysWord.split("");

        const strictMatch = [];
        // check for strict match
        todaysWordArr.forEach((ch, i) => {
          // Checks if it's true, and removes it from the count array
          if (newWord.charAt(i) === ch) {
            strictMatch[i] = [newWord.charAt(i), true];
            countArr[i] = undefined;
          }
        });

        todaysWordArr.forEach((ch, i) => {
          if (countArr.includes(newWordArr[i])) {
            strictMatch[i] = [newWord.charAt(i), "misplaced"];
            countArr.splice(countArr.indexOf(newWordArr[i]));
          }
        });

        todaysWordArr.forEach((ch, i) => {
          if (!strictMatch[i]) {
            strictMatch[i] = [newWord.charAt(i), false];
          }
        });

        const newRow = {
          wordTried: newWord,
          match: strictMatch,
        };

        if (isGameFinished) {
          // if the word is guessed right
          return {
            ...state,
            isGameFinished: true,
            win: true,
          };
        } else {
          return {
            ...state,
            currentWord: "",
            round: state.round + 1,
            rows: [...state.rows, newRow],
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
