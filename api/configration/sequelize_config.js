import  Sequelize  from "sequelize";


const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER,process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT
  });


  export default sequelize;