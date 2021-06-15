const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



// CREATE USER
router.post('/signup', function(req,res){
    User.create({
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 13),
        admin: false
    })
    .then(function createSuccess(user){
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60*60*24});
        res.json({
            user: user,
            message: "Time To Step Up Your Game!",
            sessionToken: token
        });
    })
    .catch(err => res.status(500).json({ error: err }))
});


// USER LOGIN
router.post('/login', function (req,res){
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(function loginSuccess(user){
        if (user) {
            bcrypt.compare(req.body.password, user.password, function(err, matches){
                if (matches) {
                    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60*60*24})
                    
                    res.status(200).json({
                        user: user,
                        message: "Welcome Back, Let's Get To Work!",
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({ error: "Login Failed"});
                }
            })
        } else {
            res.status(500).json({ error: "User Does Not Exist"})
        }
    })
    .catch(err => res.status(500).json({error: err}))
})



// DISPLAY ALL USERS
router.get("/", function (req, res) {
    User.findAll(
    )
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({error: err}))
})


// DELETE USER
router.delete("/delete/:id", function(req,res) {
    const query = {where: {id: req.params.id}}

    User.destroy(query)
    .then(() => res.status(200).json({ message: "Client Removed"}))
    .catch((err) => res.status(500).json({error: err}))
})

module.exports = router