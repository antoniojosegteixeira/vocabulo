import React, { useContext } from "react";
import { Store } from "../utils/Store";
import styles from "../styles/Row.module.css";

export default function Row({ number }) {
  const { state, dispatch } = useContext(Store);
  const { round, words, currentWord, isRight, todaysWord } = state;
  const active = number === round;
  const n = 5;

  const LetterTile = ({ position }) => {
    function checkIfGuessedLetterIsRight() {
      if (
        words[number]?.guessedWord.charAt(position) ===
        words[number]?.matchingWordPosition[position]
      ) {
        console.log(
          words[number]?.guessedWord.charAt(position) ===
            words[number]?.matchingWordPosition[position],
          words[number]?.guessedWord.charAt(position)
        );
        return styles.correctPosition;
      }

      return "";
    }

    if (active) {
      return currentWord.charAt(position);
    } else if (words[number] !== undefined) {
      return (
        <div
          className={`${styles.insideTile} ${checkIfGuessedLetterIsRight()}`}
        >
          <span>{words[number]?.guessedWord.charAt(position)}</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`${styles.row} ${isRight && active && styles.win}`}>
      {[...Array(n)].map((e, position) => (
        <div key={`${number}${position}`} className={styles.letterBox}>
          <LetterTile position={position} />
        </div>
      ))}
    </div>
  );
}
