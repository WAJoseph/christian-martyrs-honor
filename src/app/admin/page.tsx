// src/app/admin/page.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

interface AdminUser {
  email?: string;
  role?: string;
  app_metadata?: {
    role?: string;
    [key: string]: unknown;
  };
}

export default function AdminDashboard() {
  const { user, loading } = useAuth() as {
    user: AdminUser | null;
    loading: boolean;
  };
  const router = useRouter();

  useEffect(() => {
    if (
      !loading &&
      (!user || (user.role !== "admin" && user.app_metadata?.role !== "admin"))
    ) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full animate-ping opacity-30"></div>
          <p className="text-amber-300 text-center mt-4 font-liturgical">
            Loading Sacred Dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!user || (user.role !== "admin" && user.app_metadata?.role !== "admin")) {
    return null; // Will redirect
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-amber-500/30 to-amber-600/20 rounded-3xl blur-xl"></div>
        <div className="relative bg-gradient-to-r from-slate-800/80 via-slate-900/90 to-slate-800/80 backdrop-blur-md rounded-3xl p-8 border border-amber-500/30 shadow-2xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl mb-4 shadow-lg shadow-amber-500/25">
              <svg
                className="w-8 h-8 text-slate-900"
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
            <h2 className="text-4xl font-liturgical font-bold text-amber-300 mb-2">
              Blessed Administration
            </h2>
            <p className="text-amber-200/80 text-lg">
              May your work here serve the Kingdom of Heaven
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total Martyrs */}
        <div className="group relative transform hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-slate-800/90 backdrop-blur-md rounded-2xl p-6 border border-amber-500/30 shadow-xl">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <svg
                    className="w-7 h-7 text-slate-900"
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
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-amber-200/80 mb-1">
                  Holy Martyrs
                </p>
                <p className="text-3xl font-bold text-amber-300 font-liturgical">
                  -
                </p>
                <p className="text-xs text-amber-300/60 mt-1">
                  Saints of Faith
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-amber-500/20">
              <div className="flex items-center text-amber-300/70 text-sm">
                <span>✠</span>
                <span className="ml-2">Eternal Memory</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Testimonies */}
        <div className="group relative transform hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-slate-800/90 backdrop-blur-md rounded-2xl p-6 border border-amber-500/30 shadow-xl">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <svg
                    className="w-7 h-7 text-slate-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-amber-200/80 mb-1">
                  Divine Testimonies
                </p>
                <p className="text-3xl font-bold text-amber-300 font-liturgical">
                  -
                </p>
                <p className="text-xs text-amber-300/60 mt-1">
                  Voices of Faith
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-amber-500/20">
              <div className="flex items-center text-amber-300/70 text-sm">
                <span>✠</span>
                <span className="ml-2">Witness of Grace</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Donations */}
        <div className="group relative transform hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-slate-800/90 backdrop-blur-md rounded-2xl p-6 border border-amber-500/30 shadow-xl">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <svg
                    className="w-7 h-7 text-slate-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-amber-200/80 mb-1">
                  Sacred Offerings
                </p>
                <p className="text-3xl font-bold text-amber-300 font-liturgical">
                  -
                </p>
                <p className="text-xs text-amber-300/60 mt-1">Gifts of Love</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-amber-500/20">
              <div className="flex items-center text-amber-300/70 text-sm">
                <span>✠</span>
                <span className="ml-2">Divine Provision</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Timeline Entries */}
        <div className="group relative transform hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-slate-800/90 backdrop-blur-md rounded-2xl p-6 border border-amber-500/30 shadow-xl">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <svg
                    className="w-7 h-7 text-slate-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-amber-200/80 mb-1">
                  Chronicle Entries
                </p>
                <p className="text-3xl font-bold text-amber-300 font-liturgical">
                  -
                </p>
                <p className="text-xs text-amber-300/60 mt-1">
                  Sacred Timeline
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-amber-500/20">
              <div className="flex items-center text-amber-300/70 text-sm">
                <span>✠</span>
                <span className="ml-2">History of Faith</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 via-amber-500/20 to-amber-600/10 rounded-3xl blur-xl"></div>
        <div className="relative bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-slate-800/80 backdrop-blur-md rounded-3xl p-8 border border-amber-500/30 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl mb-4 shadow-lg shadow-amber-500/25">
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
            <h2 className="text-2xl font-liturgical font-bold text-amber-300 mb-2">
              Divine Actions
            </h2>
            <p className="text-amber-200/70">
              Perform sacred administrative tasks with divine purpose
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add New Martyr */}
            <Link
              href="/admin/martyrs"
              className="group relative transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-slate-700/60 via-slate-800/80 to-slate-700/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/30 shadow-xl group-hover:shadow-2xl group-hover:shadow-amber-500/25">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-7 h-7 text-slate-900"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-amber-200 text-lg group-hover:text-amber-100 transition-colors">
                      Add Holy Martyr
                    </p>
                    <p className="text-sm text-amber-300/70 group-hover:text-amber-300/90 transition-colors">
                      Chronicle a saint&apos;s sacred journey
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-amber-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-300/60 text-sm">
                      ✠ Sacred Registry
                    </span>
                    <svg
                      className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Add Testimony */}
            <Link
              href="/admin/testimonies"
              className="group relative transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-slate-700/60 via-slate-800/80 to-slate-700/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/30 shadow-xl group-hover:shadow-2xl group-hover:shadow-amber-500/25">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-7 h-7 text-slate-900"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-amber-200 text-lg group-hover:text-amber-100 transition-colors">
                      Share Testimony
                    </p>
                    <p className="text-sm text-amber-300/70 group-hover:text-amber-300/90 transition-colors">
                      Witness to divine grace
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-amber-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-300/60 text-sm">
                      ✠ Voice of Faith
                    </span>
                    <svg
                      className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* View Donations */}
            <Link
              href="/admin/donations"
              className="group relative transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-slate-700/60 via-slate-800/80 to-slate-700/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/30 shadow-xl group-hover:shadow-2xl group-hover:shadow-amber-500/25">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-7 h-7 text-slate-900"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-amber-200 text-lg group-hover:text-amber-100 transition-colors">
                      Sacred Offerings
                    </p>
                    <p className="text-sm text-amber-300/70 group-hover:text-amber-300/90 transition-colors">
                      Manage divine provision
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-amber-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-300/60 text-sm">
                      ✠ Divine Gifts
                    </span>
                    <svg
                      className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Divine Blessing Footer */}
      <div className="text-center py-8">
        <div className="inline-flex items-center space-x-4 text-amber-300/60">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>
          <span className="text-2xl">✠</span>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>
        </div>
        <p className="text-amber-300/70 mt-4 font-liturgical italic">
          &quot;Glory to God in the highest, and on earth peace, good will
          toward men&quot;
        </p>
      </div>
    </div>
  );
}
