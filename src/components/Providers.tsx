"use client";
import React, { useState, createContext, useContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Sonner } from "@/components/ui/sonner";
import { AuthProvider } from "../../context/AuthContext";
import { PageTransitionLoader } from "@/components/ui/PageTransitionLoader";
import PageTransitionWrapper from "@/components/ui/PageTransitionWrapper";
import SacredSignOutButton from "@/components/ui/SacredSignOutButton";

// instantiate here, inside a client component
const queryClient = new QueryClient();

const PageTransitionContext = createContext<{
  loading: boolean;
  setLoading: (v: boolean) => void;
}>({ loading: false, setLoading: () => {} });

export function usePageTransitionContext() {
  return useContext(PageTransitionContext);
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  return (
    <PageTransitionContext.Provider value={{ loading, setLoading }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <PageTransitionLoader loading={loading} />
            <SacredSignOutButton />
            <PageTransitionWrapper>{children}</PageTransitionWrapper>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </PageTransitionContext.Provider>
  );
}
