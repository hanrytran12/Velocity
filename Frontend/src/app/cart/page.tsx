"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    toggleSelection, 
    selectAll, 
    subtotal, 
    selectedCount 
  } = useCart();

  const isAllSelected = cart.length > 0 && cart.every(i => i.selected);

  return (
    <div className="min-h-screen bg-neutral-50/50 pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-bold mb-4 ml-1">
          <span className="text-orange-500 underline underline-offset-4">Cart</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-black text-[#1A2E35] tracking-tighter uppercase italic mb-1">Your Bag</h1>
            <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.3em] pl-1">Review your premium velocity selection</p>
          </div>
          <Link href="/products" className="group flex items-center gap-2 text-[10px] font-black text-[#1A2E35] uppercase tracking-widest hover:text-orange-500 transition-colors mb-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5m0 0l7-7m-7 7l7 7"/></svg>
            Continue Shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between px-4 mb-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={isAllSelected}
                    onChange={() => selectAll(!isAllSelected)}
                    className="peer sr-only" 
                  />
                  <div className="w-6 h-6 border-2 border-neutral-200 rounded-lg bg-white peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all"></div>
                  <svg className="absolute top-1 left-1 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-[#1A202C] transition-colors">Select All Items</span>
              </label>
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-300">{cart.length} Items Total</span>
            </div>

            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className={`group relative bg-white rounded-[2.5rem] p-8 border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-neutral-100/50 transition-all duration-500 ${!item.selected ? 'opacity-60 saturate-50' : ''}`}>
                  <div className="flex flex-col sm:flex-row items-center gap-8">
                    {/* Checkbox Trigger Area */}
                    <div 
                      onClick={() => toggleSelection(item.id)}
                      className="absolute top-8 left-8 z-10 cursor-pointer"
                    >
                      <div className="relative">
                        <div className={`w-7 h-7 border-2 rounded-xl transition-all flex items-center justify-center ${item.selected ? 'bg-orange-500 border-orange-500 shadow-lg shadow-orange-200' : 'bg-white border-neutral-100'}`}>
                          {item.selected && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                        </div>
                      </div>
                    </div>

                    {/* Image Section */}
                    <div className="relative w-48 h-48 bg-neutral-50 rounded-[2rem] overflow-hidden flex-shrink-0">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 to-transparent pointer-events-none"></div>
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 space-y-4 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-1">{item.brand}</p>
                          <h3 className="text-lg font-black text-[#1A202C] leading-tight uppercase italic tracking-tighter mb-2">{item.name}</h3>
                          <div className="flex items-center justify-center sm:justify-start gap-4">
                            <span className="px-3 py-1 bg-neutral-100 rounded-full text-[9px] font-black uppercase tracking-widest text-neutral-500">Size {item.size}</span>
                            <span className="px-3 py-1 bg-neutral-100 rounded-full text-[9px] font-black uppercase tracking-widest text-neutral-500">{item.color}</span>
                          </div>
                        </div>
                        <div className="text-xl font-black text-[#1A202C] tracking-tighter italic">
                          {item.price}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-center sm:justify-between gap-6 pt-4 border-t border-neutral-50">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4 bg-neutral-50 rounded-2xl p-1.5 border border-neutral-100">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:bg-white hover:text-orange-500 hover:shadow-sm rounded-xl transition-all"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                          </button>
                          <span className="w-8 text-center text-sm font-black text-[#1A202C]">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:bg-white hover:text-orange-500 hover:shadow-sm rounded-xl transition-all"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                          </button>
                        </div>

                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-2 text-[10px] font-black text-neutral-300 hover:text-red-500 transition-colors uppercase tracking-widest"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                          Remove Item
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {cart.length === 0 && (
                <div className="py-32 text-center bg-white rounded-[3rem] border border-dashed border-neutral-200">
                  <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CBD5E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                  </div>
                  <h3 className="text-2xl font-black text-[#1A202C] uppercase italic tracking-tighter mb-2">Cart is empty</h3>
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mb-8">Ready to fill your bag with speed?</p>
                  <Link href="/products" className="inline-block bg-[#1A202C] text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 transition-all shadow-xl active:scale-95">Start Shopping</Link>
                </div>
              )}
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white rounded-[3rem] p-10 text-[#1A2E35] border border-neutral-100 shadow-2xl shadow-neutral-100/50 overflow-hidden relative group">
                <h2 className="text-xl font-black mb-8 tracking-tight text-[#1A2E35]">Order Summary</h2>
                
                <div className="space-y-4 pb-6 border-b border-neutral-100">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-neutral-400 text-sm">Selected Items</span>
                    <span className="font-black text-[#1A2E35]">{selectedCount}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-neutral-400">Subtotal</span>
                    <span className="font-black text-[#1A2E35]">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-neutral-400">Shipping</span>
                    <span className="font-black text-[#10B981] uppercase text-[11px] tracking-wider">Free</span>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-lg font-black text-[#1A2E35]">Total</span>
                    <span className="text-2xl font-black text-orange-500 tracking-tighter">${subtotal.toFixed(2)}</span>
                  </div>

                  <Link 
                    href={selectedCount > 0 ? "/checkout" : "#"}
                    className={`group w-full bg-orange-500 text-white py-5 rounded-2xl font-black uppercase tracking-tight text-base flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-orange-100 ${selectedCount === 0 ? 'opacity-30 cursor-not-allowed grayscale' : 'hover:bg-orange-600'}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17V15M17 11V7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7V11M5 11H19C20.1046 11 21 11.8954 21 13V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V13C3 11.8954 3.89543 11 5 11Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Checkout Now</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
