import mongoose from "mongoose";


const staffSchema = new mongoose.Schema({
    ad:{
        type:String,
        required:true
    },
    soyad:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
})

const staffModel=mongoose.model("staff",staffSchema)

export default staffModel