import TaskModel from "../models/Task.js";

export const createTask = async(req,res) =>{
    const {title,description,status,dueDate,reminder,collaborators} = req.body;
    try{
        const newTask = new TaskModel({
            user:req.user.id,
            title,
            description,
            status,
            dueDate,
            reminder,
            collaborators
        });

        const task = await newTask.save();
        res.json(task);
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
  }
};

export const getAllTasks = async(req,res) =>{
    try {
        const tasks = await TaskModel.find({
          $or: [
            { user: req.user.id },
            { collaborators: req.user.id }
          ]
        }).sort({ date: -1 });
    
        res.json(tasks);
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
      }
}

export const updateTask = async(req,res) =>{
    const { title, description, status, dueDate, reminder, collaborators } = req.body;

  const taskFields = {};
  if (title) taskFields.title = title;
  if (description) taskFields.description = description;
  if (status) taskFields.status = status;
  if (dueDate) taskFields.dueDate = dueDate;
  if (reminder) taskFields.reminder = reminder;
  if (collaborators) taskFields.collaborators = collaborators;

  try {
    let task = await TaskModel.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    task = await TaskModel.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
}

export const deleteTask = async (req,res) => {
    try {
        let task = await TaskModel.findById(req.params.id);
    
        if (!task) {
          return res.status(404).json({ msg: 'Task not found' });
        }
    
        if (task.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'User not authorized' });
        }
    
        await TaskModel.findByIdAndDelete(req.params.id);
    
        res.json({ msg: 'Task removed' });
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
      }
}
