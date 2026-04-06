import fs from "fs";
import pdf from "pdf-extraction"; 

export const pdfParse = async (filePath) => {
  try {
    //* it ckecks file is avaliable or not 
      if (!fs.existsSync(filePath)) {
        console.log("File not found at path:", filePath);
        return "";
     }

     const dataBuffer = fs.readFileSync(filePath);// for reading file return binary data
     const data = await pdf(dataBuffer); // extract text only

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