import express from 'express'
const router = express.Router();

import {roleAuth} from '../middlewares/auth.js'
import { createTask , getAllTasks , updateTask , deleteTask} from '../controllers/taskController.js';


router.post('/',roleAuth(["admin"]),createTask);
router.get('/', roleAuth(['user', 'admin']),getAllTasks);
router.put('/:id', roleAuth(['admin']), updateTask);
router.delete('/:id', roleAuth(['admin']),deleteTask);




export default router;

// const express = require('express');
// const router = express.Router();
// const { roleAuth } = require('../middlewares/auth');
// const taskController = require('../controllers/taskController');

// // Create a task (Admin only)
// router.post('/', roleAuth(['admin']), taskController.createTask);

// // Get all tasks (User and Admin)
// router.get('/', roleAuth(['user', 'admin']), taskController.getAllTasks);

// // Update a task (Admin only)
// router.put('/:id', roleAuth(['admin']), taskController.updateTask);

// // Delete a task (Admin only)
// router.delete('/:id', roleAuth(['admin']), taskController.deleteTask);

// module.exports = router;

