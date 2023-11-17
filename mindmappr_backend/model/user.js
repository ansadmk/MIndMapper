const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    username:String,
    password:String,
    email:String,
    image:String,
    fullName:String,
    createdAt:Date
  
    

})

module.exports=mongoose.model("users",userSchema)