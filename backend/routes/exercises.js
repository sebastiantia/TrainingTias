const router = require("express").Router();

let Exercise = require("../models/exercise.model"); //requriing the modal we created

router.route('/').get(async (req, res) => {
    try {
        const exercises = await Exercise.find(); //mongoose command to find all the exercises from the database
        res.json(exercises);
    }   catch (e) {
        res.status(400).send(e);
    }
});

//61e9bc7f2dec3caca666bdd9

router.route('/add').post(async (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration); //convert duration to a Number
    const date = Date.parse(req.body.date); //convert date to date type

    try {
        await Exercise.create({ //creating a new instance of exercise
            username,
            description,
            duration,
            date,
        });

        res.json('exercise added.');
        
    } catch (e) {
        res.status(400).send(e);
    }

});
//so :id is like a variable... 
//it's an object:id created by MongoDB 

router.route('/:id').get(async (req, res) => {  //GET REQUEST
    try {
        const exercise = await Exercise.findById(req.params.id);
        res.json(exercise);
    } catch (e) {
        res.status(400).send(e);
    }
})

   

router.route('/:id').delete(async (req, res) => {  //DELETE REQUEST
    try {
        const exercise = await Exercise.findByIdAndDelete(req.params.id)  
        res.json('exercise deleted')
    } catch (e) {
        res.status(400).send(e)
    }
    // Exercise.findByIdAndDelete(req.params.id)
    // .then(() => res.json('Exercise deleted.'))
    // .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/update/:id').post(async (req, res) => {  //if the route is exercises/update/:id and it's a post, then we are going to UPDATE it
    // try{ 
    //     const exercise = await Exercise.findById(req.params.id) //to pass in the parameter in the URL we use req.params.id
    //     exercise.username = req.body.username;
    //     exercise.description = req.body.description;
    //     exercise.duration = Number(req.body.duration);
    //     exercise.date = Date.parse(req.body.date);
      
    //     await exercise.save()
    //     res.json('Exercise updated!')
        
    // } catch (e) {
    //     res.status(400).json('Error' + e);
        
    // }
    Exercise.findByIdAndUpdate(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
        exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


// router.route('/:id').get((req, res) => )
module.exports = router;
