"use client"; // Required for fetching data in the client-side

import { useState, useEffect } from "react";
import { request, gql } from 'graphql-request';
import '../styles/about.css';
import Navbar from "../components/Navbar";
import { useFetchGraphQL } from "@/hooks";

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

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching about information: {error.message}</p>;

  return (
    <div className="about-page">
      <Navbar />
      <div className="about">
        <h1>About Page</h1>
        {about && (
          <div>
            <p>Email: {about.email}</p>
            <p>Phone: {about.phone}</p>
            <p>
              GitHub:{" "}
              <a href={about.github} target="_blank" rel="noopener noreferrer">
                {about.github}
              </a>
            </p>
            <p>
              LinkedIn:{" "}
              <a href={about.linkedin} target="_blank" rel="noopener noreferrer">
                {about.linkedin}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}