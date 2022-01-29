import React, { useContext } from "react";
import { Store } from "../utils/Store";
import styles from "../styles/Keyboard.module.css";

const letters = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ç"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"],
];

export default function Keyboard() {
  const { state, dispatch } = useContext(Store);
  const { round, currentWord } = state;

  const dispatchAction = (letter) => {
    switch (letter) {
      case "delete":
        dispatch({ type: "REMOVE_LETTER" });
        break;
      case "enter":
        dispatch({ type: "ENTER_WORD" });
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
                  className={styles.keyboardKey}
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
