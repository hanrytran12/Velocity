"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    brand: string;
    category: string;
    price: string;
    oldPrice?: string;
    badge?: string;
    badgeColor?: string;
    image: string;
    colors: { name: string; hex: string }[];
    sizes: string[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [showQuickSelect, setShowQuickSelect] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "9");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Default");
  const [quantity, setQuantity] = useState(1);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickSelect(true);
  };

  const handleConfirmAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      selected: true
    });
    
    setShowQuickSelect(false);
    setQuantity(1); // Reset for next time
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="group relative flex flex-col gap-5">
      {/* The main card is no longer a Link at the top level to better handle the internal button clicks, 
          instead I use a Link surrounding the image and text separately or a programmatic push. 
          But for simplicity, I'll keep the Link and use stopPropagation on the form. */}
      
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square bg-white rounded-2xl overflow-hidden flex items-center justify-center transition-all group-hover:bg-white shadow-sm border border-neutral-100">
          <Image 
            src={product.image} 
            alt={product.name}
            width={500}
            height={500}
            className={`object-contain w-full h-full transition-all duration-700 ease-in-out ${showQuickSelect ? 'scale-90 blur-sm brightness-75' : 'group-hover:scale-105'}`}
          />
          
          {/* Heart Icon */}
          <button 
            onClick={stopPropagation}
            className="absolute top-4 right-4 bg-white text-[#1A2E35] w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-9 groups/heart z-10"
          >
            <svg width="20" height="20" fill={product.id === 1 ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Quick Add Toggle Button */}
          {!showQuickSelect && (
            <button 
              onClick={handleQuickAdd}
              className="absolute bottom-4 right-4 bg-orange-500 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all active:scale-90 hover:bg-orange-600 z-10"
              title="Quick Add Options"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          )}

          {/* Quick Select Form Overlay */}
          {showQuickSelect && (
            <div 
              onClick={stopPropagation}
              className="absolute inset-0 bg-white/95 backdrop-blur-sm p-4 flex flex-col justify-between animate-in fade-in zoom-in-95 duration-300 z-20"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-[#FF5E1F]">Options</h4>
                <button 
                  onClick={() => setShowQuickSelect(false)}
                  className="text-neutral-400 hover:text-black transition-colors"
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>

              {/* Size Selector */}
              <div className="space-y-2">
                <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Size (US)</p>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.slice(0, 6).map((size) => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[32px] h-8 rounded-lg text-[10px] font-bold border-2 transition-all ${selectedSize === size ? 'border-[#FF5E1F] bg-[#FF5E1F] text-white' : 'border-neutral-100 text-neutral-500 hover:border-neutral-200'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Swatches */}
              <div className="space-y-2">
                <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Color</p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button 
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-6 h-6 rounded-full border-2 p-0.5 transition-all ${selectedColor === color.name ? 'border-[#FF5E1F] scale-110 shadow-md' : 'border-transparent'}`}
                    >
                      <div className="w-full h-full rounded-full border border-black/5" style={{ backgroundColor: color.hex }}></div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Confirm */}
              <div className="flex gap-2">
                <div className="flex items-center bg-neutral-100 rounded-xl h-10 px-1">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-6 h-full flex items-center justify-center text-neutral-400 hover:text-black"
                  >
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path d="M5 12h14"/></svg>
                  </button>
                  <span className="w-4 text-center font-black text-[14px]">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-6 h-full flex items-center justify-center text-neutral-400 hover:text-black"
                  >
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path d="M12 5v14M5 12h14"/></svg>
                  </button>
                </div>
                <button 
                  onClick={handleConfirmAdd}
                  className="flex-1 bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 transition-all active:scale-95 shadow-lg shadow-black/10"
                >
                  Confirm Add
                </button>
              </div>
            </div>
          )}

          {/* Badge (HOT DEAL / NEW) */}
          {product.badge && !showQuickSelect && (
            <div className={`absolute top-4 left-4 ${product.badgeColor || 'bg-[#FF5E1F]'} text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-sm transition-opacity ${showQuickSelect ? 'opacity-0' : 'opacity-100'}`}>
              {product.badge}
            </div>
          )}
        </div>

        <div className="relative flex justify-between items-end pr-2 pt-5">
          <div className="space-y-1">
            <p className="text-[11px] font-black uppercase tracking-widest text-[#FF5E1F]">
              {product.category}
            </p>
            <h3 className="font-bold text-[19px] text-[#1A2E35] leading-tight tracking-tight uppercase italic">{product.name}</h3>
            <div className="flex flex-col gap-0.5 pt-1">
              <span className="font-black text-[18px] text-[#1A2E35] tracking-tighter">{product.price}</span>
              {product.oldPrice && (
                <span className="text-neutral-300 text-[14px] line-through font-medium tracking-tight leading-none">{product.oldPrice}</span>
              )}
            </div>
          </div>

          <div className="flex gap-2 pb-1.5">
            {product.colors.slice(0, 3).map((color, idx) => (
              <div 
                key={idx} 
                className={`w-3.5 h-3.5 rounded-full ring-offset-2 transition-all ${product.colors[0].name === color.name ? 'ring-2 ring-orange-500' : 'ring-1 ring-neutral-200'}`} 
                style={{ backgroundColor: color.hex }}
              ></div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
