'use client'

import Navbar from "../components/Navbar"
import Image from "next/image"
import '../styles/landing.css'

export default function Landing(){
    return(
        <>
        <Navbar/>
        <div className="poster-images">
            <Image className="male-poster-image" alt="male supermodel" src='/images/people.png' width={1200} height={0}></Image>
            <Image className="male-poster-image" alt="male supermodel" src='/images/couple.webp' width={550} height={0}></Image>
        </div>
        </>
    )
}