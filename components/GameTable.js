import React, { useContext } from "react";
import { Store } from "../utils/Store";
import styles from "../styles/GameTable.module.css";
import Row from "./Row";

export default function GameTable() {
  const { state, dispatch } = useContext(Store);
  const { round } = state;

  return (
    <div className={styles.gameTable}>
      <Row number={0} />
      <Row number={1} />
      <Row number={2} />
      <Row number={3} />
      <Row number={4} />
      <Row number={5} />
    </div>
  );
}
