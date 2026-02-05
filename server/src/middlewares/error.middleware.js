import {ApiError} from "../utils/ApiError.js"

const errorHandler = (err, req, res, next)=>{

   //* Multer file size error
   if(err.code === "LIMIT_FILE_SIZE"){
       return res.status(400).json({
            success: false,
            message: "File size exceeds limit"
        });
   }

   //* Multer file type error (fileFilter)
   if(err.message === "Only PDF or DOC/DOCX files allowed"){
       return res.status(400).json({
           success: false,
           message: err.message
       })
   }

   //* ApiError Handling
   const statusCode = err instanceof ApiError ? err.statusCode : 500;

   const message = err.message || "Internal Server Error"

   res.status(statusCode).json({
      success: false,
      message
   })
}

export default errorHandler;