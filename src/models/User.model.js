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
    return transaction(async (connection) => {
      return await UserClass.User.create(fields)
        .then(async (u) => {
          return await u.save();
        })
        .catch((err) => {
          throw "Duplicate or wrong existing data";
        });
    });
  }
  /**
   *
   * @param {String|Array} id
   */
  static unregister(ids) {
    if (ids instanceof String) {
      ids = [ids];
    }

    return transaction(async (connection) => {
      return UserClass.User.deleteOne({ _id: { $in: ids } }).catch((err) => {
        throw "The user requested cannot be find or can't be deleted";
      });
    });
  }

  /**
   *
   * @param {String} id
   * @param {String} password
   */
  static modify(id, password) {
    return transaction(async (connection) => {
      return UserClass.User.updateOne({ _id: id }, { password: password });
    });
  }
}



export { UserClass };
