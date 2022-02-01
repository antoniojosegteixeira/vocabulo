import React, { useContext, useEffect } from "react";
import { Store } from "../utils/Store";
import styles from "../styles/Row.module.css";

export default function Row({ number }) {
  const { state, dispatch } = useContext(Store);
  const {
    round,
    words,
    currentWord,
    isGameFinished,
    todaysWord,
    guessedLetters,
    guessedPosition,
    error,
  } = state;

  const active = number === round;
  const n = 5;

  const LetterTile = ({ position }) => {
    // Checks if guess is at right position or just a simple guess
    function checkIfGuessedLetterisGameFinished() {
      if (
        words[number]?.guessedWord.charAt(position) ===
        words[number]?.matchingWordPosition[position]
      ) {
        // Return correct letter + position style
        return styles.correctPosition;
      }

      if (
        guessedLetters.includes(words[number]?.guessedWord.charAt(position))
      ) {
        return styles.correctLetter;
      }

      return styles.incorrectLetter;
    }

    if (active) {
      // Just return the current word being typed
      return currentWord.charAt(position);
    } else if (words[number] !== undefined) {
      // Returns the guessed word
      return (
        <div
          className={`${
            styles.insideTile
          } ${checkIfGuessedLetterisGameFinished()}`}
        >
          <span>{words[number]?.guessedWord.charAt(position)}</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={`${styles.row} ${isGameFinished && active && styles.win}  ${
        error.active && round === number && styles.error
      }`}
    >
      {[...Array(n)].map((e, position) => (
        <div key={`${number}${position}`} className={styles.letterBox}>
          <LetterTile position={position} />
        </div>
      ))}
    </div>
  );
}
