import React, { useContext } from "react";
import { Store } from "../utils/Store";
import styles from "../styles/GameTable.module.css";

const Row = ({ number }) => {
  const { state, dispatch } = useContext(Store);
  const { round, words, currentWord, isRight } = state;
  const active = number === round;
  const n = 5;

  return (
    <div className={`${styles.row} ${isRight && active && styles.win}`}>
      {[...Array(n)].map((e, i) => (
        <div key={`${number}${i}`} className={styles.letterBox}>
          <span>
            {active
              ? currentWord.charAt(i)
              : words[number - 1] !== undefined && words[number - 1].charAt(i)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function GameTable() {
  const { state, dispatch } = useContext(Store);
  const { round } = state;

  return (
    <div className={styles.gameWrapper}>
      <Row number={1} />
      <Row number={2} />
      <Row number={3} />
      <Row number={4} />
      <Row number={5} />
      <Row number={6} />
    </div>
  );
}
