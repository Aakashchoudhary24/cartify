"use client";

import { useState, useEffect } from "react";
import { request, gql } from "graphql-request";
import Navbar from "../components/Navbar";
import { useFetchGraphQL } from "@/hooks";
import styles from "../styles/about.module.css";

// Define TypeScript types
interface About {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

const ABOUT_QUERY = gql`
  query {
    about {
      email
      phone
      github
      linkedin
    }
  }
`;

export default function AboutPage() {
  
  const { data, loading, error } = useFetchGraphQL<{ about: About }>(ABOUT_QUERY);
  const about = data?.about;
  const [showContact, setShowContact] = useState<boolean>(false); // Toggle state

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>Error fetching about information: {error.message}</p>;

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
              {showContact && about && (
                <div className={styles.contactInfo}>
                  <p>📧 Email: {about.email}</p>
                  <p>📞 Call/Text: {about.phone}</p>
                  <p>🌐 Github: <a href={about.github} target="_blank" rel="noopener noreferrer">{about.github}</a></p>
                  <p>🔗 LinkedIn: <a href={about.linkedin} target="_blank" rel="noopener noreferrer">{about.linkedin}</a></p>
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
