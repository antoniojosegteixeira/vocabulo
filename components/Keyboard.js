import React from "react";
import styles from "../styles/Keyboard.module.css";

const letters = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ç"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"],
];

export default function Keyboard() {
  console.log(letters);
  return (
    <div className={styles.wrapper}>
      {letters.map((item) => {
        return (
          <div key={item} className={styles.row}>
            {item.map((letter) => {
              return (
                <button key={letter} className={styles.keyboardKey}>
                  {letter}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
