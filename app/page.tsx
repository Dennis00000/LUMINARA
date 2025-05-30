"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ArrowRight, Check, Gift, Truck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { WishlistButton } from "@/components/wishlist-button"

export default function HomePage() {
  const featuredProducts = [
    {
      id: "diamond-solitaire-ring",
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
      id: "pearl-drop-earrings",
      name: "Pearl Drop Earrings",
      price: 299,
      image: "/images/pearl-drop-earrings.png",
      badge: "NEW",
      category: "earrings",
      metal: "Sterling Silver",
    },
    {
      id: "gold-chain-necklace",
      name: "Gold Chain Necklace",
      price: 899,
      originalPrice: 1099,
      image: "/images/gold-chain-necklace.png",
      category: "necklaces",
      metal: "18k Gold",
    },
    {
      id: "tennis-bracelet",
      name: "Tennis Bracelet",
      price: 1999,
      image: "/images/diamond-tennis-bracelet.png",
      category: "bracelets",
      metal: "White Gold",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative h-[500px] lg:h-[600px] bg-gradient-to-r from-amber-50 to-orange-100">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="flex-1 max-w-xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light mb-6 text-gray-800 leading-tight">
              Elegant Jewelry
              <br />
              Collection
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              Discover timeless pieces crafted with love and precision
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                  Shop Now
                </Button>
              </Link>
              <Link href="/collections">
                <Button size="lg" variant="outline" className="px-8 py-3">
                  View Collections
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative h-full hidden md:block">
            <Image
              src="/images/hero-jewelry-model.png"
              alt="Elegant jewelry collection"
              width={800}
              height={600}
              className="absolute right-0 top-0 h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Shop by Category</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our carefully curated collections of fine jewelry
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[
              { name: "RINGS", href: "/shop?category=rings", image: "/images/category-rings.png" },
              { name: "NECKLACES", href: "/shop?category=necklaces", image: "/images/category-necklaces.png" },
              { name: "EARRINGS", href: "/shop?category=earrings", image: "/images/category-earrings.png" },
              { name: "BRACELETS", href: "/shop?category=bracelets", image: "/images/category-bracelets.png" },
            ].map((category) => (
              <Link key={category.name} href={category.href} className="text-center group">
                <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={48}
                    height={48}
                    className="w-10 h-10 lg:w-12 lg:h-12 object-cover rounded-full"
                  />
                </div>
                <span className="text-sm lg:text-base font-medium group-hover:text-gray-600 transition-colors">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Featured Products</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Our most popular and exquisite pieces</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredProducts.map((product, index) => (
              <div key={index} className="group">
                <div className="relative bg-gray-50 rounded-lg overflow-hidden mb-4 aspect-square">
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-xs">
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
          <div className="text-center mt-12">
            <Link href="/shop">
              <Button variant="outline" size="lg" className="px-8">
                View All Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Our Collections</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our signature collections designed for every occasion
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group overflow-hidden rounded-lg">
              <Image
                src="/images/bridal-collection-hero.png"
                alt="Bridal Collection"
                width={700}
                height={500}
                className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl lg:text-3xl font-light mb-4">Bridal Collection</h3>
                  <p className="text-lg mb-6 max-w-md">Celebrate your special day with timeless elegance</p>
                  <Link href="/collections/bridal">
                    <Button variant="outline" className="bg-white text-black hover:bg-gray-100">
                      Explore Collection
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg">
              <Image
                src="/images/luxury-collection-hero.png"
                alt="Luxury Collection"
                width={700}
                height={500}
                className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl lg:text-3xl font-light mb-4">Luxury Collection</h3>
                  <p className="text-lg mb-6 max-w-md">Premium pieces crafted with the finest materials</p>
                  <Link href="/collections/luxury">
                    <Button variant="outline" className="bg-white text-black hover:bg-gray-100">
                      Explore Collection
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 lg:py-20 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Gift className="w-12 h-12 mx-auto mb-4 text-amber-400" />
              <h2 className="text-3xl lg:text-4xl font-light mb-4">Join Our VIP Circle</h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                Be the first to discover new collections, receive exclusive offers, and get expert jewelry care tips
                delivered to your inbox.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="flex items-center justify-center space-x-3">
                <Check className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-sm">Exclusive early access</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Check className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-sm">Special member pricing</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Check className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-sm">Jewelry care guides</span>
              </div>
            </div>

            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 text-black text-base border-0 rounded-lg focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
              </p>
            </div>

            <div className="flex justify-center items-center space-x-8 mt-10 pt-8 border-t border-gray-800">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Truck className="w-4 h-4" />
                <span>Free shipping over $500</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Lifetime warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
