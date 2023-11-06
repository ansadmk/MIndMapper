
const userSchema = require("../model/user");

module.exports={
    getUsers:async (req,res)=>{
        const user = await userSchema.find();

        if (user) {
          res.json({
            status: "success",
            message: "fetched successfully",
            data: user,
          });
        }
    },
    notify:async(req,res)=>{
       const {msg}=req.body
       console.log(msg);
       await userSchema.updateMany({},{$push:{notify:{type:"public",msg:msg,time:Date.now()}}})
       res.json({
        status: "success",
        message: "send successfully",
       })
    }
}