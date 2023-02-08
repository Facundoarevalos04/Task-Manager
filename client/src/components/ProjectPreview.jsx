import React from "react";
import { Link } from "react-router-dom";

export const ProjectPreview = ({name, _id, client}) => {
  return (
    <div className='border-b p-3 flex justify-between'>
        <p className="text-white my-1 font-mono">
          Nombre: {name}
           <span
           >
            { ` | ${client}` }
           </span>
        </p>
        <Link
            to={`/projects/${_id}`}
            className="font-mono text-sm text-white border p-2 rounded"
        >
            Ver proyecto
        </Link>
        
    </div>
  );
};