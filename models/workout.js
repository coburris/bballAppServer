module.exports = (sequelize, DataTypes) => {
    const Workout = sequelize.define('workout', {
        exercise: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        reps: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        sets: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        intensity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userID: {
            type: DataTypes.STRING,
            allowNull: false
        }

    })
    return Workout;
}