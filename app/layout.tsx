import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import { ReviewsProvider } from "@/lib/reviews-context"
import { SearchProvider } from "@/lib/search-context"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Luminara - Elegant Jewelry Collection",
  description: "Discover timeless pieces crafted with love and precision",
    
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <WishlistProvider>
            <ReviewsProvider>
              <SearchProvider>
                <Suspense>{children}</Suspense>
              </SearchProvider>
            </ReviewsProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}
