import React, { useContext, useEffect } from "react";
import { Store } from "../utils/Store";
import styles from "../styles/Row.module.css";
import CharacterTile from "./CharacterTile";

export default function Row({ number }) {
  const { state, dispatch } = useContext(Store);
  const { round, currentWord, isGameFinished, todaysWord, rows, error } = state;

  // Set shown word

  const wordShown = rows[number]
    ? rows[number].wordTried
    : round === number
    ? currentWord
    : "";

  const active = number === round;
  const todaysWordArray = todaysWord.split("");
  console.log(currentWord, rows, round);

  return (
    <div
      className={`${styles.row} ${isGameFinished && active && styles.win}  ${
        error.active && round === number && styles.error
      }`}
    >
      {todaysWordArray.map((e, position) => (
        <div key={`${number}${position}`} className={styles.letterBox}>
          <CharacterTile char={wordShown.charAt(position)} />
        </div>
      ))}
    </div>
  );
}
