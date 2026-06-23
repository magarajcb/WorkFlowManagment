const Project = require("../models/Project")

const createProject= async(req,res)=>{
    try{
        const{title,description}=req.body
        const project= await Project.create({
            title,
            description,
            owner:req.userId
        })
        res.status(201).json(project)
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
const getProjects= async(req,res)=>{
    try{
        const projects=await Project.find({
            owner:req.userId
    })
    res.status(200).json(projects)
}catch(error){
    res.status(500).json({
        message:error.message
    })
}}
const getProjectById=async(req,res)=>{
    try{
        const project=await Project.findById(req.params.id)
        if(!project){
            return res.status(404).json({
                message:"Project not found"
            })
                   }
                    res.status(200).json(project)
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
const deleteProject=async(req,res)=>{
    try{
        const project=await Project.findById(req.params.id)
        if(!project){
            return res.status(404).json({
                message:"Project Not Found"
            })
                    }
                    await project.deleteOne()
                    res.status(200).json({
                message:"Project deleted succesfully"
            })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
module.exports = {
  createProject,
  getProjects,
  getProjectById,
  deleteProject,
};