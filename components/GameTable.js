import React, { useContext } from "react";
import { Store } from "../utils/Store";
import styles from "../styles/GameTable.module.css";

const Row = ({ number }) => {
  const { state, dispatch } = useContext(Store);
  const { round, currentWord } = state;
  const active = number === round;
  const n = 5;

  return (
    <div className={styles.row}>
      {[...Array(n)].map((e, i) => (
        <div key={`${number}${i}`} className={styles.letterBox}>
          {active && currentWord.charAt(i)}
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
