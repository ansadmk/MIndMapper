const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    username:String,
    password:String,
    email:String,
    image:String

})

module.exports=mongoose.model("users",userSchema)