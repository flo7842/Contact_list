import mongoose from "mongoose";
import vCard from "vcards-js";
import { Contact, ContactSchema } from "../Models/Contact.model.js";

/**
 * @param {mongoose.Model} contact
 *
 */

function exportToVCard(contact) {
  let vcard = vCard();
  //console.log(contact);
  if(contact.collection.collectionName === "contact"){
    vcard.firstName = contact.firstname;
    vcard.lastName = contact.lastname;
    vcard.cellPhone = contact.phone;
    vcard.email = contact.email;
  }

  return vcard;
}

export {exportToVCard}
