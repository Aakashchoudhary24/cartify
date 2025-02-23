import Link from "next/link"
import styles from "../styles/footer.module.css"
import Image from "next/image"

export default function Footer() {
    return (
        <>
        <div className={styles.main}>
            <footer className={styles.footer}>
                <div className={styles.container}>
                    <div className={styles.left}>
                        <h3>India Headquarters</h3>
                        <p>
                            Amrita Vishwa Vidyapeetham,<br />
                            Amritapuri, Vallikavu<br />
                            Kollam - 690525
                        </p>
                    </div>
                    <div className={styles.right}>
                        <h3>Join Our Social Community</h3>
                        <div className={styles.socialIcons}>
                            <Image src="/images/facebook.png" alt="Facebook" width={30} height={30} />
                            <Image src="/images/twitter.png" alt="Twitter" width={30} height={30} />
                            <Image src="/images/insta.png" alt="Instagram" width={30} height={30} />
                        </div>
                    </div>
                </div>
            </footer>
            </div>
        </>
    )
}