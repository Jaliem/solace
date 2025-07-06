"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export function MainNav() {
  const { user, loading, userType } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Optionally redirect or show a message after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center space-x-3">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Solace</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/professionals"
            className="text-gray-600 hover:text-blue-600"
          >
            Find Professionals
          </Link>

          <Link href="/chatbot" className="text-gray-600 hover:text-blue-600">
            Solace AI
          </Link>
          <Link
            href="/emergency"
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Emergency Help
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          {loading ? (
            <div>Loading...</div>
          ) : user ? (
            <>
              {userType === "admin" ? (
                <Link href="/admin/dashboard">
                  <Button variant="ghost">Admin Dashboard</Button>
                </Link>
              ) : (
                <Link href="/profile">
                  <Button variant="ghost">Profile</Button>
                </Link>
              )}
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
