import mongoose from "mongoose";
import transaction from "../databases/mongo/connexion.js";
import LocalStrategy from "passport-local";
import passportLocalMongoose from "passport-local-mongoose";
import * as User from "mongoose";

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
  static User = UserClass.test()
  /**
   *
   * @param {Object} fields
   * @returns
   */

   static test(){
      const mongotest = mongoose.model("User", UserClass.UserSchema);
      UserClass.UserSchema.plugin(passportLocalMongoose)

      return mongotest
  }


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
