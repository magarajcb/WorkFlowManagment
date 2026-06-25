import { useState } from "react";
import { useNavigate } from "react-router-dom"
import API from "../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
  const Register=()=>{
    const navigate=useNavigate();
    const[formData,setFormData]=useState({
        name:"",
        email:"",
        password:""
    })
    const handleChange=(e)=>{
        setFormData({
            ...formData,[e.target.name]:e.target.value,
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
        await API.post("/auth/register",formData)
        toast.success("Registeration Succesful")
        navigate("/login")
    }catch(error){
        toast.error(
            error.response?.data?.message || "Registeration failed"
        )
    }
    }
    
return(
    <div className="min-h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit}
        className="border p-6 rounded w-96">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <input
            type="text"
            name="name"
            placeholder="name"
            className="border w-full p-2 mb-3"
            onChange={handleChange}>
            </input>
              <input
          type="email"
          name="email"
          placeholder="Email"
          className="border w-full p-2 mb-3"
          onChange={handleChange}
        />
 <input
          type="password"
          name="password"
          placeholder="Password"
          className="border w-full p-2 mb-3"
          onChange={handleChange}
        />
<button type="submit"
className="bg-blue-500 text-white w-full p-2">Register</button>


<p className="text-center mt-4">
  Already have an account?{" "}
  <Link
    to="/login"
    className="text-blue-600 font-semibold"
  >
    Login
  </Link>
</p>
        </form>

    </div>
)
}
    

  
  export default Register