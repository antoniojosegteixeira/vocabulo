import React, { useContext, useEffect } from "react";
import { Store } from "../utils/Store";
import styles from "../styles/Row.module.css";

export default function CharacterTile({ char, position, rowNumber }) {
  const { state, dispatch } = useContext(Store);
  const { rows, error, isGameFinished, win, round } = state;
  const active = rowNumber === round;

  function defineClassName() {
    switch (rows[rowNumber]?.matches[position][1]) {
      case true:
        return styles.correctPosition;
      case false:
        return styles.incorrectLetter;
      case "misplaced":
        return styles.misplacedLetter;
    }
  }

  function addAnimation() {
    return win && active ? styles.jumpAnimation : "";
  }

  // Checks if guess is at right position or just a simple guess
  const toggleClass = defineClassName();
  const toggleAnimation = addAnimation();
  return (
    <div
      className={`${styles.letterBox} ${toggleAnimation} ${
        isGameFinished && active && toggleAnimation
      }`}
      style={{ animationDelay: `${0.2 * position}s` }}
    >
      <div className={`${styles.insideTile} ${toggleClass}`}>
        <span>{char}</span>
      </div>
    </div>
  );
}
