'use client'

import "../styles/landing.css"
import { useRouter } from 'next/navigation'

export default function Landing(){
    const router = useRouter()

    return(
        <>
        <div className="categories">
            <ul>
                <li>For Him</li>
                <li>For her</li>
                <li>Accessories</li>
                <li>Beauty</li>
                <li>Others</li>
            </ul>
        </div>
        <div className="landing">
            <div className="welcome">
                <h1 className="welcome-text">
                    Welcome to Cartify
                </h1>
                <p className="motto-paragraph">
                Swift. Secure. Packed with Choices!
                </p>
                <div className="landing-buttons">
                <button type="button" onClick={() => router.push('/forms')}>Join Us</button>
                <button>Browse Products</button>
                </div>
            </div>
            <div className="background-image"></div>
        </div>
        </>
        
    )
}