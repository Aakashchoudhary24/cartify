import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Landing from "./Pages/Landing";
import Categories from "./Components/Categories";

export default function Home(){
  return(
    <div className="main">
      <Navbar/>
      <Categories/>
      <Landing/>
      <Footer/>
    </div>
  )
}