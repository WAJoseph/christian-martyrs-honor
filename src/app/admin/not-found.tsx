"use client";

import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Enhanced Background Layers */}
      <div className="absolute inset-0 bg-slate-900 z-0" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 z-0"
        style={{ backgroundImage: `url('/Church-ceiling2.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-indigo-900/70 to-purple-900/80 z-0" />

      <div className="relative z-10 max-w-md w-full p-8 orthodox-border bg-slate-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-amber-600/30">
        <h1 className="text-4xl font-liturgical font-bold text-amber-300 mb-4 drop-shadow-lg text-center">
          Admin Page Not Found
        </h1>
        <p className="text-amber-200/70 mb-6 text-center">
          The page you are looking for does not exist in the sacred admin area.
          <br />
          Please check the URL or return forth to the Dashboard of Grace.
        </p>
        <Link
          href="/admin"
          className="group relative bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-amber-100 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/25 border border-amber-400/50 flex items-center justify-center mx-auto"
        >
          Go to Admin Dashboard
        </Link>
      </div>
    </div>
  );
}
