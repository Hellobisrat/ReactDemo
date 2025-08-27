import React from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';

const Navbar = ({isLoggedIn}) => {
  
  const name = localStorage.getItem('name')
  return (
    <div className='flex items-center justify-between md:p-2 lg:p-4 border-b  bg-rgba(255,255,255,0.8)'>
      <div className='md:text-medium lg:text-large flex gap:6'> <Link to='/'><HomeIcon/>| Home </Link>  </div>
     <div className='flex gap-6 '>{ isLoggedIn ?  <span className='flex gap-4 '>Welcome, &nbsp; { <span className='font-semibold text-capital text-blue-800'>{name} </span>}</span >: <Link to='/login'>Login</Link>}
     <Link
      to="/login"
     className={isLoggedIn ? 'block' : 'hidden'}
      >
     LogOut
    </Link>
    </div> 
    </div>
  )
}

export default Navbar