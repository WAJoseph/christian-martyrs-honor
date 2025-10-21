"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, GalleryHorizontal, Clock, Users, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import SacredSignOutButton from "./SacredSignOutButton";

export default function Navigation() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const lastScrollY = useRef(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Show nav when mouse is near top or hovering nav
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80) setVisible(true);
      else if (!hovered) setVisible(false);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hovered]);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 10) setVisible(true);
      else if (currentY > lastScrollY.current && !hovered) setVisible(false);
      else if (currentY < lastScrollY.current) setVisible(true);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hovered]);

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/gallery", icon: GalleryHorizontal, label: "Gallery" },
    { href: "/timeline", icon: Clock, label: "Timeline" },
    { href: "/community", icon: Users, label: "Community" },
    { href: "/donate", icon: Heart, label: "Donate" },
  ];

  return (
    <nav
      className={`fixed z-50 transition-all duration-500 top-4 right-4 sm:top-6 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 ${
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onMouseEnter={() => {
        setHovered(true);
        setVisible(true);
      }}
      onMouseLeave={() => setHovered(false)}
      style={{ willChange: "opacity" }}
    >
      <div className="scroll-panel px-6 py-3">
        <div className="flex items-center justify-center">
          {/* Desktop icon nav - hidden on small screens */}
          <div className="hidden sm:flex items-center space-x-6">
            {navItems.map(({ href, icon: Icon, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    `icon-frame p-1 transition-all duration-300 hover:scale-110 group ` +
                    (isActive ? "animate-glow" : "")
                  }
                >
                  <div className="icon-inner p-3">
                    <Icon
                      size={24}
                      className={
                        `transition-colors duration-300 ` +
                        (isActive
                          ? "gold-text"
                          : "text-slate-300 group-hover:gold-text")
                      }
                    />
                  </div>
                  <span className="sr-only">{label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger - only on small screens */}
          <div className="sm:hidden">
            <button
              aria-label="Open navigation"
              onClick={() => setMobileOpen((s) => !s)}
              className="p-2 rounded-md focus:outline-none icon-frame"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`fixed inset-0 z-40 sm:hidden transition-opacity duration-200 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="backdrop-blur-sm bg-black/30 absolute inset-0"
          onClick={() => setMobileOpen(false)}
        />
        <div className="absolute top-14 right-4 w-[85%] max-w-xs bg-slate-900/95 rounded-lg p-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            {navItems.map(({ href, icon: Icon, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${
                    isActive
                      ? "gold-text bg-slate-800/60"
                      : "text-slate-300 hover:gold-text hover:bg-slate-800/30"
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{label}</span>
                </Link>
              );
            })}

            <div className="pt-2 border-t border-slate-700" />

            {/* Inline sign out button for mobile */}
            <div className="flex items-center justify-center pt-2">
              <SacredSignOutButton inline />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
