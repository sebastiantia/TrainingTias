const argon2 = require('argon2')

const router = require('express').Router();

//import mongoose model
let User = require('../models/user.model');

//First Route
//This is the first end-point that handles incoming HTTP Get requests on the /users url path
//root url: localhost:5000 


//if it is /localhost:5000/users/ and it's a get request
router.route('/').get(async (req, res) => {
    try {
        const users = await User.find() //mongoose method, that gets a list of all the Users from the MongoDB Atlas DB, and returns a PROMISE
        res.json(users)
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
    // .catch(err => res.status(400).json('Error: ' + err)); //if there's an error then we are going to return status 400 with the error message
});
//this end-point handles incoming HTTP POST REQUESTS
//if it has /add at  the end and is a post request
router.route('/add').post(async (req, res) => { 
    console.log(req.body);
    const {username, password} = req.body; //req.body.username. is assigned to username & password
    console.log(password)
    const hashedPassword = await argon2.hash(password);

    const newUser = new User({username, password: hashedPassword});//create a new isntance of user with the username

    newUser.save() //saving the new instance to the database
    .then(() => res.json('User added!')) //return User added
    .catch(err => res.status(400).json('Error: ' + err)); 
})

module.exports = router;
//just exporting the