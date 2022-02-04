import React, { useContext, useEffect } from "react";
import { Store } from "../utils/Store";
import styles from "../styles/Row.module.css";
import CharacterTile from "./CharacterTile";

export default function Row({ number }) {
  const { state, dispatch } = useContext(Store);
  const { round, currentWord, todaysWord, rows, error } = state;

  // Set shown word

  const wordShown = rows[number]
    ? rows[number].wordTried
    : round === number
    ? currentWord
    : "";

  const todaysWordArray = todaysWord.split("");

  return (
    <div
      className={`${styles.row}  ${
        error.active && round === number && styles.error
      }`}
    >
      {todaysWordArray.map((e, position) => {
        return (
          <CharacterTile
            char={wordShown.charAt(position)}
            position={position}
            rows={rows}
            rowNumber={number}
            key={`${number}${position}`}
          />
        );
      })}
    </div>
  );
}
