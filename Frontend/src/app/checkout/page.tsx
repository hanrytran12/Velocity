"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, updateQuantity, subtotal: cartSubtotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("online");
  
  // Only show selected items for the final order
  const selectedItems = cart.filter(item => item.selected);

  const subtotal = cartSubtotal;
  const shipping = 0; // Free shipping
  const tax = 22; // Flat tax for demo
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-neutral-50/50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-bold mb-4 ml-1">
          <Link href="/cart" className="text-neutral-400 hover:text-neutral-600 transition-colors">Cart</Link>
          <span className="text-neutral-300">›</span>
          <span className="text-orange-500 underline underline-offset-4">Checkout</span>
        </nav>

        <h1 className="text-4xl font-black text-[#1A2E35] mb-12 tracking-tighter uppercase italic">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Shipping Section */}
            <section aria-labelledby="shipping-heading">
              <div className="flex items-center gap-3 mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-600">
                  <path d="M20 8H17V4H3C1.89543 4 1 4.89543 1 6V17H3C3 18.6569 4.34315 20 6 20C7.65685 20 9 18.6569 9 17H15C15 18.6569 16.3431 20 18 20C19.6569 20 21 18.6569 21 17H23V12L20 8ZM6 18.5C5.17157 18.5 4.5 17.8284 4.5 17C4.5 16.1716 5.17157 15.5 6 15.5C6.82843 15.5 7.5 16.1716 7.5 17C7.5 17.8284 6.82843 18.5 6 18.5ZM18 18.5C17.1716 18.5 16.5 17.8284 16.5 17C16.5 16.1716 17.1716 15.5 18 15.5C18.8284 15.5 19.5 16.1716 19.5 17C19.5 17.8284 18.8284 18.5 18 18.5ZM19.5 12H17V9.5H19.5V12Z" fill="currentColor"/>
                </svg>
                <h2 id="shipping-heading" className="text-2xl font-black text-[#1A2E35] tracking-tight">Shipping Address</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                <div className="col-span-1">
                  <label className="block text-[13px] font-bold text-[#1A2E35] mb-2 px-1">First Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-orange-100 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-neutral-600" placeholder="John" />
                </div>
                <div className="col-span-1">
                  <label className="block text-[13px] font-bold text-[#1A2E35] mb-2 px-1">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-orange-100 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-neutral-600" placeholder="Doe" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[13px] font-bold text-[#1A2E35] mb-2 px-1">Address</label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-orange-100 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-neutral-600" placeholder="123 Performance St." />
                </div>
                <div className="col-span-1">
                  <label className="block text-[13px] font-bold text-[#1A2E35] mb-2 px-1">City</label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-orange-100 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-neutral-600" placeholder="Portland" />
                </div>
                <div className="col-span-1">
                  <label className="block text-[13px] font-bold text-[#1A2E35] mb-2 px-1">Postal Code</label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-orange-100 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-neutral-600" placeholder="97201" />
                </div>
              </div>
            </section>

            {/* Payment Section */}
            <section aria-labelledby="payment-heading">
              <div className="flex items-center gap-3 mb-8 pt-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-600">
                  <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z" fill="currentColor"/>
                </svg>
                <h2 id="payment-heading" className="text-2xl font-black text-[#1A2E35] tracking-tight">Payment Method</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {/* Method Options */}
                {[
                  { id: "online", label: "Momo / VNPay", icon: "📱" },
                  { id: "card", label: "Credit Card", icon: "💳" },
                  { id: "cod", label: "COD", icon: "🚚" }
                ].map((method) => (
                  <button 
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-2xl transition-all ${paymentMethod === method.id ? "border-orange-500 bg-orange-50/20" : "border-neutral-100 bg-white hover:border-neutral-200"}`}
                  >
                    <span className="text-2xl mb-1">{method.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">{method.label}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic Payment Content */}
              <div className="bg-white border border-neutral-100 rounded-3xl p-8 shadow-sm min-h-[300px] flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                {paymentMethod === "online" && (
                  <div className="text-center space-y-6">
                    <div className="relative w-48 h-48 mx-auto bg-white p-4 border-4 border-neutral-100 rounded-3xl flex items-center justify-center shadow-inner group overflow-hidden">
                      {/* Premium SVG QR Code Mockup */}
                      <svg width="140" height="140" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1A2E35] opacity-90 group-hover:scale-110 transition-transform duration-700">
                        <path d="M3 3H9V9H3V3ZM5 5V7H7V5H5ZM3 15H9V21H3V15ZM5 17V19H7V17H5ZM15 3H21V9H15V3ZM17 5V7H19V5H17ZM15 15H17V17H15V15ZM17 17H19V19H17V17ZM19 15H21V17H19V15ZM15 19H17V21H15V19ZM19 19H21V21H19V19ZM11 3H13V5H11V3ZM11 7H13V9H11V7ZM11 11H13V13H11V11ZM3 11H5V13H3V11ZM7 11H9V13H7V11ZM15 11H17V13H15V11ZM19 11H21V13H19V11ZM11 15H13V17H11V15ZM11 19H13V21H11V19Z" fill="currentColor"/>
                        <rect x="10" y="10" width="4" height="4" rx="1" fill="#FF5E1F" />
                      </svg>
                      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 to-transparent pointer-events-none"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-[#1A2E35] uppercase tracking-tight italic mb-2">Quét mã QR để thanh toán</h3>
                      <p className="text-sm text-neutral-400 font-medium leading-relaxed px-4">Mở ứng dụng <span className="text-[#A50064] font-bold">MoMo</span> hoặc <span className="text-[#005BAA] font-bold">VNPay</span> để kết thúc đơn hàng.</p>
                    </div>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center mb-2">
                       <h3 className="text-lg font-black text-[#1A2E35] uppercase tracking-tight italic">Card Information</h3>
                       <div className="flex gap-2">
                          <span className="w-8 h-5 bg-neutral-200 rounded flex items-center justify-center text-[8px] font-bold text-neutral-400">VISA</span>
                          <span className="w-8 h-5 bg-neutral-200 rounded flex items-center justify-center text-[8px] font-bold text-neutral-400">MC</span>
                       </div>
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 ml-1">Cardholder Name</label>
                      <input type="text" className="w-full px-5 py-4 bg-neutral-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/10 transition-all font-medium" placeholder="JOHN DOE" />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 ml-1">Card Number</label>
                      <input type="text" className="w-full px-5 py-4 bg-neutral-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/10 transition-all font-mono tracking-widest" placeholder="0000 0000 0000 0000" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 ml-1">Expiry Date</label>
                        <input type="text" className="w-full px-5 py-4 bg-neutral-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/10 transition-all font-medium" placeholder="MM / YY" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 ml-1">CVV</label>
                        <input type="password" size={3} maxLength={3} className="w-full px-5 py-4 bg-neutral-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/10 transition-all font-medium" placeholder="•••" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center text-3xl">🚚</div>
                    <div>
                      <h3 className="text-lg font-black text-[#1A2E35] uppercase tracking-tight italic mb-2">Thanh toán khi nhận hàng</h3>
                      <p className="text-sm text-neutral-400 font-medium px-8 leading-relaxed">Bạn sẽ thanh toán bằng tiền mặt khi shipper giao giày tận nơi. Vui lòng chuẩn bị sẵn số tiền chính xác.</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar - Right Column */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-white rounded-3xl p-8 border border-neutral-100 shadow-xl shadow-neutral-200/50">
              <h2 className="text-xl font-black text-[#1A2E35] mb-8 tracking-tight">Order Summary</h2>
              
              <div className="space-y-6 mb-8 pr-2">
                {selectedItems.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 group">
                    <div className="relative w-24 h-24 bg-neutral-100/50 rounded-2xl border border-neutral-100 overflow-hidden flex-shrink-0">
                      <Image 
                        src={item.image!} 
                        alt={item.name!} 
                        fill 
                        className="object-contain p-3"
                      />
                      {/* Quantity Badge - Top Left */}
                      {item.quantity! > 1 && (
                        <div className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-black w-6 h-6 rounded-lg flex items-center justify-center shadow-lg shadow-orange-200 border border-white/20 animate-in zoom-in-50 duration-300">
                          {item.quantity}
                        </div>
                      )}
                      {/* Remove Button */}
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="absolute top-1 right-1 bg-white/80 hover:bg-white text-neutral-400 hover:text-red-500 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-neutral-100 shadow-sm"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      </button>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-sm font-black text-[#1A2E35] mb-0.5">{item.name}</h3>
                      <p className="text-[11px] text-neutral-400 font-bold mb-1">Size: {item.size}, Color: {item.color}</p>
                      <p className="font-black text-orange-500 text-base">{item.price}</p>
                    </div>
                  </div>
                ))}
                {selectedItems.length === 0 && (
                  <p className="text-sm text-neutral-400 text-center py-8 font-bold italic uppercase tracking-tighter">Your cart is empty</p>
                )}
              </div>

              <div className="pt-6 border-t border-neutral-100 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-neutral-400">Subtotal</span>
                  <span className="font-black text-[#1A2E35]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-neutral-400">Shipping</span>
                  <span className="font-black text-[#10B981] uppercase text-[11px] tracking-wider">Free</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-neutral-400">Tax</span>
                  <span className="font-black text-[#1A2E35]">$22.00</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
                  <span className="text-lg font-black text-[#1A2E35]">Total</span>
                  <span className="text-2xl font-black text-orange-500 tracking-tighter">${(subtotal + 22).toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full mt-10 bg-orange-500 hover:bg-orange-600 text-white font-black py-5 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-orange-200 flex items-center justify-center gap-3 group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:-translate-y-0.5">
                  <path d="M12 17V15M17 11V7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7V11M5 11H19C20.1046 11 21 11.8954 21 13V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V13C3 11.8954 3.89543 11 5 11Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-base uppercase tracking-tight">Complete Purchase</span>
              </button>

              <p className="text-[10px] text-neutral-400 font-bold mt-8 text-center px-4 leading-relaxed uppercase tracking-tighter">
                By completing your purchase, you agree to our 
                <Link href="#" className="underline mx-1">Terms of Service</Link> 
                and <Link href="#" className="underline">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
