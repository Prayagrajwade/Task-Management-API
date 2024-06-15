import express from "express";


const router = express.Router();
import { adminUsers  , promote , demote} from "../controllers/adminController.js";

import { roleAuth } from "../middlewares/auth.js";

import User from "../models/User.js";

router.get('/user',roleAuth(['admin']),adminUsers);
router.put('/promote/:id',roleAuth(["admin"]),promote);
router.put('/demote/:id',roleAuth(['admin']),demote);

export default router;