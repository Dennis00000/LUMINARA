"use client"

import Image from "next/image"
import { Heart, ShoppingBag, X, Calendar, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Link from "next/link"
import { useWishlist } from "@/lib/wishlist-context"
import { WishlistToCartButton } from "@/components/wishlist-to-cart-button"
import { WishlistButton } from "@/components/wishlist-button"

export default function WishlistPage() {
  const { items, clearWishlist, itemCount } = useWishlist()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />

        <div className="container mx-auto px-4 py-16">
          <div className="mb-8">
            <Link href="/account">
              <Button variant="ghost" size="sm">
                ← Back to Account
              </Button>
            </Link>
          </div>

          <div className="text-center py-16">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-light mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8 text-lg">Save items you love for later</p>
            <Link href="/shop">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/account">
            <Button variant="ghost" size="sm">
              ← Back to Account
            </Button>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={clearWishlist}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Wishlist
          </Button>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light">
            My Wishlist ({itemCount} {itemCount === 1 ? "item" : "items"})
          </h1>

          {items.length > 0 && (
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                Share Wishlist
              </Button>
              <Button variant="outline" size="sm">
                Print List
              </Button>
            </div>
          )}
        </div>

        {/* Wishlist Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Product Image */}
              <div className="relative bg-gray-50 aspect-square overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Remove from Wishlist Button */}
                <div className="absolute top-2 right-2">
                  <WishlistButton product={item} size="sm" className="bg-white/90 hover:bg-white shadow-sm" />
                </div>

                {/* Sale Badge */}
                {item.originalPrice && item.originalPrice > item.price && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">SALE</Badge>
                )}

                {/* Quick Add to Cart Overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <WishlistToCartButton item={item} removeFromWishlist={false} size="sm" className="shadow-lg" />
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-3">
                  <h3 className="font-medium text-lg mb-1 line-clamp-2">{item.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{item.category}</p>

                  {/* Product Details */}
                  <div className="text-xs text-gray-500 mt-2 space-y-1">
                    {item.metal && <p>Metal: {item.metal}</p>}
                    {item.size && <p>Size: {item.size}</p>}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="font-medium text-lg">${item.price.toFixed(2)}</span>
                  {item.originalPrice && (
                    <span className="text-gray-400 line-through text-sm">${item.originalPrice.toFixed(2)}</span>
                  )}
                </div>

                {/* Date Added */}
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>Added {formatDate(item.dateAdded)}</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <WishlistToCartButton item={item} removeFromWishlist={true} className="w-full" />

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <WishlistButton
                      product={item}
                      size="sm"
                      variant="outline"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </WishlistButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Wishlist Actions */}
        {items.length > 0 && (
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <div className="text-center">
              <h3 className="text-xl font-medium mb-4">Love Everything?</h3>
              <p className="text-gray-600 mb-6">Add all items to your cart and checkout together</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-gray-800"
                  onClick={() => {
                    // Add all items to cart logic would go here
                    items.forEach((item) => {
                      // This would use the cart context to add each item
                    })
                  }}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add All to Cart
                </Button>

                <Link href="/shop">
                  <Button size="lg" variant="outline">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Recently Viewed Suggestion */}
        <div className="mt-16">
          <h3 className="text-2xl font-light mb-8 text-center">You Might Also Like</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* This would show recommended products */}
            <div className="text-center text-gray-500 col-span-full py-8">
              <p>Browse our collections to discover more beautiful pieces</p>
              <Link href="/collections" className="text-black hover:underline font-medium">
                View Collections
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
