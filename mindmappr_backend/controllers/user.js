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
            status: "sucess",
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
        const users=userSchema.findOne({username:username})
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
                message:"user not found"
            })
        }
    }
  },
};
