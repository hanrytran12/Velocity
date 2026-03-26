"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm py-3' : 'bg-[#F2F5F7]/50 backdrop-blur-sm py-5'}`}>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer shrink-0">
          <div className="w-10 h-10 bg-[#FF5E1F] rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 3L4 14H11L11 21L20 10H13V3Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-xl font-black tracking-tighter uppercase text-[#1A2E35]">VELOCITY</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-10 whitespace-nowrap">
          <Link href="/products" className="text-[14px] font-bold text-[#1A2E35] hover:text-[#FF5E1F] transition-colors uppercase tracking-tight">
            Category
          </Link>
          <Link href="/products" className="text-[14px] font-bold text-[#1A2E35] hover:text-[#FF5E1F] transition-colors uppercase tracking-tight">
            New Arrivals
          </Link>
          <Link href="/products" className="text-[14px] font-bold text-[#FF5E1F] hover:text-orange-600 transition-colors uppercase tracking-tight">
            Sale
          </Link>
        </div>


        {/* Search Bar */}
        <div className="hidden md:flex flex-grow max-w-xl mx-4 relative">
          <div className="w-full relative">
            <input 
              type="text" 
              placeholder="Search performance gear..." 
              className="w-full bg-[#F3F4F6] border-none rounded-full py-3.5 pl-14 pr-6 text-sm font-medium focus:ring-2 focus:ring-orange-500/10 transition-all placeholder:text-neutral-400"
            />
            <svg className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>


        {/* Right Icons */}
        <div className="flex items-center gap-6 shrink-0 text-[#6B7280]">
          <Link href="/cart" className="relative cursor-pointer text-neutral-700 hover:text-orange-500 transition-all p-2 rounded-full hover:bg-neutral-50 active:scale-95">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"></path>
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-[#FF5E1F] text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in-50 duration-300">
                {totalItems}
              </span>
            )}
          </Link>
          
          <Link href="/login" className="text-neutral-700 hover:text-orange-500 transition-all p-2 rounded-full hover:bg-neutral-50 active:scale-95">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
