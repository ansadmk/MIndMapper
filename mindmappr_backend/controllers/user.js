require("dotenv").config();
const userSchema = require("../model/user");
const pageSchema = require("../model/pages");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { uservalid } = require("../model/SchemaValidation");
const  axios= require( "axios")
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
      const users = await userSchema.findOne({ username: username });
      console.log(users);
      if (users) {
        const pass = bcrypt.compare(password, users.password);
        console.log(pass);
        if (pass) {
          const token = jwt.sign({ id: users._id }, process.env.JWT);
          if (token) {
            res.json({
              status: "success",
              message: "successfully logged in",
              jwt_token: token,
            });
          } else {
            res.json({
              status: "failed",
              message: "failed to log in",
            });
          }
        } else {
          res.json({
            status: "failed",
            message: "wrong password",
          });
        }
      } else {
        res.json({
          status: "failed",
          message: "user not found",
        });
      }
    } else {
      console.log(error.message);
    }
  },
  userDetails: async (req, res) => {
    const user = await userSchema.findOne({ _id: res.token.id });

    if (user) {
      res.json({
        status: "success",
        message: "fetched successfully",
        data: user,
      });
    }
  },
  createPages: async (req, res) => {
    const { parent, content, role } = req.body;
    const page = await pageSchema.create({
      title: parent,
      owner: res.token.id,
      content: content,
      createdAt: Date.now(),
      role: role,
    });
    if (page) {
      res.json({
        status: "success",
        message: "created",
      });
    } else {
      res.json({
        status: "failed",
        message: "not created",
      });
    }
  },
  fetchpages: async (req, res) => {
    const mainpages = await pageSchema.find({
      owner: res.token.id,
      role: "main",
    });
    const subpages = await pageSchema.find({
      owner: res.token.id,
      role: "sub",
    });
    if (mainpages) {
      res.json({
        status: "success",
        message: "successfully fetched",
        data: {
          mainpages: mainpages,
          subpages: subpages,
        },
      });
    } else {
      res.json({
        status: "failed",
        message: "failed to fetched",
      });
    }
  },
  setProfile:async(req,res)=>{
    const {Image,name}=req.body
  await userSchema.updateOne({_id:res.token.id}, { $set:{ image: Image ,username:name}})
    res.json({
      status:"success",
      message:"successfully changed"
    })
  }
};
