'use client'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster }        from '@/components/ui/toaster'
import { Sonner }         from '@/components/ui/sonner'
import Navigation         from '@/components/ui/Navigation'

// instantiate here, inside a client component
const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Navigation />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  )
}
