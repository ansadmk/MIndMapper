const mongoose=require('mongoose')
const pageSchema=mongoose.Schema({
    title:String,
    owner:mongoose.Schema.ObjectId,
    content:String,
    createdAt:Date,
    updatedAt:Date,
    role:String,
    avatar:String,
    cover:String,
    subpages:Object,
    public:Boolean,
    
    ansester:mongoose.Schema.ObjectId,
    Likes:[{type:mongoose.Schema.ObjectId ,ref:"Likes"}]
    

})

module.exports=mongoose.model("pages",pageSchema)