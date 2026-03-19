"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Newest");

  const sortOptions = [
    "Newest",
    "Price: Low to High",
    "Price: High to Low",
    "Trending",
  ];

  const products = [
    { 
      id: 1, 
      name: "Apex Pro V2", 
      category: "ROAD RUNNING", 
      price: "$145.00",
      oldPrice: "$160.00",
      badge: "SALE",
      badgeColor: "bg-[#FF5E1F]",
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: 2, 
      name: "Cloud Runner Elite", 
      category: "ROAD RUNNING", 
      price: "$160.00",
      rating: 5.0,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: 3, 
      name: "Trail Surge X", 
      category: "TRAIL RUNNING", 
      price: "$195.00", 
      badge: "NEW",
      badgeColor: "bg-black",
      rating: 4.7,
      reviews: 42,
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: 4, 
      name: "Volt Glide 3", 
      category: "TRACK & FIELD", 
      price: "$120.00", 
      oldPrice: "$155.00",
      rating: 4.5,
      reviews: 210,
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: 5, 
      name: "Hyper Track S1", 
      category: "TRACK & FIELD", 
      price: "$210.00",
      rating: 4.9,
      reviews: 56,
      image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: 6, 
      name: "Gravity Flux V1", 
      category: "COMFORT DAILY", 
      price: "$135.00",
      rating: 4.6,
      reviews: 188,
      image: "https://images.unsplash.com/photo-1512374382149-4332c6c021f1?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: 7, 
      name: "Nebula React 9", 
      category: "ROAD RUNNING", 
      price: "$175.00",
      rating: 4.4,
      reviews: 72,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: 8, 
      name: "Terra Trail", 
      category: "TRAIL RUNNING", 
      price: "$140.00",
      rating: 4.3,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: 9, 
      name: "Summit Seeker", 
      category: "ELITE MARATHON", 
      price: "$250.00",
      badge: "NEW",
      badgeColor: "bg-black",
      rating: 4.9,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: 10, 
      name: "Zenith Comfort", 
      category: "COMFORT DAILY", 
      price: "$115.00",
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: 11, 
      name: "Phantom Carbon", 
      category: "ELITE MARATHON", 
      price: "$280.00",
      badge: "HOT",
      badgeColor: "bg-[#FF5E1F]",
      rating: 5.0,
      reviews: 94,
      image: "https://images.unsplash.com/photo-1515955656352-a1fb3d874a7b?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: 12, 
      name: "Aero Glide", 
      category: "ROAD RUNNING", 
      price: "$130.00",
      rating: 4.5,
      reviews: 68,
      image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=800" 
    }
  ];


  return (
    <main className="min-h-screen bg-white text-[#1A2E35] pt-28 pb-20">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex gap-12">
        
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-72 shrink-0 space-y-10">
          {/* Sort By (Custom Dropdown to match screenshot) */}
          <div className="space-y-4">
            <h5 className="font-black uppercase tracking-widest text-[11px] text-neutral-400">Sort By</h5>
            <div className="relative">
              <div 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full bg-white border-2 border-black rounded-2xl py-3.5 px-5 text-[15px] font-bold flex items-center justify-between cursor-pointer hover:border-[#FF5E1F] transition-colors"
              >
                <span>{sortBy}</span>
                <svg className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
              
              {/* Custom Menu */}
              {isSortOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                  {sortOptions.map((option) => (
                    <div 
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortOpen(false);
                      }}
                      className={`px-4 py-2.5 text-[14px] cursor-pointer transition-colors border-b border-neutral-100 last:border-0 italic ${
                        sortBy === option 
                        ? 'bg-[#1D63D2] text-white font-bold' 
                        : 'hover:bg-neutral-50 text-neutral-700 font-medium'
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>


          {/* Price Range */}
          <div className="space-y-6">
            <h5 className="font-black uppercase tracking-widest text-[11px] text-neutral-400">Price Range</h5>
            <div className="px-2">
              <div className="relative h-1 bg-neutral-100 rounded-full">
                <div className="absolute h-full w-2/3 bg-[#FF5E1F] rounded-full left-0"></div>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 bg-[#FF5E1F] rounded-full border-2 border-white shadow-md cursor-pointer"></div>
                <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-4 h-4 bg-[#FF5E1F] rounded-full border-2 border-white shadow-md cursor-pointer"></div>
              </div>
              <div className="flex justify-between mt-4 text-[13px] font-bold text-neutral-400">
                <span>$0</span>
                <span className="text-[#1A2E35]">$300+</span>
              </div>
            </div>
          </div>

          {/* Shoe Size */}
          <div className="space-y-4">
            <h5 className="font-black uppercase tracking-widest text-[11px] text-neutral-400">Shoe Size (EU)</h5>
            <div className="grid grid-cols-4 gap-2">
              {['39', '40', '41', '42', '43', '44', '45'].map((size) => (
                <button key={size} className={`h-10 rounded-lg text-[13px] font-bold border transition-all ${size === '40' ? 'border-[#FF5E1F] bg-[#FF5E1F]/5 text-[#FF5E1F]' : 'border-neutral-100 bg-[#F9FAFB] text-[#1A2E35] hover:border-neutral-300'}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-4">
            <h5 className="font-black uppercase tracking-widest text-[11px] text-neutral-400">Colors</h5>
            <div className="flex gap-3">
              {[
                { hex: '#FF5E1F', active: true },
                { hex: '#3B82F6', active: false },
                { hex: '#111111', active: false },
                { hex: '#10B981', active: false },
                { hex: '#FFFFFF', active: false }
              ].map((color, idx) => (
                <div key={idx} className={`w-7 h-7 rounded-full cursor-pointer ring-offset-2 transition-all ${color.active ? 'ring-2 ring-orange-500' : 'ring-1 ring-neutral-200'}`} style={{ backgroundColor: color.hex }}></div>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div className="space-y-4">
            <h5 className="font-black uppercase tracking-widest text-[11px] text-neutral-400">Brand</h5>
            <div className="space-y-3">
              {['Nike', 'Adidas', 'Puma', 'Brooks', 'Hoka'].map((brand) => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded border-neutral-300 accent-[#FF5E1F] focus:ring-orange-500/20 cursor-pointer" />
                  <span className="text-sm font-bold text-neutral-500 group-hover:text-[#1A2E35] transition-colors">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-4">
            <h5 className="font-black uppercase tracking-widest text-[11px] text-neutral-400">Category</h5>
            <div className="space-y-3">
              {['Road Running', 'Trail Running', 'Track & Field'].map((cat, idx) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked={idx === 0} className="w-5 h-5 rounded border-neutral-300 accent-[#FF5E1F] focus:ring-orange-500/20 cursor-pointer" />
                  <span className="text-sm font-bold text-neutral-500 group-hover:text-[#1A2E35] transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>


        {/* Product Listing Content */}
        <section className="flex-grow">
          <div className="mb-10">
            <h1 className="text-[34px] font-black italic uppercase tracking-tighter leading-none text-[#1A2E35]">
              MEN'S PERFORMANCE
            </h1>
            <p className="text-neutral-400 font-bold text-sm mt-2">24 models found</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More */}
          <div className="mt-24 flex justify-center">
            <button className="flex items-center gap-3 px-12 py-5 border-2 border-[#FF5E1F] text-[#FF5E1F] rounded-full font-black uppercase tracking-widest text-[13px] hover:bg-[#FF5E1F] hover:text-white transition-all active:scale-95 group">
              LOAD MORE GEAR
              <svg className="group-hover:translate-y-1 transition-transform" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}


