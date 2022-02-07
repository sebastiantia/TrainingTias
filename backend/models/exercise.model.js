const mongoose = require("mongoose"); //require mongoose

const Schema = mongoose.Schema; //a new mongoose schema

const exerciseSchema = new Schema(
  {
    //userSchema is the name of our Schema
    //userSchema only has a single field username
    //but we have some VALIDATIONS to the username
    username: { type: String, required: true },
    password: { type: String, required: true},
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  // { error: {type:String, required: false}},
  {
    timestamps: true, //automatically creates fields for when it was created and mdified.
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;

//now we need to add the API end-point routes
// so the server can perform CRUD operations
