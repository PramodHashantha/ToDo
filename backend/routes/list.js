import express from "express"
import { addTask,getTask,updateTask,deleteTask} from "../controllers/list.js"

const router = express.Router()

router.post('/addTask',addTask)
router.get('/getTask/:id',getTask)
router.put('/updateTask/:id',updateTask)
router.delete('/deleteTask/:id',deleteTask)

export default router