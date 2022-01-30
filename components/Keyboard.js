import React, { useContext } from "react";
import { Store } from "../utils/Store";
import styles from "../styles/Keyboard.module.css";
import axios from "axios";

const letters = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ç"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"],
];

export default function Keyboard() {
  const { state, dispatch } = useContext(Store);
  const {
    round,
    currentWord,
    isRight,
    todaysWord,
    totalLetters,
    guessedLetters,
    guessedPosition,
    words,
  } = state;

  // Check matching ocurrences
  const checkMatching = () => {
    //
    const todaysWordArray = todaysWord.split("");
    const guessedWordArray = currentWord.split("");

    const simpleMatchingLetters = todaysWordArray.filter((letter) => {
      return guessedWordArray.includes(letter);
    });

    const matchingWordPosition = todaysWordArray.map((letter, i) => {
      return todaysWordArray[i] === guessedWordArray[i] ? letter : false;
    });

    return {
      guessedWord: currentWord,
      guessedLetters: simpleMatchingLetters,
      matchingWordPosition,
    };
  };

  const dispatchAction = async (letter) => {
    switch (letter) {
      case "delete":
        dispatch({ type: "REMOVE_LETTER" });
        break;
      case "enter":
        if (!isRight && currentWord.length === 5) {
          // Checking if the word exists on Dictionary API
          try {
            const data = await axios.get("/api/checkword", {
              params: {
                query: currentWord,
              },
            });

            dispatch({ type: "ENTER_WORD", payload: checkMatching() });
          } catch (err) {
            console.log(err);
          }
        }
        break;

      default:
        dispatch({ type: "ADD_LETTER", payload: letter });
        break;
    }
  };

  const defineKeyClassName = (letter) => {
    if (guessedPosition.includes(letter)) return styles.guessedPosition;
    if (guessedLetters.includes(letter)) return styles.guessedLetter;
    if (totalLetters.includes(letter)) return styles.incorrectGuessedLetter;
    return "";
  };

  return (
    <div className={styles.wrapper}>
      {letters.map((item) => {
        return (
          <div key={item} className={styles.row}>
            {item.map((letter) => {
              return (
                <button
                  key={letter}
                  className={`${styles.keyboardKey} ${defineKeyClassName(
                    letter
                  )}`}
                  onClick={() => dispatchAction(letter)}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
