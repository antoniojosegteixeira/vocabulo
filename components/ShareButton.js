import { useState } from "react";
import styles from "../styles/Modal.module.css";

export default function ShareButton({ shareText }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(shareText);
    if (!isClicked) setIsClicked(true);
  };

  return (
    <button onClick={handleClick} className={styles.shareButton}>
      {isClicked ? "COPIADO!" : "COMPARTILHE"}
    </button>
  );
}
