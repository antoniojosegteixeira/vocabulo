import React, { useEffect, useContext, useCallback } from "react";
import styles from "../styles/Notification.module.css";
import { Store } from "../utils/Store";

export default function Notification() {
  const { state, dispatch } = useContext(Store);
  const { error } = state;

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch({ type: "HIDE_ERROR" });
      }, 1000);
    }
  }, [error, dispatch]);

  return (
    <div className={`${styles.notification} ${error && styles.on}`}>Erro</div>
  );
}
