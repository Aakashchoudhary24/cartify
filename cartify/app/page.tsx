import Footer from "./components/footer";
import Navbar from "./components/Navbar";
import Landing from "./landing/page";

export default function Home(){
  return(
    <div className="main">
      <Navbar/>
      <Landing/>
      <Footer/>
    </div>
  )
}