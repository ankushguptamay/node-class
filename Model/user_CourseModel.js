module.exports = (sequelize, DataTypes) => {
    const User_Course = sequelize.define('user_Course', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        }
    }, {
        timestamps: true
    })
    return User_Course;
}