"use client"

import Link from "next/link"
import { Heart, ShoppingBag, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SearchBar } from "@/components/search-bar"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"

export default function Header() {
  const { itemCount } = useCart()
  const { itemCount: wishlistCount } = useWishlist()

  return (
    <>
      <div className="bg-black text-white text-xs py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <span>Free Shipping Over $500</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">30-Day Returns</span>
          </div>
          <div className="flex space-x-4">
            <Link href="/contact" className="hover:text-gray-300 transition-colors">
              Store Locator
            </Link>
            <span className="hidden sm:inline">•</span>
            <span className="hidden md:inline">(555) 123-4567</span>
            <span className="hidden sm:inline">•</span>
            <Link href="/account" className="hover:text-gray-300 transition-colors">
              My Account
            </Link>
          </div>
        </div>
      </div>

      <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl lg:text-3xl font-light tracking-wider cursor-pointer hover:text-gray-600 transition-colors">
                LUMINARA
              </h1>
            </Link>

            <div className="hidden lg:block flex-1 max-w-2xl mx-8">
              <SearchBar placeholder="Search for jewelry, diamonds, gold..." />
            </div>

            <nav className="hidden lg:flex space-x-8 text-sm font-medium">
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:text-gray-600 transition-colors py-2 flex items-center">
                  SHOP
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/search" className="w-full">
                      All Products
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/search?category=rings" className="w-full">
                      Rings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/search?category=necklaces" className="w-full">
                      Necklaces
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/search?category=earrings" className="w-full">
                      Earrings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/search?category=bracelets" className="w-full">
                      Bracelets
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/collections" className="w-full">
                      View All Collections
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="hover:text-gray-600 transition-colors py-2 flex items-center">
                  COLLECTIONS
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/collections/bridal" className="w-full">
                      Bridal Collection
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/collections/luxury" className="w-full">
                      Luxury Collection
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/collections/vintage" className="w-full">
                      Vintage Collection
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/collections/custom" className="w-full">
                      Custom Design
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/about" className="hover:text-gray-600 transition-colors py-2">
                ABOUT
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="hover:text-gray-600 transition-colors py-2 flex items-center">
                  SERVICES
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/services/custom-design" className="w-full">
                      Custom Design
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/services/repair" className="w-full">
                      Repair & Restoration
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/services/appraisal" className="w-full">
                      Appraisal Services
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/services/cleaning" className="w-full">
                      Cleaning & Care
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/blog" className="hover:text-gray-600 transition-colors py-2">
                BLOG
              </Link>

              <Link href="/contact" className="hover:text-gray-600 transition-colors py-2">
                CONTACT
              </Link>
            </nav>

            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="lg:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-2">
                      <Menu className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/search" className="w-full">
                        Shop All
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/search?category=rings" className="w-full">
                        Rings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/search?category=necklaces" className="w-full">
                        Necklaces
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/search?category=earrings" className="w-full">
                        Earrings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/search?category=bracelets" className="w-full">
                        Bracelets
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/collections" className="w-full">
                        Collections
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/about" className="w-full">
                        About
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/blog" className="w-full">
                        Blog
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/contact" className="w-full">
                        Contact
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="w-full">
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders" className="w-full">
                      Order History
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/wishlist" className="w-full">
                      Wishlist
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/settings" className="w-full">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="w-full">
                      Sign In
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register" className="w-full">
                      Register
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/account/wishlist" className="relative">
                <Button variant="ghost" size="sm" className="p-2">
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {wishlistCount > 99 ? "99+" : wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>

              <Link href="/cart" className="relative">
                <Button variant="ghost" size="sm" className="p-2">
                  <ShoppingBag className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {itemCount > 99 ? "99+" : itemCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:hidden border-t border-gray-200 p-4">
          <SearchBar placeholder="Search for jewelry, diamonds, gold..." />
        </div>
      </header>
    </>
  )
}
