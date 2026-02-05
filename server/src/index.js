import dotenv from "dotenv"
import connectDb from "./db/database.js"
import {app} from "./app.js"

dotenv.config({
    path: "./.env"
})

const port = process.env.PORT || 9500

connectDb()
.then(()=>{
   app.listen(port, ()=>{
      console.log(`Server is listing at port : ${port}`)
   })
})
.catch(()=>{
   console.log("MongoDB Connection Failed !!!")
})

