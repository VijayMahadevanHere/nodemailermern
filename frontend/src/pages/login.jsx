import React, { useState,useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector,useDispatch } from "react-redux";
import{useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import  {reset,login} from '../features/auth/authSlice'
import Spinner from "../componets/Spinner";
function Login() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const{isLoading,isSuccess,isError,message,user}=useSelector((state)=>state.auth)
  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate('/dashboard')
    }
    dispatch(reset())
      
  },[isSuccess,isError,message,user,navigate,dispatch])
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState)=>({
     ...prevState,
      [e.target.name]:e.target.value
    }))
  }
  const submitHandler=(e)=>{
    e.preventDefault()
    const userData={
      email,
      password
    }
    console.log(userData,'userdataa')
    dispatch(login(formData))

  }
  if(isLoading){
    return <Spinner/>
  }
  return (
    <>
    <section className="heading">
    <h1>
        <FaSignInAlt />
      </h1>
      <p>Login</p>
    </section>
     
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            placeholder="Enter Your Email"
            onChange={onChange}
            className="from-control"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Enter Password"
            onChange={onChange}
            className="from-control"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">Login</button>
        </div>
      </form>
    </>
  );
}

export default Login;
