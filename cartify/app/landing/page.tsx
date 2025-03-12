import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';

const CartifyHomepage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#424874] text-white"> 
      <Navbar/>
      <div className="text-center mt-12 px-4">
        <div className="inline-block px-4 py-2 rounded-full border border-[#A6B1E1] text-sm mb-6 text-white">
          New spring collection 2025
        </div>
        
        <h1 className="text-5xl font-bold mb-4 max-w-4xl mx-auto leading-tight">
          Where style speaks, trends resonate, fashion flourishes
        </h1>
        
        <p className="text-[#DCD6F7] max-w-2xl mx-auto mb-8">
          Unveiling a fashion destination where trends blend seamlessly with your 
          individual style aspirations. Discover today!
        </p>
        
        <button className="bg-white text-[#424874] px-8 py-3 rounded-full inline-flex items-center hover:bg-[#A6B1E1] hover:text-white transition duration-300">
          New collection
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Product Carousel */}
      <div className="mt-20 relative overflow-hidden">
        <div className="flex justify-center items-center gap-4 px-8">
          {/* Navigation Arrows */}
          <button className="absolute left-4 z-10 bg-[#A6B1E1]/30 rounded-full p-2 hover:bg-[#A6B1E1] transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Product Cards */}
          <div className="w-1/5 aspect-[3/4] rounded-full overflow-hidden relative group border border-white">
            <div className="relative w-full h-full">
              <Image 
                src="/api/placeholder/350/450" 
                alt="Fashion item" 
                fill
                className="object-cover" 
              />
            </div>
          </div>
          
          <div className="w-1/5 aspect-[3/4] rounded-full overflow-hidden relative group border border-white">
            <div className="relative w-full h-full">
              <Image 
                src="/api/placeholder/350/450" 
                alt="Fashion item" 
                fill
                className="object-cover" 
              />
            </div>
          </div>
          
          <div className="w-1/5 aspect-[3/4] rounded-full overflow-hidden relative group border border-white">
            <div className="relative w-full h-full">
              <Image 
                src="/api/placeholder/350/450" 
                alt="Fashion item" 
                fill
                className="object-cover" 
              />
            </div>
            <div className="absolute bottom-12 left-0 right-0 text-center bg-[#DCD6F7] p-2 rounded-lg">
              <p className="text-sm font-medium text-[#424874]">Starting From</p>
              <p className="text-xl font-bold text-[#424874]">₹1899</p>
            </div>
          </div>
          
          <div className="w-1/5 aspect-[3/4] rounded-full overflow-hidden relative group border border-white">
            <div className="relative w-full h-full">
              <Image 
                src="/api/placeholder/350/450" 
                alt="Fashion item" 
                fill
                className="object-cover" 
              />
            </div>
          </div>
          
          <div className="w-1/5 aspect-[3/4] rounded-full overflow-hidden relative group border border-white">
            <div className="relative w-full h-full">
              <Image 
                src="/api/placeholder/350/450" 
                alt="Fashion item" 
                fill
                className="object-cover" 
              />
            </div>
          </div>
          
          <button className="absolute right-4 z-10 bg-[#A6B1E1]/30 rounded-full p-2 hover:bg-[#A6B1E1] transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartifyHomepage;
