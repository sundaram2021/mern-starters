import { Router } from 'express'
import {Home, postTodo} from '../controllers/HomeController.js'

const router2 = Router();

router2.get("/", Home);
router2.post('/', postTodo);

export default router2;