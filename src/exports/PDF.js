import { jsPDF } from "jspdf";

/**
 * @param {mongoose.Model} contact
 *
 */
function exportToPdf(contact) {
  let doc = new jsPDF();

  if (contact.constructor.modelName === "Contact") {
    doc.text("Contact", 10, 10);
    doc.text("Nom           : " + (contact.firstname === undefined ?  " " : contact.firstname), 10, 30);
    doc.text("Prenom      : " + (contact.lastname === undefined ?  " " :contact.lastname), 10, 50);
    doc.text("Email          : " + (contact.email === undefined ? " " : contact.email), 10, 70);
    doc.text("Téléphone  : " + (contact.phone === undefined ?  " " : contact.phone) , 10, 90);
  }

  return doc
    .output("datauristring")
    .replace("data:application/pdf;filename=generated.pdf;base64,", "");
}

export { exportToPdf };
