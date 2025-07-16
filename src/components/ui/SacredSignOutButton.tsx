"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

export default function SacredSignOutButton() {
  const [hovered, setHovered] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (!user) return null;
  if (pathname.startsWith("/admin")) return null;

  const handleSignOut = async () => {
    setSigningOut(true);
    setTimeout(async () => {
      await signOut();
      setShowMessage(true);
      setTimeout(() => {
        setSigningOut(false);
        setShowMessage(false);
        router.push("/");
      }, 1200);
    }, 2000);
  };

  return (
    <div
      className="fixed top-6 right-6 z-50 flex flex-col items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        aria-label="Sign out"
        className={`relative icon-frame transition-all duration-300 focus:outline-none
          ${hovered ? "scale-110 animate-glow" : ""} 
          ${signingOut ? "animate-pulse" : ""}`}
        onClick={handleSignOut}
        disabled={signingOut}
      >
        <div className="icon-inner p-3 flex items-center justify-center relative overflow-hidden">
          {/* Expanding circle animation on sign-out */}
          {signingOut && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-16 h-16 rounded-full bg-gold/20 animate-ping" />
              <div className="absolute w-12 h-12 rounded-full bg-gold/30 animate-pulse" />
            </div>
          )}

          {/* Orthodox Cross - Default State */}
          <div
            className={`relative w-8 h-8 transition-all duration-300 ${
              hovered || signingOut
                ? "opacity-0 scale-0"
                : "opacity-100 scale-100"
            }`}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              className="gold-text"
            >
              {/* Vertical beam */}
              <rect x="14" y="2" width="4" height="28" fill="currentColor" />
              {/* Top horizontal beam */}
              <rect x="10" y="4" width="12" height="3" fill="currentColor" />
              {/* Main horizontal beam */}
              <rect x="6" y="10" width="20" height="4" fill="currentColor" />
              {/* Diagonal beam (Orthodox style) */}
              <rect
                x="8"
                y="22"
                width="16"
                height="3"
                fill="currentColor"
                transform="rotate(-15 16 23.5)"
              />
            </svg>
          </div>

          {/* LogOut icon on hover */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              hovered && !signingOut
                ? "opacity-100 scale-100"
                : "opacity-0 scale-0"
            }`}
          >
            <LogOut size={20} className="gold-text" />
          </div>

          {/* Blessing animation during sign out */}
          {signingOut && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="gold-text animate-fade-in">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="animate-float"
                >
                  {/* Blessing hand gesture */}
                  <path
                    d="M12 2C10.9 2 10 2.9 10 4V8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8V4C14 2.9 13.1 2 12 2Z"
                    fill="currentColor"
                  />
                  <path
                    d="M8 6C6.9 6 6 6.9 6 8V12C6 13.1 6.9 14 8 14C9.1 14 10 13.1 10 12V8C10 6.9 9.1 6 8 6Z"
                    fill="currentColor"
                  />
                  <path
                    d="M16 6C17.1 6 18 6.9 18 8V12C18 13.1 17.1 14 16 14C14.9 14 14 13.1 14 12V8C14 6.9 14.9 6 16 6Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 10C11.45 10 11 10.45 11 11V16C11 18.76 8.76 21 6 21C5.45 21 5 21.45 5 22C5 22.55 5.45 23 6 23C9.87 23 13 19.87 13 16V11C13 10.45 12.55 10 12 10Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </button>

      {/* Enhanced tooltip on hover */}
      <div
        className={`mt-2 scroll-panel px-3 py-1 transition-all duration-300 ${
          hovered && !signingOut && !showMessage
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2"
        }`}
      >
        <span className="font-liturgical text-sm gold-text">
          Depart in Peace
        </span>
      </div>

      {/* Blessing message */}
      <div
        className={`mt-2 scroll-panel px-4 py-2 transition-all duration-700 ${
          showMessage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="text-center">
          <div className="gold-text font-liturgical text-sm mb-1">
            May the Lord bless you
          </div>
          <div className="text-slate-400 text-xs">Go in peace...</div>
        </div>
      </div>
    </div>
  );
}
