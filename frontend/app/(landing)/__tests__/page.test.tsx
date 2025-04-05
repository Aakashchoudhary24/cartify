import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom'; // Add this import to fix TypeScript errors
import CartifyHomepage from '../page';

// Mock the required Next.js components
vi.mock('next/image', () => ({
  default: ({ src, alt, className }: { src: string; alt: string; className: string }) => (
    <img src={src} alt={alt} className={className} data-testid="next-image" />
  )
}));

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="next-link">{children}</a>
  )
}));

// Mock framer-motion since we just want to test content, not animations
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: { children: React.ReactNode; className: string }) => (
      <div className={className} data-testid="framer-motion-div" {...props}>{children}</div>
    ),
    button: ({ children, className, ...props }: { children: React.ReactNode; className: string }) => (
      <button className={className} data-testid="framer-motion-button" {...props}>{children}</button>
    ),
    h1: ({ children, className, ...props }: { children: React.ReactNode; className: string }) => (
      <h1 className={className} data-testid="framer-motion-h1" {...props}>{children}</h1>
    ),
    p: ({ children, className, ...props }: { children: React.ReactNode; className: string }) => (
      <p className={className} data-testid="framer-motion-p" {...props}>{children}</p>
    ),
  }
}));

// Mock the Navbar component
vi.mock('../../components/Navbar', () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>
}));

describe('CartifyHomepage', () => {
  beforeEach(() => {
    // Reset any runtime request handlers we may add during the tests
    vi.clearAllMocks();
  });

  it('renders the navbar component', () => {
    render(<CartifyHomepage />);
    const navbar = screen.getByTestId('navbar');
    expect(navbar).toBeInTheDocument();
  });

  it('renders the main headline correctly', () => {
    render(<CartifyHomepage />);
    const headline = screen.getByText('Where style speaks, trends resonate, fashion flourishes');
    expect(headline).toBeInTheDocument();
  });

  it('renders the subheading text correctly', () => {
    render(<CartifyHomepage />);
    const subheading = screen.getByText(/Unveiling a fashion destination where trends blend/);
    expect(subheading).toBeInTheDocument();
  });

  it('displays the new collection button with correct text', () => {
    render(<CartifyHomepage />);
    const button = screen.getByText(/New collection/i);
    expect(button).toBeInTheDocument();
    
    const buttonContainer = button.closest('[data-testid="framer-motion-button"]');
    expect(buttonContainer).not.toBeNull();
    expect(buttonContainer).toHaveClass('bg-white');
    expect(buttonContainer).toHaveClass('text-[#424874]');
  });

  it('renders the new spring collection tag with proper styling', () => {
    render(<CartifyHomepage />);
    const collectionTag = screen.getByText('New spring collection 2025');
    expect(collectionTag).toBeInTheDocument();
    
    const tagContainer = collectionTag.closest('[data-testid="framer-motion-div"]');
    expect(tagContainer).not.toBeNull();
    expect(tagContainer).toHaveClass('inline-block');
    expect(tagContainer).toHaveClass('px-4');
    expect(tagContainer).toHaveClass('py-2');
    expect(tagContainer).toHaveClass('rounded-full');
    expect(tagContainer).toHaveClass('border');
    expect(tagContainer).toHaveClass('border-[#A6B1E1]');
  });

  it('renders the starting price information correctly', () => {
    render(<CartifyHomepage />);
    const startingFrom = screen.getByText('Starting From');
    const price = screen.getByText('₹1899');
    expect(startingFrom).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

  it('renders all 5 product images with correct alt text', () => {
    render(<CartifyHomepage />);
    const images = screen.getAllByAltText('Fashion item');
    expect(images.length).toBe(5);
  });

  it('has the correct background color for the page', () => {
    render(<CartifyHomepage />);
    // Get the main container div
    const headline = screen.getByText('Where style speaks, trends resonate, fashion flourishes');
    const mainContainer = headline.closest('div.min-h-screen');
    expect(mainContainer).not.toBeNull();
    expect(mainContainer).toHaveClass('bg-[#424874]');
  });

  it('properly structures the product carousel section', () => {
    render(<CartifyHomepage />);
    const carouselDivs = screen.getAllByTestId('framer-motion-div');
    const carouselSection = carouselDivs.find(div => 
      div.className.includes('aspect-[3/4]')
    );
    expect(carouselSection).toBeDefined();
  });
});