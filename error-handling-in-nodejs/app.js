const express = require("express");
const app = express();
//grabbing the error handleer middleware
const errorHandler = require("./middleware/error-handler");
const asyncWrapper = require("./middleware/asyncWrapper");
//routes
const getUser = () => undefined;
//using try catch and everything
app.get("/first", async (req, res) => {
  try {
    const user = getUser();
    if (!user) {
      throw new Error("User not found in first");
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
  return res.status(200).json({ success: true });
});

//error handling using middleware
app.get("/second", async (req, res, next) => {
  try {
    const user = getUser();
    if (!user) {
      throw new Error("User not found in second");
    }
  } catch (error) {
    //return res.status(400).send(error.message);
    return next(error); //this returns all the logic return in next middleare, so now we have to go to the next middleware lined up after all the routes
  }
  return res.status(200).json({ success: true });
});

//error handling without try catch , using asyncWrapper middleware
app.get(
  "/third",
  asyncWrapper(async (req, res, next) => {
    const user = getUser();
    if (!user) {
      throw new Error("User not found in third");
    }
    return res.status(200).json({ success: true });
  })
);


//middleware
app.use(errorHandler);
app.listen(3000, () => {
  console.log("server is running");
});
