import { Router } from 'express'
import {Home} from '../controllers/HomeController.js'

const router2 = Router();

router2.get("/", Home);

export default router2;