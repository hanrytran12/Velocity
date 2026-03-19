"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState("42");
  const [selectedColor, setSelectedColor] = useState("Orange");

  // Mock product data based on design
  const product = {
    id: params.id,
    name: "Apex Ghost V4 Pro",
    category: "ROAD RUNNING",
    price: "$189.91",
    oldPrice: "$220.00",
    description: "Engineered for elite performance, the Apex Ghost V4 Pro combines ultra-lightweight carbon fiber plate technology with our signature cloud-burst cushioning for explosive energy return.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800"
    ],
    features: [
      { title: "Carbon-Fiber Plate", description: "Full-length plate delivers snappier toe-offs and increased propulsion." },
      { title: "Energy Return", description: "Cloud-burst foam provides 85% energy return with every stride." },
      { title: "Breathable Mesh", description: "Engineered upper keeps feet cool during long distance runs." }
    ],
    specs: [
      { label: "Stack Height", value: "8 mm Drop" },
      { label: "Outsole Pattern", value: "Performance Traction Grid" },
      { label: "Upper Material", value: "Engineered Mesh / TPU" },
      { label: "Surface Layer", value: "Road / Track" },
      { label: "Best For", value: "Racing & Training" },
      { label: "Sport", value: "Performance Running" },
      { label: "Technology", value: "AEROFRAME+™, V-PRO PLATE" },
      { label: "Key Features", value: "Cushioning, Propulsion, Feather-light" },
      { label: "Fastening", value: "Traditional Laces" },
      { label: "Collar", value: "Low-cut" },
      { label: "Fit", value: "Regular Fit" }
    ]
  };

  const relatedProducts = [
    { id: 2, name: "Cloud Runner Elite", category: "ROAD RUNNING", price: "$160.00", rating: 5.0, reviews: 89, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800" },
    { id: 3, name: "Trail Surge X", category: "TRAIL RUNNING", price: "$195.00", badge: "NEW", badgeColor: "bg-black", rating: 4.7, reviews: 42, image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800" },
    { id: 11, name: "Phantom Carbon", category: "ELITE MARATHON", price: "$280.00", badge: "HOT", badgeColor: "bg-[#FF5E1F]", rating: 5.0, reviews: 94, image: "https://images.unsplash.com/photo-1515955656352-a1fb3d874a7b?auto=format&fit=crop&q=80&w=800" },
    { id: 12, name: "Aero Glide", category: "ROAD RUNNING", price: "$130.00", rating: 4.5, reviews: 68, image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=800" }
  ];

  return (
    <main className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-neutral-400 mb-10">
          <Link href="/" className="hover:text-[#1A2E35] transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#1A2E35] transition-colors">SHOES</Link>
          <span>/</span>
          <span className="text-[#1A2E35] text-center w-full md:w-auto">{product.name}</span>
        </nav>

        {/* Product Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 mb-32">
          {/* Gallery */}
          <div className="space-y-6">
            <div className="aspect-[4/5] bg-[#F3F4F6] rounded-3xl overflow-hidden relative group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <button className="absolute top-6 right-6 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all transition-colors hover:text-[#FF5E1F]">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {product.gallery.map((img, idx) => (
                <div key={idx} className="aspect-square bg-[#F3F4F6] rounded-2xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                  <Image src={img} alt={`Gallery ${idx}`} width={300} height={300} className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8 space-y-4">
              <div className="flex items-center gap-4">
                <span className="bg-[#FF5E1F]/10 text-[#FF5E1F] px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest">NEW ARRIVAL</span>
                <div className="flex items-center gap-1.5 text-[#FF5E1F] text-[13px] font-black">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  <span>4.9 (128 Reviews)</span>
                </div>
              </div>
              <h1 className="text-[56px] md:text-[64px] font-black italic uppercase tracking-tighter leading-[0.85] text-[#1A2E35]">
                {product.name}
              </h1>
              <p className="text-neutral-400 font-bold text-lg tracking-tight uppercase">Ultimate Response Road Performance</p>
              <div className="pt-4">
                <span className="text-[48px] font-black text-[#FF5E1F] leading-none tracking-tighter tracking-tight">$185.00</span>
              </div>
            </div>

            {/* Selection */}
            <div className="space-y-10 mb-12">
              <div className="space-y-6">
                <h5 className="font-black uppercase tracking-[0.15em] text-[11px] text-neutral-400">SELECT COLOR: <span className="text-[#1A2E35]">SOLAR ORANGE</span></h5>
                <div className="flex gap-6">
                  {[
                    { name: 'Orange', hex: '#FF5E1F' },
                    { name: 'Black', hex: '#111111' },
                    { name: 'Blue', hex: '#3B82F6' },
                    { name: 'White', hex: '#FFFFFF' }
                  ].map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className="flex flex-col items-center group"
                    >
                      <div className={`w-12 h-12 rounded-full border-2 p-[4px] transition-all transform duration-300 ${selectedColor === color.name ? 'border-[#FF5E1F] scale-110 shadow-lg shadow-orange-500/20' : 'border-neutral-100 hover:border-neutral-300'}`}>
                        <div className="w-full h-full rounded-full border border-black/5" style={{ backgroundColor: color.hex }}></div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <h5 className="font-black uppercase tracking-[0.15em] text-[11px] text-neutral-400">SELECT SIZE (US)</h5>
                  <button className="text-[11px] font-black uppercase tracking-widest text-[#FF5E1F] border-b-2 border-[#FF5E1F] leading-none pb-0.5">Size Guide</button>
                </div>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                  {['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-14 rounded-xl text-[16px] font-black transition-all ${selectedSize === size ? 'bg-[#FF5E1F] text-white shadow-lg shadow-orange-500/20' : size === '13' ? 'bg-[#F9FAFB] text-neutral-200 cursor-not-allowed' : 'bg-[#F9FAFB] text-[#1A2E35] hover:bg-neutral-100'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mb-10">
              <button className="w-full bg-[#FF5E1F] text-white h-16 rounded-[14px] font-black uppercase tracking-widest text-[15px] hover:bg-[#E64D13] transition-all active:scale-[0.98] shadow-xl shadow-orange-500/20 flex items-center justify-center gap-3">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" /></svg>
                ADD TO CART
              </button>
            </div>


            {/* Benefits */}
            <div className="flex gap-8 border-t border-neutral-100 pt-8">
              <div className="flex items-center gap-2.5 text-neutral-400 font-black uppercase tracking-widest text-[11px]">
                <svg className="text-[#FF5E1F]" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20 8l-3-3H4v10h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-7l-3-3zM9 19c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm11 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" /></svg>
                FREE SHIPPING
              </div>
              <div className="flex items-center gap-2.5 text-neutral-400 font-black uppercase tracking-widest text-[11px]">
                <svg className="text-[#FF5E1F]" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
                7-DAY RETURNS
              </div>
            </div>
          </div>
        </div>


        {/* Product Details Section */}
        <section className="mb-32">
          <h2 className="text-[32px] font-black italic uppercase tracking-tighter text-[#1A2E35] leading-none mb-12">
            PRODUCT DETAILS
          </h2>


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-32 items-start animate-in fade-in duration-700">
            <div className="space-y-10">
              <p className="text-neutral-500 font-medium text-lg leading-relaxed">
                The {product.name} is engineered for athletes who demand maximum energy return and premium cushioning. Featuring our proprietary AeroFoam+ midsole, it provides a responsive feel that propels you forward with every stride.
              </p>

              <div className="space-y-5">
                {[
                  "Engineered mesh upper for breathable support",
                  "Carbon fiber propulsion plate",
                  "High-abrasion rubber outsole for grip",
                  "Weight: 8.4 oz (Men's size 9)"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-5 h-5 bg-[#FF5E1F] rounded-full flex items-center justify-center text-white">
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-neutral-600 font-bold text-[15px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specs Table */}
            <div className="bg-white border-t border-x border-neutral-100 rounded-lg overflow-hidden shadow-sm">
              {product.specs.map((row, idx) => (
                <div key={idx} className="grid grid-cols-5 border-b border-neutral-100">
                  <div className="col-span-2 bg-[#F9FAFB] p-4 text-[12px] font-black uppercase tracking-widest text-[#1A2E35] flex items-center">
                    {row.label}
                  </div>
                  <div className="col-span-3 p-4 text-[14px] font-bold text-neutral-500 italic flex items-center bg-white">
                    {row.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="space-y-8">
              <h2 className="text-[32px] font-black italic uppercase tracking-tighter text-[#1A2E35] leading-none mb-4">CUSTOMER REVIEWS</h2>
              <div className="flex items-center gap-4">
                <span className="text-6xl font-black italic text-[#FF5E1F]">4.8</span>
                <div>
                  <div className="flex text-[#FF5E1F]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="20" height="20" fill={s <= 4 ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    ))}
                  </div>
                  <p className="text-sm font-bold text-neutral-400 mt-1">Based on 124 reviews</p>
                </div>
              </div>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-4">
                    <span className="text-xs font-black text-neutral-400 w-4">{star}</span>
                    <div className="flex-grow h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF5E1F]" style={{ width: star === 5 ? '85%' : star === 4 ? '10%' : '2%' }}></div>
                    </div>
                    <span className="text-xs font-bold text-neutral-400 w-8">{star === 5 ? '85%' : star === 4 ? '10%' : '2%'}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-12">
              {[
                { name: "John D.", date: "March 15, 2024", comment: "The best running shoe I've ever owned. The energy return is incredible!", rating: 5 },
                { name: "Sarah M.", date: "March 10, 2024", comment: "Perfect for marathon training. Lightweight yet supportive.", rating: 5 }
              ].map((review, idx) => (
                <div key={idx} className="space-y-4 pb-8 border-b border-neutral-100 last:border-0">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center font-black text-neutral-400">{review.name[0]}</div>
                      <div>
                        <h4 className="font-bold text-[#1A2E35]">{review.name}</h4>
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex text-[#FF5E1F]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg key={s} width="16" height="16" fill={s <= review.rating ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-neutral-500 font-medium leading-relaxed">{review.comment}</p>
                </div>
              ))}
              <button className="text-[13px] font-black uppercase tracking-widest text-[#FF5E1F] hover:translate-x-2 transition-transform">LOAD MORE REVIEWS →</button>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section>
          <div className="flex items-end justify-between mb-16 px-2">
            <div>
              <h2 className="text-[32px] font-black italic uppercase tracking-tighter text-[#1A2E35] leading-none mb-3">YOU MIGHT ALSO LIKE</h2>
              <p className="text-neutral-400 font-bold text-sm">Explore more performance gear</p>
            </div>
            <Link href="/products" className="text-[13px] font-black uppercase tracking-widest text-[#FF5E1F] hover:translate-x-2 transition-transform">VIEW ALL SHOES →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p as any} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
