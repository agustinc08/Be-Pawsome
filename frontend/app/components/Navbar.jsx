"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "public/logoBePawsome.png";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <nav className="flex items-center justify-between py-4 px-6">
      <div className="flex items-center space-x-4">
        <Link
          href="/"
          onClick={() => {
            router.push("/");
            router.reload();
          }}
        >
          <Image
            src={Logo}
            alt="Logo BePawsome"
            width={70}
            height={70}
            quality={100}
            placeholder="blur"
          />
        </Link>
        <Link
          className="text-violet-500 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          style={{ textDecoration: "none" }}
          href="/aboutUs"
        >
          <div className="p-2 rounded hover:bg-violet-400 hover:text-white hover:shadow-lg">
            About Us
          </div>
        </Link>
        {session && (
          <Link
            className="text-violet-500 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            style={{ textDecoration: "none" }}
            href="/publicacion/crearPublicacion"
          >
            <div className="p-2 rounded hover:bg-violet-400 hover:text-white hover:shadow-lg">
              Crear Publicacion
            </div>
          </Link>
        )}
      </div>
      <div className="flex items-center justify-center md:mx-auto md:ml-4 md:mr-4">
        <Link href="/adopciones">
          <button className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-blue-500 hover:to-pink-500 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-white font-bold py-2 px-4 rounded  w-full h-full">
            Vidas salvadas
          </button>
        </Link>
      </div>
      <div className="ml-auto flex space-x-2 p-2 m-2 ">
        {session ? (
          <button
            onClick={toggleMenu}
            className="cursor-pointer focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            <Image
              src={session.user?.userLogueado.imagenPerfil}
              alt="Imagen Usuario"
              width={50}
              height={50}
              quality={100}
              className="rounded-full hover:shadow-lg"
            />
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={() => router.push("/register")}
              className="btn bg-purple-500 hover:bg-purple-700 text-white"
            >
              Registrarse
            </button>
            <button
              onClick={() => signIn()}
              className="btn bg-purple-500 hover:bg-purple-700 text-white"
            >
              Iniciar Sesion
            </button>
          </div>
        )}
      </div>
      {menuVisible && session && (
      
        <div
          className="absolute top-16 right-6 bg-white p-4 rounded shadow flex flex-col"
          style={{ position: "absolute", marginTop: "60px", zIndex: 1 }}
        >
          <Link href="/usuario/casita">
            <div className="flex items-center p-2 m-2">
              <Image src="/home.png" alt="React Logo" width={30} height={30} />
              <span className="ml-2">Casita</span>
            </div>
          </Link>
          <Link href="/usuario/misPublicaciones">
            <div className="flex items-center p-2 m-2">
              <Image
                src="/publicaciones.png"
                alt="React Logo"
                width={30}
                height={30}
              />
              <span className="ml-2">Mis Publicaciones</span>
            </div>
          </Link>
          <Link href="/usuario/perfil">
            <div className="flex items-center p-2 m-2">
              <Image
                src="/perfil.png"
                alt="React Logo"
                width={30}
                height={30}
              />
              <span className="ml-2">Perfil</span>
            </div>
          </Link>
          <button
            onClick={() => signOut()}
            className="bg-purple-500 hover:bg-purple-700 text-white"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </nav>
  );
}
