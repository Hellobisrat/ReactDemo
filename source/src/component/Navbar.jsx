import React from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';

const Navbar = ({isLoggedIn}) => {
  const location = useLocation();
  const name = location.state?.name
  return (
    <div className='flex items-center justify-between md:p-2 lg:p-4 border-b  bg-rgba(255,255,255,0.8)'>
      <div className='md:text-medium lg:text-large flex gap:6'> <Link to='/'><HomeIcon/>| Home </Link>  </div>
     <div>{ isLoggedIn ?  <span className='flex gap-4 '>Welcome, { <span className='font-semibold text-capital text-blue-800'>{name} </span> || 'Guest'}</span >: <Link to='/login'>Login</Link>}
    </div> 
    </div>
  )
}

export default Navbar