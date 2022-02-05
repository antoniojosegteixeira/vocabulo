import styles from "../styles/Modal.module.css";
import rowStyles from "../styles/Row.module.css";

export default function Instructions({ show, setShow }) {
  return (
    <>
      <div className={`${styles.modal} ${show && styles.quickVisible}`}>
        <div className={styles.modalBox} style={{ padding: "2rem 3rem" }}>
          <button className={styles.closeModal} onClick={() => setShow(false)}>
            <i className="fas fa-times-circle"></i>
          </button>
          <h1>COMO JOGAR</h1>
          <p>Cada tentativa deve conter uma palavra de 5 letras válida.</p>

          <div className={rowStyles.exampleRow}>
            <div className={rowStyles.letterBox}>
              <div
                className={`${rowStyles.insideTile} ${rowStyles.incorrectLetter}`}
              >
                P
              </div>
            </div>
            <div className={rowStyles.letterBox}>
              <div
                className={`${rowStyles.insideTile} ${rowStyles.correctPosition}`}
              >
                O
              </div>
            </div>
            <div className={rowStyles.letterBox}>
              <div
                className={`${rowStyles.insideTile} ${rowStyles.incorrectLetter}`}
              >
                R
              </div>
            </div>
            <div className={rowStyles.letterBox}>
              <div
                className={`${rowStyles.insideTile} ${rowStyles.misplacedLetter}`}
              >
                T
              </div>
            </div>

            <div className={rowStyles.letterBox}>
              <div
                className={`${rowStyles.insideTile} ${rowStyles.incorrectLetter}`}
              >
                A
              </div>
            </div>
          </div>
          <p>
            Amarelo: significa que a letra existe na palavra, mas está em
            posição incorreta
          </p>
          <p>Verde: letra existe e está na posição correta</p>
          <p>Cinza: não existe na palavra</p>
        </div>
      </div>
    </>
  );
}
