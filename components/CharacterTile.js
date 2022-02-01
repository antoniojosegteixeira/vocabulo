import React, { useContext, useEffect } from "react";
import { Store } from "../utils/Store";
import styles from "../styles/Row.module.css";

export default function CharacterTile({ char }) {
  // Checks if guess is at right position or just a simple guess
  return (
    <div className={styles.insideTile}>
      <span>{char}</span>
    </div>
  );
}
