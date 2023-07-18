module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('course', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.STRING
        },
        thumbNail:{
            type: DataTypes.STRING
        }
    },{
        timestamps: true
    })
    return Course;
}