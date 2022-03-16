import mongoose from "mongoose";
 

const ContactSchema = new mongoose.Schema({
    firstname: String,
    lastname : String,
    phone : String,
    email : String,
    creator :  {type: mongoose.Schema.Types.ObjectId,ref:'User'}
},{
    collection:"contact",
    timestamps:true
},)

/**
 * @param {mongoose.Model} Contact
 */
const Contact =  mongoose.model("Contact",ContactSchema);
export {Contact,ContactSchema};