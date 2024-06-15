// import cron from 'node-cron';
// import nodemailer from 'nodemailer';
// import TaskModel from '../models/Task.js'
// import User from '../models/User.js';

// const transport = nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//         user:process.env.EMAIL_USER,
//         pass:process.env.EMAIL_PASS
//     }
// });

// const scheduleReminders = () ={
// cron.schedule('* * * * *', async () => {
//     const now = new Date();
//     const tasks = await TaskModel.find({ reminder: { $lte: now } });
  
//     tasks.forEach(async task => {
//       const user = await User.findById(task.user);
  
//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: user.email,
//         subject: 'Task Reminder',
//         text: `Reminder for your task: ${task.title}.\nDue Date: ${task.dueDate}`
//       };
  
//       transport.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//         }
//       });
  
//       task.reminder = null;
//       await task.save();
//     });
//   });

// }

import cron from 'node-cron';
import nodemailer from 'nodemailer';
import TaskModel from '../models/Task.js';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

const scheduleReminders = () => {
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const tasks = await TaskModel.find({ reminder: { $lte: now } });

    tasks.forEach(async (task) => {
      const user = await User.findById(task.user);

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Task Reminder',
        text: `Reminder for your task: ${task.title}.\nDue Date: ${task.dueDate}`,
      };

      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      task.reminder = null;
      await task.save();
    });
  });
};

export default scheduleReminders;
