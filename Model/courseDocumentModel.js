module.exports = (sequelize, DataTypes) => {
    const CourseDocument = sequelize.define('courseDocument', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        document: {
            type: DataTypes.STRING,
        }
    }, {
        timestamps: true
    })
    return CourseDocument;
}