import mongoose from "mongoose";

/**
 * @param {callback} callBack
 */
async function transaction(callBack) {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  let connection = mongoose.connection;
  let res = await callBack(connection);
  await connection.close();
  return res;
}

/**
 * @callback callback
 * @param {mongoose.Connection} connection
 */

export default transaction;
