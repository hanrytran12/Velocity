"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mimic API delay
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-neutral-100 border border-neutral-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-[#1A2E35] tracking-tighter uppercase italic mb-2">Welcome</h1>
            <p className="text-sm text-neutral-400 font-bold uppercase tracking-widest">Sign in to your account</p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 py-3.5 border-2 border-neutral-100 rounded-2xl hover:bg-neutral-50 hover:border-neutral-200 transition-all group scale-100 active:scale-95">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-xs font-black uppercase tracking-tight">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3.5 bg-[#1877F2] text-white border-2 border-[#1877F2] rounded-2xl hover:bg-[#166fe5] hover:border-[#166fe5] transition-all group scale-100 active:scale-95">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-xs font-black uppercase tracking-tight">Facebook</span>
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-100"></div></div>
            <div className="relative flex justify-center text-[10px] font-black uppercase"><span className="px-3 bg-white text-neutral-300 tracking-widest leading-none translate-y-[-1px]">Or continue with email</span></div>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[11px] font-black text-neutral-400 uppercase tracking-widest mb-3 ml-1">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-neutral-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-orange-500/20 transition-all font-medium text-neutral-600" 
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3 ml-1">
                <label className="block text-[11px] font-black text-neutral-400 uppercase tracking-widest">Password</label>
                <Link href="#" className="text-[10px] font-black text-orange-500 uppercase tracking-tight hover:underline">Forgot password?</Link>
              </div>
              <div className="relative group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-neutral-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-orange-500/20 transition-all font-medium text-neutral-600 pr-14" 
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-neutral-400 hover:text-orange-500 transition-colors"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-orange-100 uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-neutral-50 text-center">
            <p className="text-[9px] font-black text-neutral-300 uppercase tracking-[0.3em] mb-4">New to Velocity?</p>
            <Link href="/register" className="inline-block w-full py-4 border-2 border-neutral-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#1A2E35] hover:bg-neutral-50 transition-all active:scale-[0.98]">
              Create an account
            </Link>
          </div>
        </div>
        
        <p className="mt-8 text-center text-[8px] font-black text-neutral-300 uppercase tracking-[0.5em]">
          Velocity Studio Collective © 2026
        </p>
      </div>
    </div>
  );
}
