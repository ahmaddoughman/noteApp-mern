import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/auth'

const Navbar = () => {

  const {user, logoutUser} = useAuth();
  return (
    <nav>
      {user? (
        <ul className="bg-blue-700 flex justify-center items-center px-4 py-2">
          <li className='mx-10 text-red-50 text-2xl'><Link to="/">Home</Link></li>
          <li className='mx-10 text-red-50 text-2xl'><Link to="/notes">Notes</Link></li>
          <li className='mx-10 text-red-50 text-2xl'><button onClick={logoutUser}>Logout</button></li>
        </ul>
      ) : (
        <div className="bg-blue-700 flex justify-center items-center px-4 py-2">
          <Link className='mx-10 text-red-50 text-2xl' to="/">Home</Link>
          <Link className='mx-10 text-red-50 text-2xl' to="/login">Login</Link>
          <Link className='mx-10 text-red-50 text-2xl'  to="/register">Register</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
