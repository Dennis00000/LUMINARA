"use client"

import { Button } from "@/components/ui/button"
import { ShoppingBag, Check } from "lucide-react"
import { useCart, type CartItem } from "@/lib/cart-context"
import { useState } from "react"

interface AddToCartButtonProps {
  product: Omit<CartItem, "quantity">
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "ghost"
  className?: string
}

export function AddToCartButton({
  product,
  size = "default",
  variant = "default",
  className = "",
}: AddToCartButtonProps) {
  const { addItem, isInCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)

    // Add item to cart
    addItem(product)

    // Show success state
    setJustAdded(true)

    // Reset states after animation
    setTimeout(() => {
      setIsAdding(false)
      setJustAdded(false)
    }, 2000)
  }

  const inCart = isInCart(product.id)

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
    <Button size={size} variant={variant} className={className} onClick={handleAddToCart} disabled={isAdding}>
      <ShoppingBag className="w-4 h-4 mr-2" />
      {isAdding ? "Adding..." : inCart ? "Add Another" : "Add to Cart"}
    </Button>
  )
}
