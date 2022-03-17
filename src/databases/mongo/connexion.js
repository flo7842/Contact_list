import mongoose from "mongoose";

/**
 * @param {callback} callBack
 */
async function transaction(callBack) {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((data) => {
    console.log("Vous êtes connecté !");
  }).catch((err) => {
    console.log("Erreur de connexion");
    console.err(err)
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
