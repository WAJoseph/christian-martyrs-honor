"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, GalleryHorizontal, Clock, Users, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const lastScrollY = useRef(0);

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
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
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
        <div className="flex items-center space-x-6">
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
      </div>
    </nav>
  );
}
