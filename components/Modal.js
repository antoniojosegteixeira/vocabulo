import { useEffect, useContext } from "react";
import styles from "../styles/Modal.module.css";
import { Store } from "../utils/Store";

export default function Modal() {
  const { state, dispatch } = useContext(Store);
  const { isGameFinished, round, win, words } = state;

  console.log(isGameFinished, words);

  return (
    <div className={`${styles.modal} ${isGameFinished && styles.visible}`}>
      <div className={styles.modalBox}>
        <h1>{win ? "Muito bem!" : "Não foi dessa vez..."}</h1>
        <div>
          <span>🟥🟥🟥🟨🟥</span>
        </div>
      </div>
    </div>
  );
}
