import sequelize from "../configration/sequelize_config.js";
import User from './user.js'


await sequelize.sync().then(()=>{
    console.log("database sync successfully");
}).catch((e)=>{
    console.log(e);
    console.log("database not sync");
})