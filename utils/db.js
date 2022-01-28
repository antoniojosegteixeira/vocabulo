import mongoose from "mongoose";

const connection = {};

const connect = async () => {
  try {
    mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        connection.isConnected = db.connections[0].readyState;
        console.log("New connection");
      });
  } catch (err) {
    console.log(err.message);
  }
};

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not disconnected");
    }
  }
}

const db = { connect, disconnect };
export default db;
