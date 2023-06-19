import express from 'express';
import mongoose from 'mongoose';
import staffModel from '../db/staff.js'
import equipmentModel from "../db/equipment.js"
import bakım from "../db/bakım.js"
// var ObjectId = require('mongodb').ObjectID;
import { ObjectId } from 'mongodb'
import bodyParser from 'body-parser';







const router = express.Router();

router.get("/",async (req,res)=>{
    try {
        const staff= await staffModel.find()
        res.json(staff)
} catch (error) {
        console.log(error)        
    }
})
// router.post('/login', (req, res) => {
//     staffModel.findOne({
//         email: req.body.email
//     })
//         .then(user => {
//             if (user) {
//                 if (bcrypt.compareSync(req.body.password, user.password)) {
//                     const payload = {
//                         _id: user._id,
//                         first_name: user.first_name,
//                         last_name: user.last_name,
//                         email: user.email
//                     }
//                     let token = jwt.sign(payload, process.env.SECRET_KEY, {
//                         expiresIn: 1440
//                     })
//                     res.send(token)
//                 } else {
//                     res.json({ error: 'User does not exist' })
//                 }
//             } else {
//                 res.json({ error: 'User does not exist' })
//             }
//         })
        
// })

router.get("/personel/:id", async (req,res)=>{ 
    
    try {
        const depodangelcekdeger=localStorage.getItem("storedData");
        console.log(depodangelcekdeger);
        const {id}=req.params   
        console.log(id)

        const user = await staffModel.findById(id)
    
        res.json(user)
    } catch (error) {
        console.log(error)
    }


    
})



router.post("/signup",async (req,res)=>{
    try {
        const body =req.body //kayıt olan kullanıcı verilerini tutar 
        const createUser = await staffModel.create(body)
        console.log(createUser)
        res.status(201).json(createUser)

    } catch (error) {
        console.log(error)
    }
})

router.get("/mudurpanel/personelgoruntule", async (req,res)=>{
    try {
        const staff =await staffModel.find()
        res.json(staff)
} catch (error) {
        console.log(error)
    }
})
router.get("/mudurpanel/ekipmanyonet/ekipmangoruntule", async (req,res)=>{
    try {
        const equ=await equipmentModel.find()
        res.json(equ)
    } catch (error) {
        console.log(error)
    }
})
router.post("/mudurpanel/ekipmanyonet/ekipmanbakim",async()=>{
    const body=req.body
    const createbakım=await bakım.create(body)
    res.status(201).json(createdEquipment)
})
router.post("/mudurpanel/ekipmanyonet/ekipmaneklesil", async (req,res)=>{
    try {
        const body = req.body //bana gelen bilgileri tutuyorum
        const createdEquipment =await equipmentModel.create(body)
        console.log(createdEquipment)
        res.status(201).json(createdEquipment)
} catch (error) {
        console.log(error)
    }
})

router.post("/mudurpanel/ayarlar", async (req,res)=>{
    
})

router.put("/mudurpanel/personelgoruntule/:id", async (req,res)=>{
    res.json({message:"personel goruntule-put"})
})

router.delete("/mudurpanel/ekipmanyonet/ekipmansil", async (req,res)=>{
    
    const sil=req.body.barkod
    const x=staffModel.deleteOne({ekipmanBarkod:sil})
    
    res.json(x)
})

export default router