const mongoose = require("mongoose");

const uri = "mongodb+srv://vddfjj57_db_user:hLBxNQ2FwCZpg6NE@cluster0.3wjchn2.mongodb.net";

mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed");
    console.error(err.message);
    process.exit(1);
  });
