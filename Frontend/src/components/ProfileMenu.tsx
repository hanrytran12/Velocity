"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function ProfileMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    window.location.href = "/";
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-neutral-700 hover:text-orange-500 transition-all p-2 rounded-full hover:bg-neutral-50 active:scale-95"
        aria-label="Profile menu"
        aria-expanded={isOpen}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg shadow-neutral-200 border border-neutral-100 overflow-hidden z-40 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Info Header */}
          <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-100">
            <p className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-1">
              Logged in as
            </p>
            <p className="text-sm font-bold text-[#1A2E35] truncate">{user?.displayName}</p>
            <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
          </div>

          {/* Menu Items */}
          <nav className="py-2">
            <Link
              href="/order-history"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-6 py-3 text-sm font-semibold text-[#1A2E35] hover:bg-neutral-50 transition-colors group"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-600 group-hover:text-orange-500 transition-colors"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span>Order History</span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-6 py-3 text-sm font-semibold text-[#1A2E35] hover:bg-neutral-50 transition-colors group border-t border-neutral-100"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-600 group-hover:text-orange-500 transition-colors"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Logout</span>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
