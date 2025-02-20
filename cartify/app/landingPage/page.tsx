import Image from "next/image";
import styles from "../styles/landingPage.module.css";

const brands = [
    { name: "Tommy Hilfiger", logo: "/images/Tommy.png" },
    { name: "Louis Vuitton", logo: "/images/Louis.jpeg" },
    { name: "Adidas", logo: "/images/Adidas.jpeg" },
    { name: "H&M", logo: "/images/H&M.jpeg" },
    { name: "LEVI'S", logo: "/images/Levis.jpeg" },
];

const LandingPage = () => {
    return (
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
                        <Image src="/images/LandingImg2.png" alt="Fashion Image" width={400} height={390} unoptimized />
                    </div>
                    <div className={styles.topCenter}>
                        <h1>BE BOLD, <br /> BE FASHIONABLE</h1>
                    </div>
                    <div className={styles.topRight}>
                        <Image src="/images/LandingImg1.png" alt="Fashion Image" width={400} height={400} unoptimized />
                    </div>
                </div>

                <div className={styles.brandsSection}>
                    <h2>BRANDS</h2>
                    <div className={styles.brandsContainer}>
                        {brands.map((brand, index) => (
                            <div key={index} className={styles.brandCard}>
                                <Image src={brand.logo} alt={brand.name} width={130} height={130} />
                                <p>{brand.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
