import express from "express";
const router = express.Router();
import { register , login , getUser , getAllUser} from "../controllers/authController.js";
import { registerValidation, loginValidation } from "../validation/validation.js";
import { auth } from "../middlewares/auth.js";


router.post('/register',registerValidation,register);
router.post('/login', loginValidation, login);
router.get('/',auth,getUser);
router.get('/getAllUsers',getAllUser);


export default router;

