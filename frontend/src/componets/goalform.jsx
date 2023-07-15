import React,{useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {reset,setGoals} from '../features/goals/goalslice'
function Goalform() {
    const {goals}=useSelector((state)=>state.goal)
    const dispatch=useDispatch()
    const[text,setText]=useState()

    const onChange=(e)=>{
        setText(e.target.value)
      }
      const handleSubmit=(e)=>{
        e.preventDefault()
      
        dispatch(setGoals({text}))
        setText('')
    
      }
  return (
    <div>
       <section >
       <div className='form-group'>
        <input type='text' placeholder='Enter the goals' id='goals' name='text' value={text} onChange={onChange} className='form-control'/>
       </div>
       <div className='form-group'>
         <button onClick={handleSubmit} className='btn btn-block'>Set Goal</button>
       </div>
    </section>
    </div>
  )
}

export default Goalform
