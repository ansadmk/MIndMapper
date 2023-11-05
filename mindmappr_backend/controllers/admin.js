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
    }
}