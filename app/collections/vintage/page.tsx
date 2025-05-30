"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Clock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { WishlistButton } from "@/components/wishlist-button"

export default function VintageCollectionPage() {
  const vintageProducts = [
    {
      id: "vintage-pearl-necklace",
      name: "Vintage Pearl Necklace",
      price: 649,
      image: "/images/vintage-pearl-necklace.png",
      badge: "VINTAGE",
      category: "necklaces",
      metal: "Sterling Silver",
    },
    {
      id: "ruby-cocktail-ring",
      name: "Art Deco Ruby Ring",
      price: 799,
      image: "/images/ruby-cocktail-ring.png",
      category: "rings",
      metal: "Rose Gold",
      size: "6",
    },
    {
      id: "gold-chain-necklace",
      name: "Victorian Gold Chain",
      price: 899,
      originalPrice: 1099,
      image: "/images/gold-chain-necklace.png",
      badge: "RARE",
      category: "necklaces",
      metal: "18k Gold",
    },
    {
      id: "silver-charm-bracelet",
      name: "Vintage Charm Bracelet",
      price: 199,
      image: "/images/silver-charm-bracelet.png",
      category: "bracelets",
      metal: "Sterling Silver",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] lg:h-[500px] bg-gradient-to-r from-purple-50 to-indigo-100">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-gray-800 leading-tight">
              Vintage Collection
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              Discover timeless treasures from bygone eras. Our vintage collection features authentic antique pieces and
              vintage-inspired designs that capture the romance and elegance of the past.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/search?category=necklaces&subcategory=vintage">
                <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                  Shop Vintage Pieces
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="px-8 py-3">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative h-full hidden md:block">
            <Image
              src="/images/vintage-collection-hero.png"
              alt="Vintage jewelry collection"
              width={800}
              height={500}
              className="absolute right-0 top-0 h-full w-full object-cover object-center rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Curated Vintage Pieces</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Each piece tells a story from a different era</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {vintageProducts.map((product, index) => (
              <div key={index} className="group">
                <div className="relative bg-gray-50 rounded-lg overflow-hidden mb-4 aspect-square">
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 z-10 bg-purple-600 text-white text-xs">
                      {product.badge}
                    </Badge>
                  )}
                  <div className="absolute top-3 right-3 z-10">
                    <WishlistButton product={product} size="sm" className="bg-white/80 hover:bg-white shadow-sm" />
                  </div>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <AddToCartButton product={product} size="sm" className="bg-black text-white hover:bg-gray-800" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <h3 className="text-sm lg:text-base font-medium mb-2">{product.name}</h3>
                  <div className="flex justify-center items-center space-x-2 mb-3">
                    <span className="font-medium text-lg">${product.price.toFixed(2)}</span>
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
            ))}
          </div>
        </div>
      </section>

      {/* Vintage Eras */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Explore Different Eras</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Journey through time with our vintage jewelry from different periods
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Victorian Era</h3>
              <p className="text-gray-600 mb-4">
                Romantic and ornate designs from the 1800s featuring intricate details
              </p>
              <Link href="/search?tags=victorian">
                <Button variant="outline" size="sm">
                  Explore Victorian
                </Button>
              </Link>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Art Deco</h3>
              <p className="text-gray-600 mb-4">Bold geometric designs from the 1920s and 1930s</p>
              <Link href="/search?tags=art-deco">
                <Button variant="outline" size="sm">
                  Explore Art Deco
                </Button>
              </Link>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Mid-Century</h3>
              <p className="text-gray-600 mb-4">Clean lines and modern aesthetics from the 1950s-60s</p>
              <Link href="/search?tags=mid-century">
                <Button variant="outline" size="sm">
                  Explore Mid-Century
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
