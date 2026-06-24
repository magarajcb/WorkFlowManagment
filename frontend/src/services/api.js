import axios from "axios";
const API=axios.create({
    baseURL:"https://workflowmanagment.onrender.com/api",
})
export default API