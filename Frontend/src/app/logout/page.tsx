"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LogoutPage() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    // Redirect to home after logout
    window.location.href = "/";
  }, [logout]);

  return (
    <div className="flex items-center justify-center min-h-screen pt-24 pb-12">
      <div className="text-center">
        <p className="text-neutral-500">Logging out...</p>
      </div>
    </div>
  );
}
