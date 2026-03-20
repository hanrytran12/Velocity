"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products, Product } from "@/data/products";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id);
  const product = products.find((p) => p.id === productId) || products[0];
  
  const [selectedSize, setSelectedSize] = useState("8.5");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Default");
  const [activeTab, setActiveTab] = useState<'details' | 'tech'>('details');

  const relatedProducts = products.filter((p) => p.id !== productId).slice(0, 4);

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
            {/* Main Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white mb-6 group cursor-zoom-in flex items-center justify-center p-8">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`aspect-square rounded-2xl overflow-hidden bg-white cursor-pointer border-2 transition-all p-2 flex items-center justify-center ${i === 1 ? 'border-[#FF5E1F]' : 'border-transparent hover:border-neutral-200'}`}>
                  <Image
                    src={product.image}
                    alt={`${product.name} view ${i}`}
                    width={150}
                    height={150}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8 space-y-4">
              <div className="flex items-center gap-4">
                <span className="bg-[#FF5E1F]/10 text-[#FF5E1F] px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest">{product.badge || "NEW ARRIVAL"}</span>
                <div className="flex items-center gap-1.5 text-[#FF5E1F] text-[13px] font-black">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  <span>{product.rating} ({product.reviews} Reviews)</span>
                </div>
              </div>
              <h1 className="text-[56px] md:text-[64px] font-black italic uppercase tracking-tighter leading-[0.85] text-[#1A2E35]">
                {product.name}
              </h1>
              <p className="text-neutral-400 font-bold text-lg tracking-tight uppercase">Ultimate Response {product.category} Performance</p>
              <div className="pt-4">
                <span className="text-[48px] font-black text-[#FF5E1F] leading-none tracking-tighter">{product.price}</span>
              </div>
            </div>

            {/* Selection */}
            <div className="space-y-10 mb-12">
              <div className="space-y-6">
                <h5 className="font-black uppercase tracking-[0.15em] text-[11px] text-neutral-400">SELECT COLOR: <span className="text-[#1A2E35]">{selectedColor.toUpperCase()}</span></h5>
                <div className="flex gap-6">
                  {product.colors.map((color) => (
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


        {/* Product Info Tabs */}
        <section className="mb-32">
          <div className="flex gap-12 border-b border-neutral-100 mb-12">
            {[
              { id: 'details', label: 'PRODUCT DETAILS' },
              { id: 'tech', label: 'TECHNOLOGY' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'details' | 'tech')}
                className={`pb-6 text-[14px] font-black tracking-[0.2em] transition-all relative ${
                  activeTab === tab.id ? 'text-[#1A2E35]' : 'text-neutral-300 hover:text-neutral-400'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF5E1F] animate-in slide-in-from-left duration-300"></div>
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-32 items-start animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-8">
              <div className="prose prose-neutral max-w-none">
                <p className="text-neutral-500 font-medium text-lg leading-relaxed">
                  {activeTab === 'details' ? product.details : product.technologyContent}
                </p>
                <p className="text-neutral-500 font-medium text-lg leading-relaxed mt-4">
                  {activeTab === 'details' ? product.description : "This cutting-edge integration ensures maximum efficiency, allowing you to push your limits with every stride."}
                </p>
              </div>
            </div>

            {/* Technical Specs Table - Always visible for quick reference */}
            <div className="bg-white border-t border-x border-neutral-100 rounded-2xl overflow-hidden shadow-2xl shadow-neutral-100/50">
              <div className="px-6 py-4 bg-[#F9FAFB] border-b border-neutral-100 flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-widest text-neutral-400">Core Specifications</span>
                <div className="w-2 h-2 rounded-full bg-[#FF5E1F]"></div>
              </div>
              {product.specs.map((row, idx) => (
                <div key={idx} className="grid grid-cols-5 border-b border-neutral-100 last:border-0 group">
                  <div className="col-span-2 bg-[#F9FAFB]/50 p-4 text-[11px] font-black uppercase tracking-widest text-[#1A2E35] flex items-center group-hover:bg-[#F9FAFB] transition-colors">
                    {row.label}
                  </div>
                  <div className="col-span-3 p-4 text-[14px] font-bold text-neutral-500 italic flex items-center bg-white group-hover:text-[#1A2E35] transition-colors">
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
                <span className="text-6xl font-black italic text-[#FF5E1F]">{product.rating}</span>
                <div>
                  <div className="flex text-[#FF5E1F]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="20" height="20" fill={s <= Math.floor(product.rating) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    ))}
                  </div>
                  <p className="text-sm font-bold text-neutral-400 mt-1">Based on {product.reviews} reviews</p>
                </div>
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
            <Link href="/products" className="text-[13px] font-black uppercase tracking-widest text-[#FF5E1F] border-b-2 border-[#FF5E1F] pb-1 hover:text-[#1A2E35] hover:border-[#1A2E35] transition-all">VIEW ALL MODELS</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
