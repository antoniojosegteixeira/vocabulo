import db from "../utils/db";
import Word from "../models/Word";

export default function Home({ data }) {
  return <div>{data}</div>;
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
