import mongoose from "mongoose";
import transaction from "../databases/mongo/connexion.js";
import Generic from "./Generic.model.js";

class UserClass {
  static UserSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    {
      collection: "user",
      timestamps: true,
    }
  );

  /**
   * @param {mongoose.Model} User
   */
  static User = mongoose.model("User", UserClass.UserSchema);

  /**
   *
   * @param {Object} fields
   * @returns
   */

  static register(fields) {
    return Generic.create(fields, UserClass.User);
  }
  /**
   *
   * @param {String|Array} id
   */
  static unregister(ids) {
    if (ids instanceof String) {
      ids = [ids];
    }
    return Generic.delete(ids, UserClass.User);
  }

  /**
   *
   * @param {String} id
   * @param {String} password
   */
  static modify(id, password) {
    return Generic.modify({ _id: id }, { password: password }, UserClass.User);
  }

  static retrieve(critera, showFields) {
    return Generic.read(critera, showFields, UserClass.User);
  }
}

export { UserClass };
