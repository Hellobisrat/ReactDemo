
import { Link } from 'react-router-dom'
import {Home, LogIn} from 'lucide-react'

const Navbar = ({isLoggedIn}) => {
  
  const loggedPerson = localStorage.getItem('name')
  const name = loggedPerson.charAt(0).toUpperCase()+ loggedPerson.slice(1)
  return (
    <div className='flex items-center justify-between md:p-2 lg:p-4 border-b  bg-slate-50 rounded-lg'>
      <div className='md:text-medium lg:text-large flex gap:6'> <Link to='/' className='flex items-center gap-2'>
      <Home className='w-8 h-8 text-purple-300'/> <span className='text-purple-400 mr-1 font-bold flex gap-3 '>| Home</span>  </Link>  </div>
      <div className="overflow-hidden whitespace-nowrap flex-1 py-2">
      <p className="animate-myanimation text-pink-200 font-normal text-lg">
         Hello {isLoggedIn ? name : 'Guest'}  — search your product here
      </p>
    </div>
     <div className='flex gap-6 '>{ isLoggedIn ?  <span className='flex gap-4 '>Welcome, &nbsp; { <span className='font-semibold text-capital text-blue-800'>{name} </span>}</span >:
      <Link to='/login' className='flex gap-4 items-center'>
      <LogIn className='w-8 h-8 text-purple-300'/>  <span className='font-semibold text-purple-300'>Login</span>
     </Link>}
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