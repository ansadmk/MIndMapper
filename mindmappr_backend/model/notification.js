const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
   to:mongoose.SchemaTypes.ObjectId,
  type: String,
  msg: String,
  sub: String,
  time: Date,
});

module.exports = mongoose.model("notification", userSchema);
