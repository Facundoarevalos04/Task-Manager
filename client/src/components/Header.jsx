import React from "react"; 
import { Link } from "react-router-dom"; 
 
export const Header = () => { 
 
    return ( 
        <div className="bg-indigo-600"> 
            <div className="mx-4 flex"> 
                <h2 className="my-4 text-white font-mono text-3xl"><a href="/projects">Task Manager</a></h2> 
                <input className=" my-6 mx-16 rounded" type="text" placeholder=" Buscar proyecto..." /> 
                <div className="my-5"> 
                <Link 
                    className="font-mono border p-2 rounded mx-40 text-white"
                     to='/projects/create-project' 
                    > 
                        Nuevo proyecto 
                    </Link> 
                    <Link 
                    className="font-mono border p-2 rounded text-white"
                     to='/projects' 
                    > 
                        Proyectos 
                    </Link> 
                    <button 
                    type="button" 
                    /* onClick={closeSession} */ 
                    className="font-mono border p-1 rounded mx-8 text-white"
                    > 
                        Cerrar sesión 
                    </button> 
                </div> 
            </div> 
        </div> 
    ); 
};