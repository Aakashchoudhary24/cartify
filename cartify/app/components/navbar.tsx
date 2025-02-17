import "../styles/navbar.css"
import Link from "next/link"

export default function Navbar(){
    return(
        <div className="container">
            <nav className="navbar">
            <span className="logo">Cartify</span>
            <ul className="pages">
                <li><Link href="/products">SHOP</Link></li>
                <li><Link href="/">HOME</Link></li>
                <li><Link href="/about">ABOUT</Link></li>
            </ul>
            <input className="search-bar" type="text" placeholder="Search products"></input>
        </nav>
        </div>
    )
}