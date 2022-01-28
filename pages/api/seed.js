import db from "../../utils/db";
import Word from "../../models/Word";
import { data } from "../../utils/wordData";

export default async function handler(req, res) {
  await db.connect();
  await Word.deleteMany({});
  await Word.insertMany(data);
  const serverData = await Word.find();
  await db.disconnect();
  res.send(serverData);
}
