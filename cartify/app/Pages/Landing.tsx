import "../styles/landing.css"

export default function Landing(){
    return(
        <div className="landing">
            <div className="welcome">
                <h1 className="welcome-text">
                    Welcome to Cartify
                </h1>
                <p className="motto-paragraph">
                Swift. Secure. Packed with Choices!
                </p>
                <div className="landing-buttons">
                <button>Join Us</button>
                <button>Browse Products</button>
                </div>
            </div>
            <div className="background-image"></div>
        </div>
    )
}