import '../styles/about.css'
import Navbar from "../components/Navbar"

export default function About() {
    return (
        <div className='about-page'>
            <Navbar />
            <div className="about">
                <h1>About page</h1>
            </div>
        </div>
    )
}