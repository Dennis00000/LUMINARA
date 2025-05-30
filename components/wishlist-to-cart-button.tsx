"use client"

import { Button } from "@/components/ui/button"
import { ShoppingBag, Check } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useWishlist, type WishlistItem } from "@/lib/wishlist-context"
import { useState } from "react"

interface WishlistToCartButtonProps {
  item: WishlistItem
  removeFromWishlist?: boolean
  size?: "sm" | "default" | "lg"
  className?: string
}

export function WishlistToCartButton({
  item,
  removeFromWishlist = false,
  size = "default",
  className = "",
}: WishlistToCartButtonProps) {
  const { addItem: addToCart } = useCart()
  const { removeItem: removeFromWishlistFn } = useWishlist()
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)

    // Convert wishlist item to cart item
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      category: item.category,
      metal: item.metal,
      size: item.size,
    }

    // Add to cart
    addToCart(cartItem)

    // Optionally remove from wishlist
    if (removeFromWishlist) {
      removeFromWishlistFn(item.id)
    }

    // Show success state
    setJustAdded(true)

    // Reset states after animation
    setTimeout(() => {
      setIsAdding(false)
      setJustAdded(false)
    }, 2000)
  }

  if (justAdded) {
    return (
      <Button
        size={size}
        variant="outline"
        className={`${className} border-green-500 text-green-600 hover:bg-green-50`}
        disabled
      >
        <Check className="w-4 h-4 mr-2" />
        Added to Cart
      </Button>
    )
  }

  return (
    <Button
      size={size}
      className={`bg-black text-white hover:bg-gray-800 ${className}`}
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      <ShoppingBag className="w-4 h-4 mr-2" />
      {isAdding ? "Adding..." : "Add to Cart"}
    </Button>
  )
}
