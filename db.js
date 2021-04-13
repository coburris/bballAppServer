const Sequelize = require('sequelize');
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
module.exports = sequelize;