const Project = require("../models/Project");
const Task = require("../models/Task");

const createTask=async(req,res)=>{
    try{
        const{title,description, projectId}=req.body;
        const project=await Project.findById(projectId)
        if(!project){
            return res.status(404).json({
                message:"project not found"
            })
        }
        const task=await Task.create({
            title,
            description,
            project:projectId
        })
        res.status(201).json(task)
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
const getTasksByProject=async(req,res)=>{
    try{
        const tasks=await Task.find({
            project:req.params.projectId
        })
        res.status(200).json(tasks)
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
const updateTaskStatus=async (req,res)=>{
    try{
        const{status}=req.body
        const task=await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    task.status=status
    await task.save()
    res.status(200).json(task);

    }
    catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
const deleteTask=async(req,res)=>{
    try{
        const task=await Task.findById(req.params.id)
        if(!task){
            return res.status(404).json({
                message:"Task not found"
            })
        }
        await task.deleteOne();
        res.status(200).json({
      message: "Task deleted successfully",
    });
    }
    catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
module.exports = {
  createTask,
  getTasksByProject,
  updateTaskStatus,
  deleteTask,
};