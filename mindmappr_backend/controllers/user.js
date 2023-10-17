require('dotenv').config()
const userSchema = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { uservalid } = require("../model/SchemaValidation");
module.exports = {
  register: async (req, res) => {
    
    const { error, value } = uservalid.validate(req.body);

    if (value) {
      const { username, password, email } = value;
      bcrypt.hash(password, 10, async (err, result) => {
        if (err) {
          res.json(err.message);
        } else {
          await userSchema.create({
            username: username,
            password: result,
            email: email,
          });
          res.json({
            status: "success",
          });
        }
      });
    } else {
      res.json(error.message);
    }
  },
  login: async (req, res) => {
    const { error, value } = uservalid.validate(req.body);
    const { username, password } = value;

    if (value) {
        const users=await userSchema.findOne({username:username})
        console.log(users);
        if(users){
           const pass= bcrypt.compare(password,users.password)
           console.log(pass);
           if (pass){
           const token= jwt.sign({id:users._id},process.env.JWT)
           if(token){
            res.json({
                status:"success",
                message:"successfully logged in",
                jwt_token:token

            })}else{
                res.json({
                    status:"failed",
                    message:"failed to log in",
                    
    
                }) 
            }
           }else{
            res.json({
                status:"failed",
                message:"wrong password",
                

            })
           }
        }else{
            res.json({
              status:"failed",
                message:"user not found"
            })
        }
    }else{
      console.log(error.message);
    }
  },
 userDetails:async(req,res)=>{
      const user= await userSchema.findOne({_id:res.token.id})
      
      if(user){
        res.json({
          status:"success",
          message:"fetched successfully",
          data:user
        })
      }
 }

};
