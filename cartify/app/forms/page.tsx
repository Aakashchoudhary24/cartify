import Navbar from "../components/navbar"
import '../styles/forms.css'

export default function Forms(){
    return(
        <>
        <Navbar/>
        <form>
        <h1>Forms page</h1>
        <p>To add conditional rendering <br></br>
            Which decides which form to load based on button clicks
        </p>
        </form>
        </>
    )
}