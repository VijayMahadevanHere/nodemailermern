import React from 'react'
import { useEffect ,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Goalitems from '../componets/goalitems'
import Goalform from '../componets/goalform'
import { getGoals } from '../features/goals/goalslice'
import Spinner from '../componets/Spinner'
function Dashboard() {
  const {user}=useSelector((state)=>state.auth)
  const {goals,isError,message,isLoading}=useSelector((state)=>state.goal)
  const navigate=useNavigate()
  const dispatch=useDispatch()

  useEffect(()=>{
  if(isError){
    console.log(message);
  }
  
    if(!user){
     navigate('/login')
    }
    
    dispatch(getGoals())


  },[navigate,user,message,isError])
 if(isLoading){
  return <Spinner/>
 }
  return (
    <>
    <section className="header">
      Welcome {user && user.name}
      Set your goals
    </section>
    <Goalform/>
     <section className='content'>
    {goals?.length>0 ?( <div className='goals'>
      {goals.map((goal)=>{
     return  <Goalitems key={goal._id} goal={goal}/>
      })}
    </div>
      ) :(<h2>You havent set any goals</h2>) }

     </section>
    </>

  )
}

export default Dashboard
