import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
import navbarStyles from './Navbar.module.scss' 
import Data from "../Componentes/Data" 
import dataStyles from '../Componentes/Data.module.css'

export default function Navbar() {
    return (
        <>
            <Head>
                <title>Meu App - Navbar</title>
            </Head>
            <nav className={navbarStyles.navbar}>
                <Image 
                    src="/images/logo.svg" // Certifique-se de que o caminho esteja correto
                    alt="Logo"
                    width={150} 
                    height={36} 
                    className={navbarStyles.logo} 
                />
                <h1>Bem-vindo de volta, Kelvin</h1>
                <div className={dataStyles.data}> 
                    <Data />
                </div>
            </nav>
        </>
    )
}
