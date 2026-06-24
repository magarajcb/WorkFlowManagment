const express=require("express")
const cors=require("cors")
const authRoutes=require("./routes/authRoutes")
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const app=express()
app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/projects",projectRoutes)
app.use("/api/tasks",taskRoutes)
app.get("/",(req,res)=>{
    res.send("Workflow app running")
})

module.exports=app;