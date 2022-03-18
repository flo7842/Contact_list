import pkg from "exceljs";
const { Workbook } = pkg;
import * as fs from "fs";

/**
 * 
 * @param {Array<mongoose.Model>} contacts 
 * @returns 
 */
function exportToExcel(contacts) {
  const workbook = new Workbook();
  workbook.creator = "";
  workbook.created = new Date();
  const sheet = workbook.addWorksheet("Contact");
  sheet.columns = [
    { header: "Nom", key: "FIRSTNAME", width: 15 },
    { header: "Prenom", key: "LASTNAME", width: 15 },
    { header: "Email", key: "EMAIL", width: 15 },
    { header: "Téléphone", key: "PHONE", width: 15 },
  ];
  for (let contact of contacts) {
    sheet.addRow({
      FIRSTNAME: contact.firstname,
      LASTNAME: contact.lastname,
      EMAIL: contact.email,
      PHONE: contact.phone,
    });
  }

  let filename = "./public/excel/excel_" + new Date().getTime() + ".xlsx";
  let folder = "./public/excel/";
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  if (!fs.existsSync(filename)) {
    fs.writeFile(filename, "", (err) => {
      if (err) console.log(err);
      else {
        console.log("File written successfully\n");
        console.log("The written has the following contents:");
      }
    });
  }
  workbook.xlsx.writeFile(filename);
  return filename;
}

/**
 * 
 * @param {String} filename 
 */
function deleteExcel(filename) {
  try {
    fs.unlink(filename, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  } catch (err) {
    console.log(err);
  }
}

export  {exportToExcel,deleteExcel};
