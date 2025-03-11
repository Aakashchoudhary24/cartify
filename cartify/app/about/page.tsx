"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/about.module.css";

export default function AboutPage() {
  const [showContact, setShowContact] = useState<boolean>(false);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {/* About Us Section */}
        <section className={styles.aboutSection}>
          <h2 className={styles.heading}>About us</h2>
          <p className={styles.subHeading}>
            As a Clothing Brand, we are committed to providing high-quality fashion that defines elegance and comfort.
          </p>
          <div className={styles.content}>
            <img src="/images/team.png" alt="Team working" className={styles.image} />
            
            {/* Divider Line */}
            <div className={styles.divider}></div>

            <div className={styles.text}>
              <p>
                Our clothing brand is dedicated to crafting stylish, high-quality apparel for individuals who appreciate modern fashion.
                We focus on sustainable fabrics, innovative designs, and excellent craftsmanship to ensure our customers get the best.
              </p>
              <p>
                Our mission is to provide trendy yet timeless pieces that fit seamlessly into your lifestyle. We stay ahead of fashion trends
                while maintaining the essence of comfort and individuality in every piece we create.
              </p>
              <button className={styles.button} onClick={() => setShowContact(!showContact)}>
                {showContact ? "Hide Contact" : "Get in Touch"}
              </button>

              {/* Contact Info (Shown only when Get in Touch is clicked) */}
              {showContact && (
                <div className={styles.contactInfo}>
                  <p>📧 Email: cartify.professinal@gmail.com</p>
                  <p>📞 Call/Text: 9448200330</p>
                  <p>🌐 Github: <a href="https://github.com/Aakashchoudhary24/cartify.git" target="_blank" rel="noopener noreferrer">https://github.com/Aakashchoudhary24/cartify.git</a></p>
                  <p>🔗 LinkedIn: <a href="" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className={styles.whyChooseUs}>
          <h2 className={styles.heading}>Why choose us</h2>
          <p className={styles.subHeading}>
            Discover why we stand out in the fashion industry. Our expertise, quality, and commitment make us the perfect choice.
          </p>
          <div className={styles.cards}>
            <div className={styles.card}>
              <span className={styles.icon}>🌟</span>
              <h3>Quality Materials</h3>
              <p>We use the finest fabrics to ensure premium comfort and durability.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.icon}>🎨</span>
              <h3>Unique Designs</h3>
              <p>Our designers create trendy and timeless fashion pieces for every occasion.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.icon}>💬</span>
              <h3>Customer Satisfaction</h3>
              <p>We prioritize customer experience and offer outstanding service and support.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.icon}>🌍</span>
              <h3>Sustainability</h3>
              <p>We embrace eco-friendly practices to create sustainable fashion.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
