import React, { useEffect } from "react";
import { ProjectPreview } from "../components/ProjectPreview";
import { useProjects } from "../hooks/useProjects";

export const Projects = () => {
  const { loading, alert, projects, getProjects } = useProjects();

  useEffect(() => {
    getProjects();
  }, []);

  return (
    
    <>
    <h1 className="text-4xl uppercase text-white font-mono cursor-pointer">Proyectos</h1>

      <div className="bg-indigo-600 text-white font-mono p-5 shadow mt-10 rounded-md">

        {loading 
        ? 
        (
          <p>Cargando...</p>
        ) 
        :
         projects.length 
        ?
        (
          projects.map((project) => (
            <ProjectPreview key={project._id} {...project} />
          ))
        ) 
        : 
        (
          <p>No hay proyectos agregados</p>
        )}
      </div>
    </>
  );
};
