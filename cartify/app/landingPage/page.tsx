import Image from "next/image";
import styles from "../styles/landingPage.module.css";

const brands = [
    { name: "Puma", logo: "/images/Puma.jpeg", className: "" },
    { name: "Louis Vuitton", logo: "/images/Louis.jpeg", className: "" },
    { name: "Adidas", logo: "/images/Adidas.jpeg", className: "adidas" }, // Special class for Adidas
    { name: "H&M", logo: "/images/H&M.jpeg", className: "" },
    { name: "LEVI'S", logo: "/images/Levis.jpeg", className: "" },
];

const categories = [
    { name: "SHOES", image: "/images/Shoes.png" },
    { name: "CLOTHING", image: "/images/Clothing.png" },
    { name: "ACCESSORIES", image: "/images/Accessories2.jpeg" }
];

const LandingPage = () => {
    return (
        <>
        <div className={styles.main}>
            <div className={styles.landingContainer}>

                <nav className={styles.navbar}>
                    <span>MEN</span>
                    <span>WOMEN</span>
                    <span>SHOES</span>
                    <span>ACCESSORIES</span>
                </nav>

                <div className={styles.topSection}>
                    <div className={styles.topLeft}>
                        <Image src="/images/Black.jpeg" alt="Fashion Image" width={440} height={400} unoptimized />
                    </div>
                    <div className={styles.topCenter}>
                        <h1>BE BOLD, <br /> BE FASHIONABLE</h1>
                    </div>
                    <div className={styles.topRight}>
                        <Image src="/images/LandingImg1.png" alt="Fashion Image" width={400} height={400} unoptimized />
                    </div>
                </div>

                <div className={styles.brandsSection}>
                    <h2>POPULAR BRANDS</h2>
                    <div className={styles.brandsContainer}>
                        {brands.map((brand, index) => (
                            <div key={index} className={`${styles.brandCard} ${brand.className ? styles[brand.className] : ""}`}>
                                <div className={styles.brandLogo}>
                                    <Image src={brand.logo} alt={brand.name} width={180} height={170} unoptimized />
                                </div>
                                <p style={{ paddingTop: '8px' }}>{brand.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.divider} style={{ marginTop: '80px' }}></div>

                <div className={styles.composeStyleSection}>
                    <h3 className={styles.subheading}>EVERY LAST DETAIL</h3>
                    <h2 className={styles.heading}>Compose Your Style</h2>
                    <div className={styles.grid}>
                        {categories.map((category, index) => (
                            <div key={index} className={styles.card}>
                                <div className={styles.background}></div>
                                <Image src={category.image} alt={category.name} className={styles.productImage} width={200} height={300} unoptimized />
                                <div className={styles.overlay}>
                                    <h3>{category.name}</h3>
                                    <a href="#" className={styles.checkout}>Checkout</a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.divider} style={{ marginTop: '80px' }}></div>
                </div>

            </div>
        </div>
        </>
    );
};

export default LandingPage;
