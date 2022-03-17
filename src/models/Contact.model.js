import mongoose from "mongoose";
import Generic from "./Generic.model.js";

class ContactClass {
  static ContactSchema = new mongoose.Schema(
    {
      firstname: String,
      lastname: String,
      phone: String,
      email: String,
      creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    {
      collection: "contact",
      timestamps: true,
    }
  );

  /**
   * @param {mongoose.Model} Contact
   */
  static Contact = mongoose.model("Contact", ContactClass.ContactSchema);

  static create(fields) {
    return Generic.create(fields, ContactClass.Contact);
  }

  static update(id, fields) {
    return Generic.modify({ _id: id }, fields, ContactClass.Contact);
  }

  static delete(id) {
    if (ids instanceof String) {
      ids = [ids];
    }
    return Generic.delete(ids, ContactClass.Contact);
  }

  static retrieve(critera, showFields) {
    return Generic.read(critera, showFields, ContactClass.Contact);
  }

  static retrieveByLogin(login) {
    return Generic.read(
      { name: { $regex: login } },
      null,
      ContactClass.Contact
    );
  }

  static retrievesByUser(id) {
    return Generic.read({ creator: id }, null, ContactClass.Contact);
  }
}

export { ContactClass };
