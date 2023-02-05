import { Router } from 'express'
import {Home, postTodo, getData, deleteTodo, editTodo} from '../controllers/HomeController.js'

const router2 = Router();

router2.get("/", Home);
router2.post('/', postTodo);
router2.get('/getdata', getData);
router2.delete("/:id", deleteTodo)
router2.patch("/:id", editTodo)

export default router2;