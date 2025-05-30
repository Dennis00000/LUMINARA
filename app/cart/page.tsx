"use client"

import Image from "next/image"
import { X, ArrowLeft, Lock, Truck, Shield, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { QuantitySelector } from "@/components/quantity-selector"

export default function CartPage() {
  const { items, total, itemCount, removeItem, clearCart } = useCart()

  const subtotal = total
  const shipping = subtotal > 500 ? 0 : 25.0
  const tax = subtotal * 0.08
  const finalTotal = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />

        <div className="container mx-auto px-4 py-16">
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-light mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 text-lg">Discover our beautiful jewelry collection</p>
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
          <Link href="/shop">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Clear Cart
          </Button>
        </div>

        <h1 className="text-3xl font-light mb-8">
          Shopping Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-6 border border-gray-200 rounded-lg">
                  <div className="relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover rounded"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <div className="text-sm text-gray-600 space-y-1 mt-2">
                      {item.metal && <p>Metal: {item.metal}</p>}
                      {item.size && <p>Size: {item.size}</p>}
                      <p>Category: {item.category}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <span className="font-medium text-lg">${item.price.toFixed(2)}</span>
                      {item.originalPrice && (
                        <span className="text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <QuantitySelector itemId={item.id} quantity={item.quantity} size="sm" />
                  </div>

                  <div className="text-right">
                    <p className="font-medium text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 mt-2"
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Code */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-4">Have a Coupon Code?</h3>
              <div className="flex space-x-3">
                <Input placeholder="Enter coupon code" className="flex-1" />
                <Button variant="outline">Apply</Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
              <h3 className="text-xl font-medium mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping === 0 && subtotal > 0 && (
                  <div className="text-sm text-green-600 flex items-center">
                    <Truck className="w-4 h-4 mr-1" />
                    Free shipping applied!
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium text-xl">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full bg-black text-white hover:bg-gray-800 mb-4 py-3">
                  <Lock className="w-4 h-4 mr-2" />
                  Proceed to Checkout
                </Button>
              </Link>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4" />
                  <span>Free shipping on orders over $500</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Secure checkout guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
