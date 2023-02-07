import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";
import useAuth from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

export const Login = () => {
  const [alert, setAlert] = useState({});
  const {setAuth} = useAuth()

  const handleShowAlert = (msg, time = true) => {
    setAlert({
      msg,
    });

    if(time){
      setTimeout(() => {
        setAlert({});
      }, 3000);
    }

    reset()
  };

 const {formValues, handleInputChange, reset} = useForm({
  email: '',
  password: ''
 })

 const {email, password} = formValues;

 const handleSubmit = async (e) =>{
  e.preventDefault()


  if([email, password].includes("")){
    handleShowAlert('todos los campos son obligatorios');
    return null
    };

    try{

     const {data} = await clientAxios.post('/auth/login',{
        email,
        password
      })

      //console.log(data)

     setAuth(data.user);
     sessionStorage.setItem('token', data.token);

    }catch(error){
      console.error(error);
      handleShowAlert(error.response?.data.msg);
    };
 };

  return (
    <>
      <h1 className="text-indigo-600 font-mono text-3xl  capitalize">
        Iniciá sesión
      </h1>
      {
        alert.msg && <Alert {...alert}/>
      }
      <form 
      onSubmit={handleSubmit}
      className="my-8 pb-5 bg-indigo-800 rounded p-6"
      noValidate
      >
        <div>
          <label className="text-white font-mono" htmlFor="email">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            className="w-full mt-3 font-mono p-3 border rounded"
            placeholder="Ingrese su email"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="text-white font-mono" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="w-full mt-3 font-mono p-3 border rounded"
            placeholder="Ingrese su contraseña"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="border bg-indigo-700 font-mono p-2 my-5 text-white"
          type="submit"
        >
          Iniciar sessión
        </button>
      </form>
      <nav>
        <Link
          className="text-indigo-700 block font-mono text-center rounded my-3 text-m"
          to={"/register"}
        >
          ¿No tenés una cuenta? Registrate
        </Link>
        <Link
          className="text-indigo-700 block font-mono text-center rounded my-3 text-m"
          to={"/forget-password"}
        >
          Olvidé mi password
        </Link>
      </nav>
    </>
  );
};
