const mongoose = require("mongoose");
const conDb = async()=>{
    try{
     const connect = await mongoose.connect(process.env.CON_STRNG);
     console.log(
      "Connection Successed: ",
      connect.connection.host,
      connect.connection.name
    );
    }catch(err){
        console.log(err);
        process.exit(1);
    }
};

module.exports = conDb;