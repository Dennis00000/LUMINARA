"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useWishlist, type WishlistItem } from "@/lib/wishlist-context"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface WishlistButtonProps {
  product: Omit<WishlistItem, "dateAdded">
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "ghost"
  className?: string
  showText?: boolean
}

export function WishlistButton({
  product,
  size = "default",
  variant = "ghost",
  className = "",
  showText = false,
}: WishlistButtonProps) {
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [isAnimating, setIsAnimating] = useState(false)

  const inWishlist = isInWishlist(product.id)

  const handleToggleWishlist = () => {
    setIsAnimating(true)
    toggleWishlist(product)

    // Reset animation after a short delay
    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }

  return (
    <Button
      size={size}
      variant={variant}
      className={cn(
        "transition-all duration-300",
        inWishlist && "text-red-500 hover:text-red-600",
        isAnimating && "scale-110",
        className,
      )}
      onClick={handleToggleWishlist}
    >
      <Heart
        className={cn(
          "w-4 h-4 transition-all duration-300",
          showText && "mr-2",
          inWishlist && "fill-current",
          isAnimating && "scale-125",
        )}
      />
      {showText && <span>{inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}</span>}
    </Button>
  )
}
