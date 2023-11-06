const pageSchema = require("../model/pages");
const userSchema = require("../model/user");
const notiSchema = require("../model/notification");

module.exports={
    getUsers:async (req,res)=>{
        const user = await userSchema.find();
        const pages=await pageSchema.find()
        if (user) {
          res.json({
            status: "success",
            message: "fetched successfully",
            data: user,
            pages:pages
          });
        }
    },
    notify:async(req,res)=>{
       const {msg,sub,type,to}=req.body
       console.log(msg);
       
       if (type) {
        await notiSchema.create({to:to,type:"private",msg:msg,sub:sub,time:Date.now()})
       }else{
        await notiSchema.create({type:"public",msg:msg,sub:sub,time:Date.now()})
        res.json({
         status: "success",
         message: "send successfully",
        })
       }
    }
}