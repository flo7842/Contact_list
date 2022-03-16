import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
   
    
  },
  {
    collection: "user",
    timestamps:true
  }
);

/**
 * @param {mongoose.Model} User
 */
const User = mongoose.model("User", UserSchema);
export { User,UserSchema};
