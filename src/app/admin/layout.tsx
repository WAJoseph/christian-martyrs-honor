// src/app/admin/layout.tsx
"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "../../../context/AuthContext";
import { signOut } from "../../../lib/supabaseClient";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  // Sidebar navigation items with icons
  const navItems = [
    {
      id: "overview",
      label: "Overview",
      href: "/admin",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      ),
    },
    {
      id: "martyrs",
      label: "Holy Martyrs",
      href: "/admin/martyrs",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: "testimonies",
      label: "Testimonies",
      href: "/admin/testimonies",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: "donations",
      label: "Offerings",
      href: "/admin/donations",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      ),
    },
    {
      id: "timeline",
      label: "Timeline",
      href: "/admin/timeline",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 011 1v1.07A7.002 7.002 0 0117.93 9H19a1 1 0 110 2h-1.07A7.002 7.002 0 0111 17.93V19a1 1 0 11-2 0v-1.07A7.002 7.002 0 012.07 11H1a1 1 0 110-2h1.07A7.002 7.002 0 019 2.07V1a1 1 0 012 0v1.07zM10 4a6 6 0 100 12A6 6 0 0010 4z" />
        </svg>
      ),
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative overflow-hidden flex">
        {/* Enhanced Background Layers */}
        <div className="absolute inset-0 bg-slate-900 z-0" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 transition-opacity duration-1000 z-0"
          style={{ backgroundImage: `url('/Church-ceiling2.jpg')` }}
        />
        {/* Divine Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-indigo-900/70 to-purple-900/80 z-0" />

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-300/20 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-amber-400/30 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-amber-200/25 rounded-full animate-pulse"></div>
        </div>

        {/* Enhanced Sidebar */}
        <aside className="w-72 hidden md:flex flex-col py-8 px-6 relative z-10">
          {/* Sidebar Background with 3D Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800/90 via-slate-900/95 to-slate-900/90 backdrop-blur-md rounded-r-3xl shadow-2xl border-r-2 border-amber-600/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent rounded-r-3xl"></div>

          {/* Sidebar Content */}
          <div className="relative z-10">
            {/* Divine Header */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full blur-md opacity-30"></div>
                <div className="relative bg-gradient-to-br from-amber-300 to-amber-600 p-4 rounded-2xl shadow-lg border border-amber-400/50">
                  <svg
                    className="w-8 h-8 text-slate-900 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-liturgical font-bold text-amber-300 mt-4 tracking-wide">
                Sacred Admin
              </h2>
              <p className="text-amber-200/70 text-sm mt-1">
                Dashboard of Grace
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1">
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className={`group flex items-center px-4 py-4 rounded-2xl font-medium transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                        pathname === item.href
                          ? "bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100 shadow-lg shadow-amber-500/25 border border-amber-400/50"
                          : "hover:bg-gradient-to-r hover:from-amber-600/20 hover:to-amber-700/20 text-amber-200 hover:text-amber-100 hover:shadow-lg hover:shadow-amber-500/10"
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          pathname === item.href
                            ? "bg-amber-300/20 text-amber-200"
                            : "bg-amber-600/10 text-amber-400 group-hover:bg-amber-300/20 group-hover:text-amber-200"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <span className="ml-4 font-medium tracking-wide">
                        {item.label}
                      </span>
                      {pathname === item.href && (
                        <div className="ml-auto w-2 h-2 bg-amber-300 rounded-full shadow-lg shadow-amber-300/50"></div>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Holy Separator */}
            <div className="my-8 flex items-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
              <div className="mx-4 text-amber-400/60">✠</div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
            </div>

            {/* User Info */}
            <div className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-2xl p-4 border border-amber-600/20">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-slate-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-amber-200 truncate">
                    {user?.email}
                  </p>
                  <p className="text-xs text-amber-300/70">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content area */}
        <div className="flex-1 flex flex-col relative z-10">
          {/* Enhanced Header */}
          <header className="relative">
            {/* Header Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/95 to-slate-900/90 backdrop-blur-md"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <div className="flex items-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                      <svg
                        className="w-6 h-6 text-slate-900"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-amber-300 font-liturgical tracking-wide">
                        Sacred Dashboard
                      </h1>
                      <p className="text-amber-200/70 text-sm">
                        Divine Administration Portal
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-amber-200 text-sm font-medium">
                      Peace be with you,
                    </p>
                    <p className="text-amber-300 text-sm font-semibold">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="group relative bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-amber-100 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/25 border border-amber-400/50"
                  >
                    <span className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Sign Out</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
