const mongoose = require("mongoose");
const noti = mongoose.Schema({
   to:mongoose.SchemaTypes.ObjectId,
  type: String,
  msg: String,
  sub: String,
  time: Date,
});

module.exports = mongoose.model("notification", noti);
