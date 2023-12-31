const dbConfig = require("../Config/db.config");

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admin = require("./adminModel")(sequelize, Sequelize);
db.courseDocument = require("./courseDocumentModel")(sequelize, Sequelize);
db.course = require("./courseModel")(sequelize, Sequelize);
db.user = require("./userModel")(sequelize, Sequelize);
db.user_Course = require("./user_CourseModel")(sequelize, Sequelize);

db.admin.hasMany(db.course, { foreignKey: "adminId", as: "adminCourse" }); // get course from admin
db.course.belongsTo(db.admin, { foreignKey: "adminId", as: "publisher" }); // get admin from course

db.course.hasMany(db.courseDocument, { foreignKey: "courseId", as: "courseDocument", onDelete: "CASCADE"});
db.courseDocument.belongsTo(db.admin, { foreignKey: "courseId", as: "course", onDelete: "CASCADE" });

db.admin.hasMany(db.courseDocument, { foreignKey: "adminId", as: "courseDocument" });
db.courseDocument.belongsTo(db.admin, { foreignKey: "adminId", as: "publisher" });

db.user.belongsToMany(db.course, { through: "user_Course", as: "course" });
db.course.belongsToMany(db.user, { through: "user_Course", as: "user" });

module.exports = db;