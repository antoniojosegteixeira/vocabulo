import React, { useContext } from "react";
import { Store } from "../utils/Store";
import styles from "../styles/GameTable.module.css";

const Row = () => {
  return (
    <div className={styles.row}>
      <div className={styles.letterBox}></div>
      <div className={styles.letterBox}></div>
      <div className={styles.letterBox}></div>
      <div className={styles.letterBox}></div>
      <div className={styles.letterBox}></div>
    </div>
  );
};

export default function GameTable() {
  const { state, dispatch } = useContext(Store);
  const { round } = state;

  console.log(round);

  return (
    <div className={styles.gameWrapper}>
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
    </div>
  );
}
