import React, { useEffect, useContext } from "react";
import styles from "../styles/Notification.module.css";
import { Store } from "../utils/Store";

export default function Notification() {
  const { state, dispatch } = useContext(Store);
  const { error } = state;

  return (
    <div
      className={`${styles.notification} ${
        error.active && error.message && styles.on
      }`}
    >
      {error.message}
    </div>
  );
}
