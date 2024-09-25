const mongoose=require("mongoose")
const connect=async()=>{
    await mongoose.connect(process.env.SERVER)
    console.log("Mongodb connected");
}
module.exports=connect