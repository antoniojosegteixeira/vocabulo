import React, { useContext, useEffect } from "react";
import { Store } from "../utils/Store";
import db from "../utils/db";
import Word from "../models/Word";
import styles from "../styles/Home.module.css";
import Keyboard from "../components/Keyboard";
import GameTable from "../components/GameTable";
import Notification from "../components/Notification";

export default function Home({ data }) {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    if (data) {
      dispatch({ type: "TODAYS_WORD", payload: data });
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>VOCÁBULO</h1>
      <hr className={styles.solid}></hr>
      <GameTable />
      <Keyboard />
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
