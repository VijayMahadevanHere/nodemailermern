import {FaSignOutAlt,FaSignInAlt,FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import React from 'react'
import { logout } from '../features/auth/authSlice'
function Header() {
  const dispatch=useDispatch()
  const {user}=useSelector((state)=>state.auth)
  const onLogout=()=>{
    dispatch(logout())
  }

  return (
    <div className='header'>
        <section className="logo">
          <Link to='/dashboard'>
            GoalApp
          </Link>
        </section>
        <section>
            <ul>
              {user? (
                    <button className='btn' onClick={onLogout}>
                    <FaSignOutAlt/>
                        Logout
                    </button>
                      
                  
                ) : (<>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt/>
                        Login
                    </Link>
                </li>
                <li>
                    <Link to='/'>
                        <FaUser/>
                        Register
                    </Link>
                </li> </>)}
            </ul>
        </section>
      
    </div>
  )
}

export default Header
