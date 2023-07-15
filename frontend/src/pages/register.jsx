import React, { useState ,useEffect} from "react";
import { FaUser} from "react-icons/fa";
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate}from 'react-router-dom'
import{toast} from 'react-toastify'
import { register,reset } from "../features/auth/authSlice";
import Spinner from "../componets/Spinner";
function Register() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

     const{user,isLoading,isSuccess,isError,message}= useSelector((state)=>state.auth)

     useEffect(()=>{
      
      if(isError){
        toast.error(message)
      }
      if(isSuccess || user){
        navigate('/dashboard')
      }
      dispatch(reset())

     },[user,isError,isSuccess,message,dispatch,navigate])

  const onChange = (e) => {
    setFormData((prevState)=>({
     ...prevState,
      [e.target.name]:e.target.value
    }))
  };
  const submitHandler=(e)=>{
    e.preventDefault()
    if(password === password2 ){
      dispatch(register(formData))
    }else{
      toast.error('password dont match.')
    }

  }
  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
    <section className="heading">
    <h1>
        <FaUser />
      </h1>
      <p>Create an accout to start.</p>
    </section>
     
      <form>
        <div className="form-group">
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Enter Your Name"
            onChange={onChange}
            className="from-control"
          />
        </div>
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
          <input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            placeholder="Confirm Password"
            onChange={onChange}
            className="from-control"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" onClick={submitHandler}>Register</button>
        </div>
      </form>
    </>
  );
}

export default Register;
