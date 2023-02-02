import { Router } from 'express'
import {Home, postTodo, getData} from '../controllers/HomeController.js'

const router2 = Router();

router2.get("/", Home);
router2.post('/', postTodo);
router2.get('/getdata', getData);

export default router2;