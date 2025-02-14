import Link from "next/link"
import "../styles/footer.css"

export default function Footer(){
    return(
        <>
        <div className="footer">
            <ul className="links">
                <li><Link href="https://github.com/Aakashchoudhary24/cartify">Github</Link></li>
                <li><Link href="https://linkedin.com">LinkedIn</Link></li>
                <li><Link href="https://developer.mozilla.org">Instagram</Link></li>
            </ul>
        </div>
        </>
    )
}