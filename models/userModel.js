const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const collection = {
  collectionName: "User"
};

var mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new Schema({
  user_name: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
  },

  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },



}, {
  timestamps: true
});
userSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", userSchema);
module.exports = {
  User,
  userSchema,
  collection
}
