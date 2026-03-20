"use client";

import Image from "next/image";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";


export default function Home() {
  const eliteSelection = products.slice(-4);



  return (
    <main className="min-h-screen bg-white text-neutral-900 pt-20">
      {/* Hero Section */}
      <section className="px-6 py-10 md:py-16 max-w-screen-2xl mx-auto">
        <div className="relative min-h-[600px] rounded-[40px] overflow-hidden flex items-center">
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

      {/* Category Navigation */}
      <section className="px-6 md:px-12 py-12 max-w-screen-2xl mx-auto overflow-x-auto no-scrollbar">
      <div className="flex justify-center items-center gap-12 md:gap-24 px-10">

          {[
            { id: 'ROAD', active: true, color: 'bg-[#1A2E35]', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200' },
            { id: 'TRAIL', active: false, color: 'bg-[#F2F5F7]', img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=200' },
            { id: 'TRACK & FIELD', active: false, color: 'bg-[#F2F5F7]', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=200' }
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

      {/* Elite Selection Section */}
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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Join The Velocity Club */}
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
    </main>
  );
}

