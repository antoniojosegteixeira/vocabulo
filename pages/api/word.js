import mongoose from "mongoose";
import db from "../../utils/db";

export default function handler(req, res) {
  const date = new Date().toLocaleDateString();
  res.send(date);
}
