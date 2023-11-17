const pageSchema = require("../model/pages");
const userSchema = require("../model/user");
const notiSchema = require("../model/notification");

module.exports = {
  getUsers: async (req, res) => {
    const {pageno}=req.body
    
    const user = await userSchema.find()
    
    const user1 = await userSchema.find().limit(pageno*10).skip((pageno-1)*10)
    console.log(user1);
    const pages = await pageSchema.find();
    if (user) {
      res.json({
        status: "success",
        message: "fetched successfully",
        data: user,
        pages: pages,
      });
    }
  },
  notify: async (req, res) => {
    const { msg, sub, type, to } = req.body;
    console.log(msg);

    if (type) {
      await notiSchema.create({
        to: to,
        type: "private",
        msg: msg,
        sub: sub,
        time: Date.now(),
      });
    } else {
      await notiSchema.create({
        type: "public",
        msg: msg,
        sub: sub,
        time: Date.now(),
      });
      res.json({
        status: "success",
        message: "send successfully",
      });
    }
  },
  getNoti: async (req, res) => {
    const common = await notiSchema.find();
    if (common) {
      res.json({
        status: "success",
        message: "successfully fetched",
        data: common,
      });
    }
  },
  deleteNoti: async (req, res) => {
    const {id}=req.params
  await notiSchema.deleteOne({_id:id});
   
      res.json({
        status: "success",
        message: "successfully deleted",
        
      });
    
  },
};
