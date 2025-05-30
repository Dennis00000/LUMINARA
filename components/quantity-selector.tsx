"use client"

import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { useCart } from "@/lib/cart-context"

interface QuantitySelectorProps {
  itemId: string
  quantity: number
  size?: "sm" | "default"
  className?: string
}

export function QuantitySelector({ itemId, quantity, size = "default", className = "" }: QuantitySelectorProps) {
  const { updateQuantity } = useCart()

  const handleDecrease = () => {
    updateQuantity(itemId, Math.max(0, quantity - 1))
  }

  const handleIncrease = () => {
    updateQuantity(itemId, quantity + 1)
  }

  const buttonSize = size === "sm" ? "sm" : "default"
  const containerClass = size === "sm" ? "h-8" : "h-10"

  return (
    <div className={`flex items-center border border-gray-300 rounded-md ${className}`}>
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={handleDecrease}
        className={`${containerClass} px-2 hover:bg-gray-100 rounded-r-none border-r`}
        disabled={quantity <= 1}
      >
        <Minus className="w-3 h-3" />
      </Button>

      <div
        className={`${containerClass} px-4 flex items-center justify-center min-w-[60px] text-center font-medium bg-white`}
      >
        {quantity}
      </div>

      <Button
        variant="ghost"
        size={buttonSize}
        onClick={handleIncrease}
        className={`${containerClass} px-2 hover:bg-gray-100 rounded-l-none border-l`}
      >
        <Plus className="w-3 h-3" />
      </Button>
    </div>
  )
}
