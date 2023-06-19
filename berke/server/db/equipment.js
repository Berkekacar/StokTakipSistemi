import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
    
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
    stok:{
        type:String,
        required:true
    }
})

const equipmentModel=mongoose.model("equipment",equipmentSchema)

export default equipmentModel