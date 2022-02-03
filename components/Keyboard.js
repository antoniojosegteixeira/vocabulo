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
    isGameFinished,
    todaysWord,
    rows,
    error,
    triedCharacters,
  } = state;

  // Check matching ocurrences
  // ClassName for keyboard char color
  const createRow = (char) => {
    if (triedCharacters.correct.includes(char)) return styles.correctPosition;

    if (triedCharacters.misplaced.includes(char)) return styles.misplacedChar;

    if (triedCharacters.wrong.includes(char)) return styles.incorrectChar;

    return "";
  };

  const dispatchAction = async (letter) => {
    switch (letter) {
      case "delete":
        dispatch({ type: "REMOVE_LETTER" });
        break;
      case "enter":
        if (!isGameFinished && currentWord.length === 5 && !error.active) {
          // Checking if the word exists on Dictionary API
          try {
            /*
            const data = await axios.get("/api/checkword", {
              params: {
                query: currentWord,
              },
            });
            */

            dispatch({ type: "ENTER_WORD", payload: currentWord });
          } catch (err) {
            dispatch({
              type: "SHOW_ERROR",
              payload:
                err.response.status === 400 ? "Palavra inválida!" : "Erro",
            });
          }
        } else if (currentWord.length < 5) {
          dispatch({ type: "SHOW_ERROR" });
        }
        break;

      default:
        dispatch({ type: "ADD_LETTER", payload: letter });
        break;
    }
  };

  const KeyboardCharacter = ({ letter }) => {
    switch (letter) {
      case "enter":
        return <i className="fas fa-check" style={{ padding: "0 0.2rem" }}></i>;
      case "delete":
        return <i className="fas fa-backspace"></i>;
      default:
        return letter;
    }
  };

  return (
    <div className={styles.wrapper}>
      {letters.map((item) => {
        return (
          <div key={item} className={styles.row}>
            {item.map((letter) => {
              const className = createRow(letter);

              return (
                <button
                  key={letter}
                  className={`${styles.keyboardKey} ${className}`}
                  onClick={() => dispatchAction(letter)}
                >
                  <KeyboardCharacter letter={letter} />
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
