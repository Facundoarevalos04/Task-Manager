import React from 'react'
import { FormProject } from '../components/FormProject'

export const ProjectAdd = () => {
  return (
    <>
    <h1
     className='text-4xl font-mono mx-44 font-bold uppercase text-white'
    >
      Crear proyecto
    </h1>
    <div className='mt-10 flex justify-center'>
      <FormProject/>
    </div>
    </>
  )
}