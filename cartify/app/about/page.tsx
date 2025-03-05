"use client"; // Required for fetching data in the client-side

import { useState, useEffect } from "react";
import { request, gql } from 'graphql-request';
import '../styles/about.css';
import Navbar from "../components/Navbar";

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

function getCSRFToken() {
  const name = 'csrftoken=';
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name)) {
      return cookie.substring(name.length);
    }
  }
  return '';
}

export default function AboutPage() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchAbout() {
      setLoading(true);
      setError(null);
      
      try {
        const endpoint = "http://127.0.0.1:8000/graphql/";
        const headers = {
          'X-CSRFToken': getCSRFToken(),
        };
        
        const data = await request<{ about: About }>(endpoint, ABOUT_QUERY, {}, headers);
        setAbout(data.about);
      } catch (err) {
        console.error("Error fetching about information:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    }

    fetchAbout();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching about information: {error.message}</p>;

  return (
    <div className='about-page'>
      <Navbar />
      <div className="about">
        <h1>About page</h1>
        {about && (
          <div>
            <p>Email: {about.email}</p>
            <p>Phone: {about.phone}</p>
            <p>GitHub: <a href={about.github} target="_blank" rel="noopener noreferrer">{about.github}</a></p>
            <p>LinkedIn: <a href={about.linkedin} target="_blank" rel="noopener noreferrer">{about.linkedin}</a></p>
          </div>
        )}
      </div>
    </div>
  );
}