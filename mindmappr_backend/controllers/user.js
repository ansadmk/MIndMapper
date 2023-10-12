const userSchema=require('../model/user')
module.exports={
    register:async (req,res)=>{
        const {username,password,email}=req.body
         await userSchema.create({
            username:username,
            password:password,
            email:email
         })
         res.json("done")
    }
}