const mongoose = require("mongoose");
const Like = mongoose.Schema({
   contentId:mongoose.SchemaTypes.ObjectId,
   ownerId:mongoose.SchemaTypes.ObjectId,
  time: Date,
});

module.exports = mongoose.model("Likes", Like);
