console.log("Task Manager App");
const {connectDB} = require('./db/connection')
const express = require("express");

const tasks = require("./routes/tasks"); //grabbing exported module routes
const app = express();

//middleware
app.use(express.json()); //if we dont give this, we wont have data in req,body
app.use(express.static('./public'))
//this will remain static baki routes iske bad add honge
app.use("/api/v1/tasks", tasks);

//connection to databse
const start = async () => {
  try {
    await connectDB();
    const port = 3000;
    app.listen(port, console.log(`server is running at ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
