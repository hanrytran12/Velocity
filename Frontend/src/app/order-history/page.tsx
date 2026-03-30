"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OrderHistoryPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-[#1A2E35] tracking-tighter uppercase italic mb-2">
            Order History
          </h1>
          <p className="text-sm text-neutral-500 font-medium">
            View and manage your past orders
          </p>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-3xl p-12 text-center border border-neutral-100 shadow-sm">
          <div className="mb-6 flex justify-center">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-neutral-300"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#1A2E35] mb-2">
            No orders yet
          </h2>
          <p className="text-neutral-500 mb-6 max-w-md mx-auto">
            You haven't placed any orders yet. Start shopping to see your order history here.
          </p>
          <Link
            href="/products"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-black py-3 px-8 rounded-2xl transition-all active:scale-95 uppercase tracking-widest text-sm"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Future Orders Section (placeholder) */}
        <div className="mt-12 text-center">
          <p className="text-xs text-neutral-400 font-semibold uppercase tracking-widest">
            Your orders will appear here
          </p>
        </div>
      </div>
    </div>
  );
}
