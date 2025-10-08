const mongoose=require("mongoose")

require("dotenv").config()

const mongoUri=process.env.MONGODB

const intitializeDatabase=async()=>{
    await mongoose.connect(mongoUri).then(()=>{
        console.log("Connected to database")
    }).catch((error)=>console.log("An error occured while connecting to database",error))
}

module.exports={intitializeDatabase}