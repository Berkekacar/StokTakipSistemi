import  express  from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from 'body-parser';

import router from "./router/router.js"

const app = express()
app.use(cors())

app.use(express.json())//string datasını json olarak parse etmek için
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


dotenv.config()

app.use(router)

app.listen(process.env.PORT,()=>{
    console.log("running on port 6000")
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(console.log("connected to db")).catch((err)=>{console.log(err)})
})
