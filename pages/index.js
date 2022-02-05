import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import Head from "next/head";
import db from "../utils/db";
import Word from "../models/Word";
import styles from "../styles/Home.module.css";
import Keyboard from "../components/Keyboard";
import GameTable from "../components/GameTable";
import Notification from "../components/Notification";
import Modal from "../components/Modal";
import Instructions from "../components/Instructions";

export default function Home({ data }) {
  const { state, dispatch } = useContext(Store);
  const { round } = state;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (data) {
      dispatch({ type: "TODAYS_WORD", payload: data });
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (round > 5) {
      dispatch({ type: "FINISH_GAME" });
    }
  }, [round, dispatch]);

  return (
    <>
      <Head>
        <title>Vocábulo</title>
      </Head>
      <div className={styles.gameWrapper}>
        <Modal />
        <Instructions show={show} setShow={setShow} />
        <div className={styles.titleContainer}>
          <button
            onClick={() => setShow(true)}
            className={styles.openInstructions}
          >
            <i className="fas fa-question-circle"></i>
          </button>
          <h1 className={styles.title}>VOCÁBULO</h1>
        </div>
        <hr className={styles.solid}></hr>
        <Notification />
        <GameTable />
        <Keyboard />
      </div>
    </>
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
