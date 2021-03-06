import React, { useEffect, useContext, useState, useCallback } from "react";
import styles from "../styles/Modal.module.css";
import { Store } from "../utils/Store";
import NoSsr from "./NoSsr";
import ShareButton from "./ShareButton";
import Timer from "./Timer";

export default function Modal() {
  const { state, dispatch } = useContext(Store);
  const { isGameFinished, win, rows } = state;
  const [shareText, setShareText] = useState("");

  const generate = useCallback(() => {
    const text = rows
      .map((e) => {
        const char = e.matches
          .map((t) => {
            switch (t[1]) {
              case true:
                return "🟩";
              case false:
                return "🟥";
              case "misplaced":
                return "🟨";
              default:
                break;
            }
          })
          .join("");
        return char + "\n";
      })
      .join("");

    const fullText = `Vocábulo: (${rows.length}/6)

${text}

jogue agora em https://vocabulo.herokuapp.com/`;

    setShareText(fullText);
  }, [rows]);

  useEffect(() => {
    generate();
  }, [generate]);

  return (
    <div className={`${styles.modal} ${isGameFinished && styles.visible}`}>
      <div className={styles.modalBox}>
        <h1>{win ? "Muito bem!" : "Não foi dessa vez..."}</h1>
        <div className={styles.statBox}>
          <div className={styles.squaresGrid}>
            {rows.map((e, i) => {
              return e.matches.map((e, i) => {
                return (
                  <div
                    className={`${styles.square} ${
                      e[1] === "misplaced"
                        ? styles.misplaced
                        : e[1] === true
                        ? ""
                        : styles.incorrect
                    }`}
                    key={`${e}${i}`}
                  ></div>
                );
              });
            })}
            {[...Array((6 - rows.length) * 5).keys()].map((e, i) => {
              return (
                <div
                  key={"empty" + i}
                  className={`${styles.square} ${styles.empty}`}
                ></div>
              );
            })}
          </div>
          <div className={styles.info}>
            <NoSsr>
              <Timer />
            </NoSsr>
            <ShareButton shareText={shareText} />
          </div>
        </div>
      </div>
    </div>
  );
}

/*

            {rows.map((e, i) => {
              return e.matches.map((e, i) => {
                return (
                  <div
                    className={`${styles.square} ${
                      e[1] === "misplaced"
                        ? styles.misplaced
                        : e[1] === true
                        ? ""
                        : styles.incorrect
                    }`}
                    key={`${e}${i}`}
                  ></div>
                );
              });
            })}
            */
