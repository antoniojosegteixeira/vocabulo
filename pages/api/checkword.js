import axios from "axios";

export default async function handler(req, res) {
  try {
    const { query } = req.query;
    const { data } = await axios.get(
      `https://significado.herokuapp.com/${query}`
    );
    res.send(true);
  } catch (err) {
    res.status(err.response.status).send(`error ${err.response.status}`);
  }
}
