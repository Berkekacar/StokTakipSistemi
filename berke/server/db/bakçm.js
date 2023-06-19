import mongoose from "mongoose";

const bakım = new mongoose.Schema({
    equid:{
        type:String,
        required:true
    },
    ekipmanAdi:{
        type:String,
        required:true
    },
    ekipmanMarka:{
        type:String,
        required:true
    },
    ekipmanModel:{
        type:String,
        required:true
    },
    ekipmanBarkod:{
        type:String,
        required:true
    },
    
})

const bakımModel=mongoose.model("bakım",bakım)

export default bakımModel