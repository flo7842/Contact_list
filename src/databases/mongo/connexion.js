import mongoose from "mongoose";

/**
 * @param {callback} callBack
 */
async function transaction(callBack) {
  return await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(async (data) => {
    console.log("connexion ok !");
    let connection = mongoose.connection;
    let res = await callBack(connection);
    await connection.close();
    return res;
  }).catch((err) => {
    console.log("Erreur de connexion");
    console.log(err)
  
  });
  
}

/**
 * @callback callback
 * @param {mongoose.Connection} connection
 */

export default transaction;
