import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
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
  static User = UserClass.test()

  /**
   *
   * @param {Object} fields
   * @returns
   */
   static test(){
      UserClass.UserSchema.plugin(passportLocalMongoose)
      const mongotest = mongoose.model("User", UserClass.UserSchema, "user");

      return mongotest
  }

  /**
   *
   * @param fields
   * @returns {Promise<*>}
   */
  static register(fields) {
    return Generic.create(fields, UserClass.User);
  }

  static findUser(fields) {
       return Generic.findOneBy(fields, UserClass.User);
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

  /**
  *
  * @param critera
  * @param showFields
  * @returns {Promise<*>}
 */
  static retrieve(critera, showFields) {
    return Generic.read(critera, showFields, UserClass.User);
  }
}



export { UserClass };
