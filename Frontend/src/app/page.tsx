"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const eliteSelection = [
    { 
      id: 1, 
      name: "Apex Ghost V4 Pro", 
      category: "ROAD RUNNING", 
      price: "$189.99",
      oldPrice: "$220.00",
      badge: "HOT DEAL",
      badgeColor: "bg-[#FF5E1F]",
      categoryColor: "text-[#FF5E1F]",
      swatches: ["#FF5E1F", "#3B82F6", "#111111"],
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: 2, 
      name: "Summit Seeker X", 
      category: "TRAIL EXPLORER", 
      price: "$145.00",
      swatches: ["#3B82F6", "#10B981"],
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: 3, 
      name: "Phantom Elite Carbon", 
      category: "ELITE MARATHON", 
      price: "$275.00", 
      badge: "NEW",
      badgeColor: "bg-[#111111]",
      swatches: ["#111111"],
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: 4, 
      name: "Velocity Spike V2", 
      category: "TRACK & FIELD", 
      price: "$120.00", 
      swatches: ["#111111"],
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800" 
    },
  ];

  return (
    <main className="min-h-screen bg-white text-neutral-900 selection:bg-orange-500 selection:text-white pt-20">
      {/* Header / Navigation Bar (Matched to design) */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm py-3' : 'bg-[#F2F5F7]/50 backdrop-blur-sm py-5'}`}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer shrink-0">
            <div className="w-10 h-10 bg-[#FF5E1F] rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 3L4 14H11L11 21L20 10H13V3Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-[#1A2E35]">VELOCITY</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-10 whitespace-nowrap">
            {['Category', 'New Arrivals'].map((item) => (
              <a key={item} href="#" className="text-[14px] font-bold text-[#1A2E35] hover:text-orange-500 transition-colors uppercase tracking-tight">
                {item}
              </a>
            ))}
            <a href="#" className="text-[14px] font-bold text-[#FF5E1F] hover:text-orange-600 transition-colors uppercase tracking-tight">
              Sale
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-grow max-w-xl mx-4 relative">
            <div className="w-full relative">
              <input 
                type="text" 
                placeholder="Search elite gear..." 
                className="w-full bg-[#F2F5F7] border-none rounded-full py-3.5 pl-14 pr-6 text-sm font-medium focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-neutral-400"
              />
              <svg className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-8 shrink-0 text-[#6B7280]">
            <div className="relative cursor-pointer hover:text-[#1A2E35] transition-colors">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"></path>
              </svg>
              <span className="absolute -top-1 -right-1 bg-[#FF5E1F] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </div>
            
            <div className="cursor-pointer hover:text-[#1A2E35] transition-colors">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section (Matched to Card Style Screenshot) */}
      <section className="px-6 py-10 md:py-16 max-w-screen-2xl mx-auto">
        <div className="relative min-h-[600px] rounded-[40px] overflow-hidden flex items-center">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=1600" 
              alt="Elite Runner Background"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>

          <div className="relative z-10 px-12 md:px-20 py-20 max-w-3xl space-y-8">
            <div className="bg-[#FF5E1F] text-white px-3 py-1 rounded inline-block text-[10px] font-black uppercase tracking-wider">
              SUMMER SERIES 2024
            </div>
            
            <h1 className="text-6xl md:text-[90px] font-black uppercase tracking-tighter leading-[0.85] italic text-white">
              PUSH YOUR<br />
              <span className="text-[#FF5E1F]">LIMITS.</span>
            </h1>
            
            <p className="max-w-md text-neutral-300 text-lg md:text-xl font-medium leading-relaxed">
              Engineered for speed. Built for endurance. Experience the revolutionary carbon-plate technology of the new Apex Pro.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-[#FF5E1F] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[13px] transition-all hover:bg-white hover:text-[#FF5E1F] shadow-2xl shadow-orange-500/20">
                Shop The Collection
              </button>
              <button className="bg-black/20 backdrop-blur-md border border-white/30 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[13px] transition-all hover:bg-white/10">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation (Circular Style) */}
      <section className="px-6 md:px-12 py-12 max-w-screen-2xl mx-auto overflow-x-auto no-scrollbar">
        <div className="flex justify-between items-center min-w-[600px] md:min-w-0 md:px-20">
          {[
            { id: 'ROAD', active: true, color: 'bg-[#1A2E35]', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200' },
            { id: 'TRAIL', active: false, color: 'bg-[#F2F5F7]', img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=200' },
            { id: 'MARATHON', active: false, color: 'bg-[#F2F5F7]', img: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=200' },
            { id: 'SPRINTING', active: false, color: 'bg-[#F2F5F7]', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=200' },
            { id: 'COMFORT', active: false, color: 'bg-[#F2F5F7]', img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=200' }
          ].map((cat) => (
            <div key={cat.id} className="flex flex-col items-center gap-4 group cursor-pointer">
              <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all ${
                cat.active ? 'ring-4 ring-orange-500 ring-offset-4 shadow-xl' : 'hover:scale-105 ring-1 ring-neutral-200 ring-offset-2'
              } ${cat.color}`}>
                <div className="w-full h-full rounded-full overflow-hidden">
                   <Image 
                     src={cat.img} 
                     alt={cat.id}
                     width={100}
                     height={100}
                     className="object-cover w-full h-full rounded-full transition-transform duration-500 group-hover:scale-110"
                   />
                </div>
              </div>
              <span className={`text-[13px] font-black uppercase tracking-widest ${cat.active ? 'text-[#1A2E35]' : 'text-neutral-400 group-hover:text-[#1A2E35]'}`}>
                {cat.id}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Elite Selection Section (Matched to Image) */}
      <section className="px-6 md:px-12 py-24 max-w-screen-2xl mx-auto border-t border-neutral-100">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-16 gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none">ELITE SELECTION</h2>
            <p className="text-neutral-400 font-bold text-sm">Showing 12 high-performance models</p>
          </div>
          
          <div className="flex items-center gap-4 self-end md:self-auto">
            <button className="flex items-center gap-2 px-6 h-12 bg-[#F5F5F7] hover:bg-neutral-200 rounded-xl text-[13px] font-bold transition-colors whitespace-nowrap">
               <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
               Filters
            </button>
            <button className="flex items-center justify-between gap-6 px-6 h-12 bg-[#F5F5F7] hover:bg-neutral-200 rounded-xl text-[13px] font-bold transition-colors whitespace-nowrap">
               <span>Sort by: Newest</span>
               <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M19 9l-7 7-7-7"/></svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {eliteSelection.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-square bg-[#F5F5F7] rounded-xl mb-5 overflow-hidden flex items-center justify-center">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  width={600}
                  height={600}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                
                {/* Badge (HOT DEAL / NEW) */}
                {product.badge && (
                  <div className={`absolute top-4 left-4 ${product.badgeColor} text-white text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider`}>
                    {product.badge}
                  </div>
                )}

                {/* Heart Icon */}
                <button className="absolute top-4 right-4 bg-white text-neutral-900 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all group-hover:scale-110">
                  <svg width="18" height="18" fill={product.id === 3 ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              <div className="relative">
                <div className="space-y-1">
                  <p className={`text-[10px] font-black uppercase tracking-[0.1em] ${product.categoryColor || 'text-neutral-400'}`}>
                    {product.category}
                  </p>
                  <h3 className="font-black text-[17px] uppercase tracking-tight">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-[16px]">{product.price}</span>
                    {product.oldPrice && (
                      <span className="text-neutral-400 text-[13px] line-through font-bold">{product.oldPrice}</span>
                    )}
                  </div>
                </div>

                {/* Swatches at bottom right of text zone */}
                <div className="absolute bottom-1 right-0 flex gap-1.5">
                  {product.swatches?.map((color, idx) => (
                    <div key={idx} className="w-2.5 h-2.5 rounded-full ring-1 ring-neutral-200" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join The Velocity Club (Matched to Orange Screenshot) */}
      <section className="px-6 md:px-12 py-24 max-w-screen-2xl mx-auto">
        <div className="bg-[#FF5E1F] p-12 md:p-20 rounded-[40px] flex flex-col md:flex-row items-center gap-10 relative overflow-hidden min-h-[500px]">
          <div className="md:w-1/2 space-y-10 relative z-10 text-white">
            <h2 className="text-6xl md:text-[80px] font-black uppercase tracking-tighter leading-[0.85] italic">
              Join The<br />Velocity Club
            </h2>
            <p className="max-w-md text-white/90 text-lg font-medium leading-relaxed">
              Sign up for early access to limited edition drops, training tips from elite coaches, and 15% off your first pair.
            </p>
            
            <div className="relative max-w-md">
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full p-1.5 border border-white/30">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-transparent text-white px-6 py-3 flex-grow font-bold placeholder:text-white/60 focus:outline-none"
                  required
                />
                <button className="bg-white text-[#FF5E1F] px-8 py-3.5 rounded-full font-black uppercase tracking-widest text-[13px] hover:bg-neutral-100 transition-all shadow-xl">
                  Join Now
                </button>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 w-full relative h-[400px] flex items-center justify-center translate-x-12">
            <Image 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200" 
              alt="Velocity Running Shoe Orange Edition"
              width={1000}
              height={1000}
              className="object-contain w-full h-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)] rotate-[-15deg] scale-125 translate-y-4"
            />
          </div>
        </div>
      </section>

      {/* Footer (Polished) */}
      <footer className="bg-white border-t border-neutral-100 mt-20 pt-24 pb-12">
        <div className="px-6 md:px-12 max-w-screen-2xl mx-auto flex flex-col gap-20">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
            <div className="col-span-2 space-y-8">
              <div className="text-3xl font-black tracking-tighter uppercase flex items-center gap-1 italic">
                <div className="w-10 h-10 bg-orange-500 rounded-sm flex items-center justify-center text-white italic">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h10L11 22l2-10H3l10-10Z"/></svg>
                </div>
                <span>Velocity</span>
              </div>
              <p className="text-neutral-500 font-medium text-lg leading-relaxed max-w-xs">
                 Fueling your ambition with world-class performance gear since 2018. Run faster, run longer.
              </p>
            </div>

            <div className="space-y-6">
              <h5 className="font-black uppercase tracking-widest text-[11px] text-neutral-400">Shop</h5>
              <ul className="space-y-4 font-bold text-sm">
                <li><a href="#" className="hover:text-orange-500 transition-colors uppercase italic">Road Shoes</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors uppercase italic">Trail Shoes</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors uppercase italic">Race Day</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors uppercase italic">Accessories</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="font-black uppercase tracking-widest text-[11px] text-neutral-400">Support</h5>
              <ul className="space-y-4 font-bold text-sm">
                <li><a href="#" className="hover:text-orange-500 transition-colors uppercase italic">Order Status</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors uppercase italic">Shipping</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors uppercase italic">Returns</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors uppercase italic">Contact Us</a></li>
              </ul>
            </div>

            <div className="col-span-2 space-y-6">
              <h5 className="font-black uppercase tracking-widest text-[11px] text-neutral-400">Follow Us</h5>
              <div className="flex gap-4">
                {[
                  { id: 'share', path: <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /> },
                  { id: 'public', path: <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /> },
                  { id: 'alternate_email', path: <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /> }
                ].map((icon) => (
                  <a key={icon.id} href="#" className="w-12 h-12 rounded-full bg-[#E8EEF5] flex items-center justify-center text-neutral-900 hover:bg-orange-500 hover:text-white transition-all">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      {icon.path}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 text-center md:text-left italic">
            <p>© 2024 Velocity Elite Gear. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-orange-500 transition-colors uppercase">Privacy Policy</a>
              <a href="#" className="hover:text-orange-500 transition-colors uppercase">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
