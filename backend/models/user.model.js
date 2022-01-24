const mongoose = require("mongoose"); //require mongoose

const Schema = mongoose.Schema; //a new mongoose schema

const userSchema = new Schema({
  //userSchema is the name of our Schema
  //userSchema only has a single field username
  //but we have some VALIDATIONS to the username
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, //trims white spaces off the end
    minlength: 3, //at least three characters long
  },
},
{
  timestamps: true, //automatically creates fields for when it was created and mdified.
});

const User = mongoose.model("User", userSchema);
//'User' can be anything

module.exports = User;
