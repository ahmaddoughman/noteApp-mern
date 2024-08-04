import React, {useRef} from 'react'
import { useAuth } from '../../contexts/auth';

const Login = () => {

  const loginref = useRef(null);
  const { loginUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(loginref.current);

    const data = Object.fromEntries(formData);
    loginUser(data);
    
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl'>Login</h1>
      <form className='flex flex-col items-center justify-center w-1/2 my-3 p-10 bg-gray-300 rounded shadow'
      onSubmit={handleSubmit}
      ref={loginref}
      >
       
        <input className='border-2 my-6 border-gray-300 p-2 rounded outline-none focus:border-blue-400 focus:shadow' type="email" placeholder="Email" name='email' />
        <input className='border-2 my-6 border-gray-300 p-2 rounded outline-none focus:border-blue-400 focus:shadow' type="password" placeholder="Password" name='password' />
        <button className='w-full bg-blue-500 text-white hover:bg-blue-400 p-2 rounded shadow' type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
