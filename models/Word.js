import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  date: { type: Number, required: true },
});

const Word = mongoose.models.Word || mongoose.model("Word", wordSchema);

export default Word;
