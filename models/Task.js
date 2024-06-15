import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending'
    },
    dueDate: {
      type: Date,
    },
    reminder: {
      type: Date,
    },
    collaborators: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    date: {
      type: Date,
      default: Date.now
    }
  });

  const TaskModel = mongoose.model("Task",TaskSchema)
  
  export default TaskModel;




