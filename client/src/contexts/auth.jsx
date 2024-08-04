import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";


const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const [user, setUser] = useState(localStorage.getItem('token' || null) );

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser(token);
        }
    },[])

    const loginUser = async (userData) =>{
        const res = await fetch(`http://localhost:3001/api/v1/users/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })

        const data = await res.json();

        if (data.success) {
            setUser(data.token);

            localStorage.setItem('token', data.token);
            
            toast.success('User logged in successfully');
          } 
        if(!data.success){
            toast.error(data.error || 'login failed');
          }
    }

    const registerUser = async (userData) =>{
        const res = await fetch(`http://localhost:3001/api/v1/users/register`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })

        const data = await res.json();

        if (data.success) {
            setUser(data.token);

            localStorage.setItem('token', data.token);

            toast.success('User registered successfully');
          } 
        if(!data.success){
            toast.error(data.error || 'Registration failed');
          }
    }

    const logoutUser = async ()=>{
        setUser(null);
        localStorage.removeItem('token');
        toast.success('User logged out successfully');
    }

    const contextData ={
        user,
        loginUser,
        registerUser,
        logoutUser
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () =>{
    return useContext(AuthContext);
}

export default AuthContext;
