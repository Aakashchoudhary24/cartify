"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/navbar/page';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';


const CartifyHomepage: React.FC = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#424874] text-white"> 
      <Navbar/>
      <motion.div 
        className="text-center mt-12 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div 
          className="inline-block px-4 py-2 rounded-full border border-[#A6B1E1] text-sm mb-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          New spring collection 2025
        </motion.div>
        
        <motion.h1 
          className="text-5xl font-bold mb-4 max-w-4xl mx-auto leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Where style speaks, trends resonate, fashion flourishes
        </motion.h1>
        
        <motion.p 
          className="text-[#DCD6F7] max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Unveiling a fashion destination where trends blend seamlessly with your 
          individual style aspirations. Discover today!
        </motion.p>
        
        <motion.button 
          className="bg-white text-[#424874] px-8 py-3 rounded-full inline-flex items-center hover:bg-[#A6B1E1] hover:text-white transition duration-300"
          initial={{ opacity: 0, y: 30 }}

          onClick={() => router.push('/products')}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          New collection
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </motion.div>
      
      {/* Product Carousel */}
      <div className="mt-20 relative overflow-hidden pb-5">
        <div className="flex justify-center items-center gap-4 px-8">
          
          {/* Product Cards */}
          <motion.div 
            className="w-1/5 aspect-[3/4] mt-10 rounded-full overflow-hidden relative group shadow-black shadow-sm"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="relative w-full h-full">
              <Image 
                src="/images/Homepage1.jpg" 
                alt="Fashion item" 
                fill
                className="object-cover" 
                unoptimized
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="w-1/5 aspect-[3/4] mt-5 rounded-full overflow-hidden relative group shadow-black shadow-md"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="relative w-full h-full">
              <Image 
                src="/images/Homepage2.jpg" 
                alt="Fashion item" 
                fill
                className="object-cover" 
                unoptimized
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="w-1/5 aspect-[3/4] rounded-full overflow-hidden relative group shadow-black shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="relative w-full h-full">
              <Image 
                src="/images/Homepage3.jpg" 
                alt="Fashion item" 
                fill
                className="object-cover" 
                unoptimized
              />
            </div>
            <motion.div 
              className="absolute bottom-12 left-0 right-0 text-center bg-[#DCD6F7] p-2 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <p className="text-sm font-medium text-[#424874]">Starting From</p>
              <p className="text-xl font-bold text-[#424874]">₹1899</p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="w-1/5 aspect-[3/4] mt-5 rounded-full overflow-hidden relative group shadow-black shadow-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="relative w-full h-full">
              <Image 
                src="/images/Homepage4.jpg" 
                alt="Fashion item" 
                fill
                className="object-cover" 
                unoptimized
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="w-1/5 aspect-[3/4] mt-10 rounded-full overflow-hidden relative group shadow-black shadow-sm"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="relative w-full h-full">
              <Image 
                src="/images/Homepage5.jpg" 
                alt="Fashion item" 
                fill
                className="object-cover" 
                unoptimized
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartifyHomepage;