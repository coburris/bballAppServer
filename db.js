const Sequelize = require('sequelize');
// const { User } = require("./models");
const sequelize = new Sequelize('bball-app', 'postgres','password', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to bball-app postgres database');
    },
    function(err){
        console.log(err);
    }
);

// User = sequelize.import('./models/user.js');
// Workout = sequelize.import('./models/workout.js');

// Workout.belongsTo(User);
// User.hasMany(Workout);

module.exports = sequelize;