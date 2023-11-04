module.exports={
    getUsers:async()=>{
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