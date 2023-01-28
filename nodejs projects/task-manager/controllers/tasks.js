const Task = require("../models/tasks");
const asyncWrapper = require('../middleware/asyncWrapp')
//logics of all callback functions-which we will use in routes

const getAllTasks = asyncWrapper( async (req, res, next) => {
    const tasks = await Task.find({});
    res.json({ tasks });
});


/* for hardcode data----
const createTasks= async (req,res)=>{
    const tasks = await Task.create({name: 'srishti'})
        res.json({tasks})
    } 
*/
const createTasks = asyncWrapper(async (req, res) => {
 
    const tasks = await Task.create(req.body);
    res.status(200).json({ tasks });
 
});

const getTasks = asyncWrapper(async (req, res) => {
  
    const taskID = req.params.id;
    const task = await Task.findById({ _id: taskID });
    if (!task) {
      return res
        .status(404)
        .json({ msg: `No task exists for this ID: ${taskID}` });
    }
    res.status(200).json({ task });

});

const updateTasks = asyncWrapper(async (req, res) => {
    const taskID = req.params.id;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res
        .status(404)
        .json({ msg: `No task exists for this ID: ${taskID}` });
    }

    res.status(200).json({ task });

});
const deleteTasks = asyncWrapper( async (req, res) => {

  const taskID = req.params.id;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return res.status(404).json({ msg: `No task with this ID: ${taskID}` });
  }
  res.status(200).json({ task });

});
//same functions with try and catch block
/* const deleteTasks = async (req, res) => {
  try {
    const taskID = req.params.id;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with this ID: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}; */
module.exports = {
  getAllTasks,
  createTasks,
  getTasks,
  updateTasks,
  deleteTasks,
};
