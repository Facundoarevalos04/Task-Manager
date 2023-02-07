import { useState } from "react";
import { Link } from "react-router-dom";
import { clientAxios } from '../config/clientAxios'
import { Alert } from "../components/Alert";
import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";

const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}/;

export const Register = () => {

 const [alert, setAlert] = useState({})
 const [sending, setSending] = useState(false);

  const { formValues, handleInputChange, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formValues;


  const handleSubmit = async (e) => {
    e.preventDefault();

    if([name, email, password, password2].includes("")){
    handleShowAlert('todos los campos son obligatorios');
    return null
    };

    if(!exRegEmail.test(email)){
      handleShowAlert('el email tiene un formato invalido');
    return null
    };

    if(password !== password2){
      handleShowAlert('Las contraseñas no coinciden');
    return null
    }; 

    try {

      setSending(true)

    const {data} = await clientAxios.post('/auth/register', {
        name,
        email,
        password
      })

      setSending(false)

      Swal.fire({
        icon: 'info',
        title: 'Gracias por registrate!',
        text: data.msg,
      });

      reset()
      
    } catch (error) {
      console.error(error)
      handleShowAlert(error.response.data.msg)
    }
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
      <h1 className='text-indigo-600 font-mono text-3xl  capitalize'>Creá tu cuenta</h1>
      {
        alert.msg && <Alert {...alert}/>
      }
      <form className="my-8 pb-5 bg-indigo-800 rounded p-6" onSubmit={handleSubmit} noValidate>

        <div className="my-4">
          <label className="text-white font-mono" htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            placeholder="Ingresá tu nombre"
            className="w-full mt-3 font-mono p-3 border rounded"
            value={name}
            name="name"
            onChange={handleInputChange}
          />
        </div>
        <div className="my-4">
          <label className="text-white font-mono" htmlFor="email">Correo electrónico</label>
          <input 
          id="email" 
          type="email" 
          placeholder="Ingresá tu email" 
          className="w-full mt-3 p-3 font-mono border rounded"
          value={email}
          name="email"
          onChange={handleInputChange}
            />
        </div>
        <div className="my-4">
          <label className="text-white font-mono" htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Ingrese su contraseña"
            className="w-full mt-3 font-mono p-3 border rounded"
            value={password}
            name="password"
            onChange={handleInputChange}
          />
        </div>
        <div className="my-4">
          <label className="text-white font-mono" htmlFor="password2">Confirma tu contraseña</label>
          <input
            id="password2"
            type="password"
            placeholder="Ingrese su contraseña"
            className="w-full mt-3 font-mono p-3 border rounded"
            value={password2}
            name="password2"
            onChange={handleInputChange}
          />
        </div>
        <button className="border bg-indigo-700 font-mono p-2 text-white" disabled = {sending} type="submit">Crear cuenta</button>
      </form>
      <nav>
        <Link className= "text-indigo-700 block font-mono text-center rounded my-3 text-m" to={"/"} >¿Estás registrado? Iniciá sesión</Link>
      </nav>
    </>
  );
};
