// src/app/layout.tsx
import './styles/globals.css'
import { Providers } from '@/components/Providers'

export const metadata = {
  title: 'Sacred Martyrs',
  description: 'A digital sanctuary honoring the holy martyrs…',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Providers is now a Client Component */}
        <Providers>
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
