import toast from "react-hot-toast";
import API from "../services/api";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const navigate=useNavigate();
    const[formData,setFormData]=useState({
        email:"",
        password:""
    })
    const handleChange=(e)=>{
        setFormData({
            ...formData,[e.target.name]:e.target.value
        })
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
            try{
                const {data}=await API.post("/auth/login",formData)
                localStorage.setItem("token",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                toast.success("Login Successful")
                navigate("/dashboard")
            }catch(error){
                toast.error(error.response?.data?.message ||"Login failed")
            }
        
    }
    return(
        <div className="min-h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit}
            className="border p-6 rounded w-96">
                <h2 className="text-2xl font-bold mb-4">
Login
                </h2>
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

        <button
          type="submit"
          className="bg-green-500 text-white w-full p-2"
        >
          Login
        </button>
            </form>
        </div>
    )
}
export default Login