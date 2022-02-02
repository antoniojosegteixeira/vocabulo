import { createContext, useReducer, useEffect } from "react";

export const Store = createContext();

const initialState = {
  todaysWord: "",
  round: 0,
  currentWord: "",
  triedCharacters: {
    wrong: [],
    misplaced: [],
    correct: [],
  },
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
        // Adding the new word to the board
        // Including information about the matching positions
        const newWord = state.currentWord;
        const newWordArr = newWord.split("");
        const todaysWordArr = state.todaysWord.split("");
        const countArr = state.todaysWord.split("");

        // Matches array
        const strictMatch = [];

        // Guessed words
        const triedCharacters = {
          wrong: [],
          misplaced: [],
          correct: [],
        };

        // check for matches
        todaysWordArr.forEach((ch, i) => {
          // Checks if it's true, and removes it from the count array
          if (newWord.charAt(i) === ch) {
            strictMatch[i] = [newWord.charAt(i), true];
            countArr[i] = undefined;

            triedCharacters.correct.push(newWord.charAt(i));
          }
        });

        todaysWordArr.forEach((ch, i) => {
          if (countArr.includes(newWordArr[i])) {
            strictMatch[i] = [newWord.charAt(i), "misplaced"];

            triedCharacters.misplaced.push(newWord.charAt(i));
          }
        });

        todaysWordArr.forEach((ch, i) => {
          if (!strictMatch[i]) {
            strictMatch[i] = [newWord.charAt(i), false];
            triedCharacters.wrong.push(newWord.charAt(i));
          }
        });

        const newRow = {
          wordTried: newWord,
          matches: strictMatch,
        };

        // Checking if the game is finished
        const matchingArray = strictMatch.map((e) => {
          return e[1] === true ? true : false;
        });
        const isGameFinished = matchingArray.every((e) => e === true);

        if (isGameFinished) {
          // if the word is guessed right
          return {
            ...state,
            currentWord: "",
            rows: [...state.rows, newRow],
            triedCharacters: {
              wrong: [...state.triedCharacters.wrong, ...triedCharacters.wrong],
              misplaced: [
                ...state.triedCharacters.misplaced,
                ...triedCharacters.misplaced,
              ],
              correct: [
                ...state.triedCharacters.correct,
                ...triedCharacters.correct,
              ],
            },
            isGameFinished: true,
            win: true,
          };
        } else {
          return {
            ...state,
            currentWord: "",
            round: state.round + 1,
            rows: [...state.rows, newRow],
            triedCharacters: {
              wrong: [...state.triedCharacters.wrong, ...triedCharacters.wrong],
              misplaced: [
                ...state.triedCharacters.misplaced,
                ...triedCharacters.misplaced,
              ],
              correct: [
                ...state.triedCharacters.correct,
                ...triedCharacters.correct,
              ],
            },
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
