const mongoose=require('mongoose')
const pageSchema=mongoose.Schema({
    title:String,
    owner:mongoose.Schema.ObjectId,
    content:String,
    createdAt:Date,
    updatedAt:Date,
    settings:Object

})

module.exports=mongoose.model("pages",pageSchema)