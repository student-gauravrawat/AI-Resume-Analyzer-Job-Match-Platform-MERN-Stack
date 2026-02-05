import multer from "multer"

//* Convert env string to array 
const allowedTypes = process.env.ALLOWED_FILE_TYPES
                    ?.split(",")
                    .map(type=> type.trim());

//* File filter
const fileFilter = (req, file, cb)=>{
  if(allowedTypes.includes(file.mimetype)){
     cb(null, true); // files allow
  }else{
    cb(new Error("Only PDF or DOC/DOCX files allowed"), false);
  }
}

//* Storage config
const storage = multer.diskStorage({
    destination: function(req, file, cb){
       cb(null, "./public/resumes")
    },
    filename: function(req, file, cb){
      const uniqueName = Date.now() + "-" + Math.round(Math.random()*1e9)
        cb(null, uniqueName + "-" + file.originalname)
    }
})

export const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: Number(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024
    }
})

