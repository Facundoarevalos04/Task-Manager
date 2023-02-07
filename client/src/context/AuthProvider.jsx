import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clientAxios } from '../config/clientAxios'

const AuthContext = createContext();

 const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=> {

    const authUser = async () =>{
      const token = sessionStorage.getItem('token');
      if(!token){
        return null
      }

      const config = {
        headers :{
          "Content-Type" : "application/json",
          Authorization: token
        }
      }

      try{

        const {data} = await clientAxios.get('/users/profile', config);
        setAuth(data.user)
        navigate('/projects')

      }catch(error){
        console.log(error)
        setAuth({})
      }finally{
        setLoading(false)
      }
    }

    authUser()

  }, [])

  return (
    <AuthContext.Provider
      value={
        {
        auth,
        setAuth,
      }
    }
    >
      {children}
    </AuthContext.Provider>
  );
};

export {
    AuthProvider
}

export default AuthContext
