import {docxParser} from './docxParser.js'
import {pdfParse} from "./pdfParser.js"
import path from "path" 

export const extractResumeText = async(filePath)=>{
   const ext = path.extname(filePath).toLowerCase();

   if(ext === ".pdf"){
      return await pdfParse(filePath)
   }

   if(ext === '.doc' || ext === ".docx"){
      return await docxParser(filePath)
   }

   throw new Error("Unsupported resume format")
   
}