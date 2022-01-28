import db from "../../utils/db";

export default async function handler(req, res) {
  const date = new Date().toLocaleDateString();
  await db.connect();
  res.send(date);
}
