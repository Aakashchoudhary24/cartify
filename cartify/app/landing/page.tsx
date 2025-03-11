'use client'

import Navbar from "../components/Navbar"
import Image from "next/image"
import '../styles/landing.css'

export default function Landing(){
    return(
        <>
        <Navbar/>
        <div className="poster-images">
            <Image className="male-poster-image" alt="male supermodel" src='/images/males.jpeg' width={1000} height={100}></Image>
            <Image className="male-poster-image" alt="male supermodel" src='/images/male.jpeg' width={500} height={100}></Image>
        </div>
        </>
    )
}