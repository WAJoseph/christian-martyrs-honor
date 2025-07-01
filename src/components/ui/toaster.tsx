'use client'
import * as RadixToast from '@radix-ui/react-toast'

export function Toaster() {
  return (
    <RadixToast.Provider>
      <RadixToast.Viewport />
    </RadixToast.Provider>
  )
}
