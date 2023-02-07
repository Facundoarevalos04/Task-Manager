import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";

export const ForgetPassword = () => {

  const [alert, setAlert] = useState({});
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      handleShowAlert('El email es requerido')
      return null
    };

    try {

      setSending(true)

      const {data} = await clientAxios.post('/auth/send-token', {
        email
      });
      setSending(false)

      Swal.fire({
        icon: 'info',
        title: 'Revisa tu casilla de correo',
        text: data.msg,
        confirmButtonText: 'Entendido',
        allowOutClick: false
       })

       setEmail('');
      
    } catch (error) {
      handleShowAlert(error.response?.data.msg)
      setEmail('');
    };

  }

    const handleShowAlert = (msg) => {
      setAlert({
        msg
      });
  
      setTimeout(() => {
        setAlert({});
      }, 3000);
    }
  

  return (
    <>
      <h1 className="text-indigo-600 font-mono text-3xl capitalize">
        Recupera tu acceso
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
            className="w-full mt-3 font-mono p-3 border rounded"
            id="email"
            type="email"
            placeholder="Ingresá tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="border bg-indigo-700 font-mono p-2 my-5 text-white"
          type="submit"
          disabled={sending}
        >
          Recuperar contraseña
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
          to={"/"}
        >
          ¿Estás registrado? Iniciá sesión
        </Link>
      </nav>
    </>
  );
};
