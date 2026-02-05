import { createRequire } from "module";
const require = createRequire(import.meta.url);
const PDFParser = require("pdf2json");

export const pdfParse = (filePath) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (err) => {
      reject(err.parserError);
    });

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      let text = "";

      pdfData.Pages.forEach((page) => {
        page.Texts.forEach((t) => {
          t.R.forEach((r) => {
           try {
             text += decodeURIComponent(r.T) + " ";
           } catch (error) {
              text += r.T + " ";
           }
          });
        });
        text += "\n";
      });

      resolve(text);
    });

    pdfParser.loadPDF(filePath);
  });
};



