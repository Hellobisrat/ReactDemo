import {useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Login = ({setIsLoggedIn}) => {
const [error,setError]=useState('')
const navigate = useNavigate();
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  phoneNumber: ''
});
const isValidPhoneNumber = (phoneNumber) => {
  const regex = /^\+254\d{9}$/;
  return regex.test(phoneNumber);
};
const handleChange =(event)=>{
  setFormData({...formData,[event.target.name]:event.target.value})
}
const handleSubmit = (e) => {
  e.preventDefault();
  if (!formData.firstName || !formData.lastName) {
    setError('All fields are required');
    return;
  }
  setIsLoggedIn(true)
  localStorage.setItem('name',formData.firstName)
  setError('');
  navigate('/', { state: { name: formData.firstName } });
};
  return (
    <div className='grid grid-cols-2 gap-10 sm:m-6 md:m-12 lg:m-24 text-red-500-2 min-h-screen  '>
      <div className='border rounded w-full p-6 md:p-12 lg:p-18 flex  flex-col item-center justify-center gap-6 md:gap-12 shadow-lg'>
       <h1 className='text-sm md:text-lg lg:text-xl text-slate-700'> Welcome to the login page.</h1>
       <p className='text-slate-600'>Please enter your first name, last name, and phone number in the format shown in the placeholders.</p> 
       <p className='text-blue-500'>Once submitted, you'll be redirected to the home page</p> 
      </div>
      <div className='border rounded w-full p-6 md:p-12 lg:p-24 flex item-center justify-center shadow-lg'>
        <form className='w-full' onSubmit={handleSubmit}>
          <div className='space-y-6 flex flex-col max-w-full'>
            <div className='flex flex-col w-full gap-4 md:gap-2'>
            <div className='flex justify-start gap-2'>
             <span className='text-red-500'>*</span>
             <label className='text-slate-600'>FirstName</label> 
            </div>
            <input 
             type='text'
             name="firstName"
             value={formData.firstName}
             onChange={handleChange}
             className='border border-slate-400 rounded px-2 md:py-1.2 lg:py-2'/>
             {error && <p className='text-red'>error</p>}
          </div>
          <div  className='flex flex-col  w-full gap-4 md:gap-2'>
            <div className='flex justify-start gap-2'>
              <span className='text-red-500'>*</span> 
              <label className='text-slate-600'>LastName</label>
            </div>
            <input
             type='text'
             name='lastName'
             value={formData.lastName}
             required
             onChange={handleChange} className='border border-slate-400 rounded px-2 md:py-1.2 lg:py-2'/>
          </div>
          <div className='flex flex-col w-full gap-4 md:gap-2'>
          <div className='flex justify-start gap-2'><span className='text-red-500'>*</span> 
           <label 
             className='text-slate-600'>
            PhoneNumber</label></div> 
            <input
            onChange={handleChange}
            type="tel"
            name='phoneNumber'
            pattern="^\+254\d{9}$"
            value={formData.phoneNumber}
            required
            placeholder="+254712345678"
            className='border border-slate-400 rounded px-2 md:py-1.2 lg:py-2'/>
            {!isValidPhoneNumber && <p className='text-red-500'>please insert valid phone number</p>}
          </div>
          <div>
           <button
            className='bg-blue-500 text-white hover:bg-blue-800 py-4 w-full font-medium rounded-lg' 
            type="submit" >LOGIN</button>
          </div>
          </div>  
        </form>
      </div>
      </div>
  )
}

export default Login