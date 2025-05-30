"use client"

import Image from "next/image"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import { Breadcrumb } from "@/components/breadcrumb"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { WishlistButton } from "@/components/wishlist-button"
import { StarRating } from "@/components/star-rating"
import { useReviews } from "@/lib/reviews-context"

export default function ShopPage() {
  const { getProductSummary } = useReviews()

  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Shop" }]

  const products = [
    {
      id: "diamond-ring-1",
      name: "Diamond Solitaire Ring",
      price: 1299,
      originalPrice: 1599,
      image: "/images/diamond-solitaire-ring.png",
      badge: "SALE",
      category: "rings",
      metal: "14k White Gold",
      size: "7",
    },
    {
      id: "pearl-earrings-1",
      name: "Pearl Drop Earrings",
      price: 299,
      image: "/images/pearl-drop-earrings.png",
      badge: "NEW",
      category: "earrings",
      metal: "Sterling Silver",
    },
    {
      id: "gold-necklace-1",
      name: "Gold Chain Necklace",
      price: 899,
      originalPrice: 1099,
      image: "/images/gold-chain-necklace.png",
      badge: "20% OFF",
      category: "necklaces",
      metal: "18k Gold",
    },
    {
      id: "silver-bracelet-1",
      name: "Tennis Bracelet",
      price: 1999,
      image: "/images/diamond-tennis-bracelet.png",
      category: "bracelets",
      metal: "White Gold",
    },
    {
      id: "ruby-ring-1",
      name: "Ruby Cocktail Ring",
      price: 799,
      image: "/images/ruby-cocktail-ring.png",
      category: "rings",
      metal: "Rose Gold",
      size: "6",
    },
    {
      id: "diamond-earrings-1",
      name: "Diamond Stud Earrings",
      price: 1199,
      image: "/images/diamond-stud-earrings.png",
      badge: "NEW",
      category: "earrings",
      metal: "Platinum",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        {/* Page Header */}
        <section className="bg-gray-50 py-16 rounded-2xl mb-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-light mb-4">Shop Collection</h1>
            <p className="text-gray-600">Discover our exquisite jewelry pieces</p>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 pb-6">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="rings">Rings</SelectItem>
                  <SelectItem value="necklaces">Necklaces</SelectItem>
                  <SelectItem value="earrings">Earrings</SelectItem>
                  <SelectItem value="bracelets">Bracelets</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Showing {products.length} results</span>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by: Featured" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const summary = getProductSummary(product.id)

              return (
                <div key={product.id} className="group cursor-pointer">
                  <div className="relative bg-gray-50 rounded-lg overflow-hidden mb-4">
                    {product.badge && (
                      <Badge className="absolute top-2 left-2 z-10 bg-orange-500 text-white">{product.badge}</Badge>
                    )}
                    <div className="absolute top-2 right-2 z-10">
                      <WishlistButton product={product} size="sm" className="bg-white/80 hover:bg-white shadow-sm" />
                    </div>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <AddToCartButton product={product} size="sm" className="bg-black text-white hover:bg-gray-800" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-medium mb-2">{product.name}</h3>

                    {/* Rating Display */}
                    {summary.totalReviews > 0 && (
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        <StarRating rating={summary.averageRating} size="sm" />
                        <span className="text-xs text-gray-500">({summary.totalReviews})</span>
                      </div>
                    )}

                    <div className="flex justify-center items-center space-x-2 mb-3">
                      <span className="font-medium">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <AddToCartButton product={product} size="sm" variant="outline" className="flex-1" />
                      <WishlistButton product={product} size="sm" variant="outline" className="px-3" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
