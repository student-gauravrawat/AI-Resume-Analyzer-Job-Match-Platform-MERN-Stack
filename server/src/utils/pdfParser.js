import fs from "fs";
import pdf from "pdf-extraction"; 

export const pdfParse = async (filePath) => {
  try {
      if (!fs.existsSync(filePath)) {
        console.log("File not found at path:", filePath);
        return "";
     }

     const dataBuffer = fs.readFileSync(filePath);
     const data = await pdf(dataBuffer); 

     if (!data || !data.text) {
      console.log("No text found in PDF");
      return "";
     }
    
    return data.text; 

  } catch (error) {
    console.error("Parsing Error:", error);
    return "";
  }
};