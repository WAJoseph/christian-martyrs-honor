"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export function usePageTransition() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const push = useCallback(
    (url: string) => {
      setLoading(true);
      router.push(url);
      // Fallback: hide loader after a delay (in case of SSR navigation)
      setTimeout(() => setLoading(false), 1200);
    },
    [router]
  );

  return { loading, push, setLoading };
}

export function PageTransitionLoader({ loading }: { loading: boolean }) {
  if (!loading) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 pointer-events-auto transition-opacity animate-fade-in">
      <div className="w-16 h-16 border-4 border-gold-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
