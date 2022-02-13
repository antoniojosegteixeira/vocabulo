import db from "../../utils/db";
import Word from "../../models/Word";

export default async function handler(req, res) {
  try {
    await db.connect();
    const date = new Date().getDate();
    const { word } = await Word.findOne({ date }).lean();
    await db.disconnect();
    res.send(word);
  } catch (err) {
    res.status(404).send(`error ${err.response.status}`);
  }
}
