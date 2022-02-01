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
  const { round, currentWord, isGameFinished, todaysWord, rows, error } = state;

  // Check matching ocurrences
  const createRow = () => {
    //
    console.log(currentWord);
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

  return (
    <div className={styles.wrapper}>
      {letters.map((item) => {
        return (
          <div key={item} className={styles.row}>
            {item.map((letter) => {
              return (
                <button
                  key={letter}
                  className={`${styles.keyboardKey}`}
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
