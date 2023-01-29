import { Router } from 'express'
import { register } from '../controllers/RegistrationController.js';

const router = Router();

router.post("/register", register );

export default router;