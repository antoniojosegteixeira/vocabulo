import db from "../utils/db";
import Word from "../models/Word";
import styles from "../styles/Home.module.css";

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>VOCÁBULO</h1>
      <hr className={styles.solid}></hr>
      <div className={styles.gameWrapper}>
        <div className={styles.row}>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
          <div className={styles.letterBox}></div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  await db.connect();
  const date = new Date().getDate();
  const { word } = await Word.findOne({ date }).lean();
  await db.disconnect();

  return {
    props: {
      data: word,
    },
  };
}
