import React from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';

const Navbar = ({isLoggedIn}) => {
  
  const loggedPerson = localStorage.getItem('name')
  const name = loggedPerson.charAt(0).toUpperCase()+ loggedPerson.slice(1)
  return (
    <div className='flex items-center justify-between md:p-2 lg:p-4 border-b  bg-rgba(255,255,255,0.8)'>
      <div className='md:text-medium lg:text-large flex gap:6'> <Link to='/'><HomeIcon className='w-4 h-4 text-blue-300'/> <span className='text-red-100 mr-1'>|</span> Home </Link>  </div>
      <div className="overflow-hidden whitespace-nowrap flex-1 py-2">
      <p className="animate-myanimation text-pink-200 font-normal text-lg">
         Hello {isLoggedIn ? name : 'Guest'}  — search your product here
      </p>
    </div>
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