import mongoose from "mongoose";
import vCard from "vcards-js";
  

/**
 * @param {mongoose.Model} contact
 *
 */
function exportToVCard(contact) {
  let vcard = vCard();

  if(contact.constructor.modelName === "Contact"){
    vcard.firstName = contact.firstname;
    vcard.lastName = contact.lastname;
    vcard.cellPhone = contact.phone;
    vcard.email = contact.email;
  }
 
  return vcard.getFormattedString();
}

export {exportToVCard}
