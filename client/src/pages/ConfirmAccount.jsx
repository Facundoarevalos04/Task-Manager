import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";


export const ConfirmAccount = () => {

  const {token} = useParams()

  const navigate = useNavigate()
  const [alert, setAlert] = useState({});

  const handleShowAlert = (msg) => {
    setAlert({
      msg
    });
  }

  useEffect(() => {

    const confirmAccount = async () => {

      try {

       const {data} = await clientAxios.get(`/auth/checked?token=${token}`)

       Swal.fire({
        icon: 'info',
        title: 'Felicitaciones',
        text: data.msg,
        confirmButtonText: 'Iniciar sesion',
        allowOutClick: false
       }).then(result => {
        if(result.isConfirmed){
          navigate('/')
        }
       })
        
      } catch (error) {
        console.log(error)
        handleShowAlert(error.response?.data.msg)
      }
    }
   
    confirmAccount();

  }, []);

  return (
    <>
      <h1 className='text-indigo-600 font-mono text-3xl capitalize' >Confirma tu cuenta</h1>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-5 py10 rounded bg-white" ></div>

      {
        alert.msg && (
          <>
          <Alert {...alert}/>
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
          </>
        )
      }
    </>
  );
};
