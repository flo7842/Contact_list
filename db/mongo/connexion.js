import mongoose from "mongoose";

/**
 * @param {callback} callBack
 */
async function transaction(callBack) {
  mongoose.connect(
  process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  let connection = mongoose.connection;
  await callBack(connection);
  await connection.close();
}

/**
 * @callback callback
 * @param {mongoose.Connection} connection
 */

export default transaction;
