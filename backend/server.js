const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); //mongoose is gonnna help us conect to our MongoDb database

// const uri = "mongodb+srv://sebastiantia:<password>@cluster0.f1p3k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

require("dotenv").config(); //allows environment variables

//how we are going to create our express server
const app = express();
const port = process.env.PORT || 4000;

//Creating middle-ware which allows us to parse JSON
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//IMPORT the files & USE the files
const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');




//app.use uses these files, so whenever someone goes to our root url and puts /exercises at the end...
//it's going to load everything in the excersisesRouter
app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// async function main() {
//     await mongoose.connect(process.env.ATLAS_URI);
// }


