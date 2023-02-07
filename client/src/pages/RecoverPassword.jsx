import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";

export const RecoverPassword = () => {

  const [alert, setAlert] = useState({})
  const [password, setPassword] = useState("")
  const [tokenChecked, setTokenChecked] = useState(false);

  const {token} = useParams()
  const navigate = useNavigate()

  const handleShowAlert = (msg) => {
    setAlert({
      msg
    });
  };

  useEffect(() => {
    const checkToken = async () => {
      
      try {

        const {data} = await clientAxios.get(`/auth/reset-password?token=${token}`);
        console.log(data.msg)
        setTokenChecked(true)
        
      } catch (error) {
        console.log(error)
        handleShowAlert(error.response?.data.msg)
      }
    }

    checkToken()

  }, []);

 const handleSubmit = async (e) =>{
  e.preventDefault()

  if (!password) {
    handleShowAlert('El password es requerido')
    return null
  }

 try {

  const {data} = await clientAxios.post(`/auth/reset-password?token=${token}`,{
    password
  })

  Swal.fire({
    icon: 'info',
    title: 'Contraseña reseteada',
    text: data.msg,
    confirmButtonText: 'Iniciar sesion',
    allowOutClick: false
   }).then(result => {
    if(result.isConfirmed){
      setPassword('');
      navigate('/')
    }
   })
  
 } catch (error) {
  handleShowAlert(error.response?.data.msg)
    setPassword('');
 }

  }

  return (
    <>
      <h1>Reestablecé tu contraseña</h1>
      {
        alert.msg && <Alert {...alert}/>
      }
      {

        tokenChecked?
        (
          <form
          onSubmit={handleSubmit} 
          action=""
          noValidate
          >
          <div>
            <label htmlFor="password">Nueva contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Escribí tu nueva contraseña"
              className="w-full mt-3 font-mono p-3 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Restablecer tu contraseña</button>
        </form>
        ) :
        <nav>
            <Link
            to={'/register'}
            >
            ¿No tenes cuenta? Registrate
            </Link>
            <Link
            to={'/'}
            >
           ¿Estás registrado? Inicia sesion
            </Link>
          </nav>
      }
     
    </>
  );
};
