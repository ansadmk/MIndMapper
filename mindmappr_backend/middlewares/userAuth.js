require("dotenv").config()
const jwt = require("jsonwebtoken");
const auth =(req, res, next) => {
  
      const auth = req.headers["authorization"];
      const token = auth && auth.split(" ")[1];
      console.log(token);
      if (token) {
        const verify = jwt.verify(token, process.env.JWT);

        if (verify) {
          res.token=verify
          next();
        }
      } else {
        res.sendStatus(401);
      }
   
  }
module.exports=auth