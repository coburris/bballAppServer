let router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let Workout = require('../db').import('../models/workout');
const validateSession = require('../middleware/validate-session')


// Create Workout
router.post("/create", validateSession, (req,res) => {

    const workoutEntry = {
        exercise: req.body.workout.exercise,
        duration: req.body.workout.duration,
        reps: req.body.workout.reps,
        sets: req.body.workout.sets,
        intensity: req.body.workout.intensity,
        notes: req.body.workout.notes,
        owner: req.user.id
    }
    // console.log(workoutEntry)
    Workout.create(workoutEntry)
    .then(function workoutCreateSuccess(workout_data){
        return res.status(200).json(workout_data)
    })  
    .catch( function workoutCreateFail(err){
        return res.status(500).json({error: err.message, message: 'workout creation failed'});
    })
})

// Get Workout By User Id
router.get('/', validateSession, function(req, res){
    Workout.findAll({
        where:{
            owner: req.user.id
        }
    })
    .then(workouts => res.status(200).json(workouts))
    .catch(err => res.status(500).json({ error: err}))
})

// Delete Workout
router.delete('/delete/:id', validateSession, function(req, res) {
    const query = {where: {id: req.params.id, owner: req.user.id}}
    
    Workout.destroy(query)
    .then(() => res.status(200).json({message: "workout deleted"}))
    .catch((err) => res.status(500).json({error: err}));
})

// Update Workout
router.put('/:id', validateSession, (req, res) => {
    
    const updateWorkout = {
        exercise: req.body.workout.exercise,
        duration: req.body.workout.duration,
        reps: req.body.workout.reps,
        sets: req.body.workout.sets,
        intensity: req.body.workout.intensity,
        notes: req.body.workout.notes
    };
    const query = {
        where: {
            id: req.params.id,
            owner: req.user.id
        }}
        Workout.update(updateWorkout, query)
        .then((workout) => res.status(200).json(workout))
        .catch((err) => res.status(500).json({error: err}))
})



module.exports = router;