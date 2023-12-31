require("dotenv").config();
const userSchema = require("../model/user");
const notiSchema = require("../model/notification");
const pageSchema = require("../model/pages");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { uservalid } = require("../model/SchemaValidation");

const likeSchema = require("../model/likeSchema");
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
      
      if (users) {
        const pass = bcrypt.compare(password, users.password);
        
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
        
      } else if(username=="admin" && password=='admin'){
        const token = jwt.sign("admin", process.env.JWT);
        res.json({
          status: "success",
          message: "adminlogged",
          jwt_token: token,
        });
      }
      else {
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
    const user = await userSchema.find({ _id: res.token.id }).populate('liked');
    console.log(user);
    if (user) {
      res.json({
        status: "success",
        message: "fetched successfully",
        data: user[0],
      });
    }
  },
  createPages: async (req, res) => {
    const { parent, content, role, public1 } = req.body;

    
    if(role!="main"){
      const pagefind=await pageSchema.findOne({_id:parent})
      if (public1) {
        const page1 = await pageSchema.create({
          title: parent,
          owner: res.token.id,
          content: content,
          createdAt: Date.now(),
          role: role,
          ansester:pagefind.ansester,
          public:true
        });
       
        if (page1) {
          res.json({
            status: "success",
            message: "created",
            data:page1
          });
        } else if(role=="main"){
          res.json({
            status: "failed",
            message: "not created",
          });
        }
      } else {
        const page = await pageSchema.create({
          title: parent,
          owner: res.token.id,
          content: content,
          createdAt: Date.now(),
          role: role,
          ansester:pagefind.ansester
        });
        

        if (page) {
          res.json({
            status: "success",
            message: "created",
            data:page
          });
        } else if(role=="main"){
          res.json({
            status: "failed",
            message: "not created",
          });
        }
      }
    
  }else{
    const page = await pageSchema.create({
      title: parent,
      owner: res.token.id,
      content: content,
      createdAt: Date.now(),
      role: role,
      
    });
    

    if (page) {
     await pageSchema.updateOne({_id:page._id},{$set:{ansester:page._id}})
     
      res.json({
        status: "success",
        message: "created",
        data:page
      });
    } else {
      res.json({
        status: "failed",
        message: "not created",
      });
    }
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
    const {Image,name,pageId,content,prev,sub,test}=req.body
    
    if(Image || name){
  await userSchema.updateOne({_id:res.token.id}, { $set:{ image: Image ,username:name}})
    res.json({
      status:"success",
      message:"successfully changed"
    })}
    if(pageId && content && prev){
      await pageSchema.updateOne({_id:pageId}, { $set:{ content: content}})
     
      res.json({
        status:"success",
        message:"successfully changed"
      }  )}
      if(sub){
        await pageSchema.updateOne({_id:pageId}, { $set:{ content: content}})
      }
      if(test && pageId){
        await pageSchema.updateOne({_id:pageId}, { $set:{ subpages: test}})
      }
    },
    deletePage:async(req,res)=>{
      const {id,content}=req.params
      
      if(id){
    await pageSchema.deleteOne({_id:id})
    await pageSchema.deleteMany({title:content})
      res.json({
        status:"success",
        message:"successfully deleted"
      })}
      
      },
      setCoverAvatar:async (req,res)=>{
        const {
          avatarUrl,
          coverUrl,
          pageId
        }=req.body
        
        await pageSchema.updateOne({_id:pageId}, { $set:{  avatar:avatarUrl,cover: coverUrl}})
        
      },
      fetchSpecpages:async(req,res)=>{
          try {
            const {id}=req.params
            
            const pages = await pageSchema.findOne({_id:id});
            res.json({
              status:"success",
              message:"successfully fetched",
              data:pages
            })
          } catch (error) {
            console.log(error.message);
          }
             
            },
      getNoti:async(req,res)=>{
           const common=await notiSchema.find({type:"public"})
           const private=await notiSchema.find({to:res.token.id})
           const all=common.concat(private)
           
           if (all) {
            res.json({
              status:"success",
                message:"successfully fetched",
                data:all
             })
             
           } else if (common) {
            res.json({
              status:"success",
                message:"successfully fetched",
                data:common
             })
           } 
           
      },
      getAllPages:async(req,res)=>{
        const {pageno}=req.body
       
             const pages1=await pageSchema.find({public:true,role:"main"}).limit(pageno*10).skip((pageno-1)*10)
             const pages=await pageSchema.find({public:true,role:"main"})
             const user = await userSchema.find();
              
             res.json({
              status:"success",
                message:"successfully fetched",
                data:pages,
                data1:pages1,
                user:user
             })
      },
      setPublic:async(req,res)=>{
        const {id,unpub} = req.body
        if(unpub){
          await pageSchema.updateMany({ansester:id},{$set:{public:false}})
        }else{
        await pageSchema.updateMany({ansester:id},{$set:{public:true}})
        }
        res.json({
          status:"success",
            message:"successfully Done"
         })
      },
      getAllPagesPublic:async(req,res)=>{
        const pages=await pageSchema.find({public:true})
        

        res.json({
         status:"success",
           message:"successfully fetched",
           data:pages
        })
 },
 addLikes:async(req,res)=>{
  const {contentId,no}=req.body
  if(no){
    await likeSchema.deleteOne({
      _id:contentId
    })
    console.log(like);
    
    await pages.updateOne({_id:contentId},{$pull:{Likes:contentId}})
    await userSchema.updateOne({_id:res.token.id},{$pull:{liked:contentId}})
    res.json({
      status:"success",
        message:"successfully done",
        
     })
  }else{
  const like=await likeSchema.create({
    contentId:contentId,
    ownerId:res.token.id,
    time:Date.now()
  })
  console.log(like);
  
  await pages.updateOne({_id:contentId},{$push:{Likes:like._id}})
  await userSchema.updateOne({_id:res.token.id},{$push:{liked:like._id}})
  res.json({
    status:"success",
      message:"successfully done",
      
   })}
 },
 
  
};
