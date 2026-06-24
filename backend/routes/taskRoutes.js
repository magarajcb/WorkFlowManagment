const express=require("express");
const { createTask, getTasksByProject, updateTaskStatus, deleteTask } = require("../controllers/taskController");
const protect = require("../middleware/authMiddleware");
const router=express.Router();
router.post("/",protect,createTask)
router.get('/project/:projectId',protect,getTasksByProject)
router.put('/:id',protect,updateTaskStatus)
router.delete('/:id',protect,deleteTask)
module.exports=router