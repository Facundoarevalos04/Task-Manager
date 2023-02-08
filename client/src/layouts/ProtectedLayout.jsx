import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export const ProtectedLayout = () => {
  const { auth, loading } = useAuth();

    if(loading) {
      return <p className="my-32 mx-32">Cargando...</p>;
    }
  
  return (
    <>
      {auth._id ? (
        <div className="bg-indigo-400">
          <Header/>
          <div className="md:flex md:min-h-screen">
            {/* <Sidebar/> */}
            <main className="container mx-auto mt-5 md:mt-10 p-5 md:justify-center">
            <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
