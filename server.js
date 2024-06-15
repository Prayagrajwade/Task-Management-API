import express from "express";
import dotenv from "dotenv";
import path from "path";
import auth from './routes/auth.js'
import tasks from './routes/tasks.js'
import connectDB from './config/db.js';
import scheduleReminders from './jobs/reminderJob.js'
import admin from "./routes/admin.js"


dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/auth',auth);
app.use('/api/task',tasks);
app.use('/api/admin',admin)

const PORT = process.env.PORT || 5000;

scheduleReminders();

connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1); // Exit the process with failure
  });

