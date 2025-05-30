"use client"

import { useEffect, useRef, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { SearchFilters } from "@/components/search-filters"
import { SortDropdown } from "@/components/sort-dropdown"
import { CategoryNavigation } from "@/components/category-navigation"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { WishlistButton } from "@/components/wishlist-button"
import { StarRating } from "@/components/star-rating"
import { Breadcrumb } from "@/components/breadcrumb"
import { useSearch } from "@/lib/search-context"
import { useState } from "react"

export default function SearchPage() {
  const { filteredProducts, filters, loading, updateFilters, clearFilters } = useSearch()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const searchParams = useSearchParams()
  const router = useRouter()
  const isInitialized = useRef(false)
  const isUpdatingFromURL = useRef(false)

  // Initialize filters from URL parameters on mount only
  useEffect(() => {
    if (isInitialized.current) return

    const urlFilters: any = {}
    let hasFilters = false

    // Get search query
    const query = searchParams.get("q") || searchParams.get("query") || ""
    if (query) {
      urlFilters.query = query
      hasFilters = true
    }

    // Get category
    const category = searchParams.get("category") || ""
    if (category) {
      urlFilters.category = category
      hasFilters = true
    }

    // Get subcategory
    const subcategory = searchParams.get("subcategory") || ""
    if (subcategory) {
      urlFilters.subcategory = subcategory
      hasFilters = true
    }

    // Get price range
    const minPrice = searchParams.get("min_price")
    const maxPrice = searchParams.get("max_price")
    if (minPrice || maxPrice) {
      urlFilters.priceRange = [minPrice ? Number.parseInt(minPrice) : 0, maxPrice ? Number.parseInt(maxPrice) : 10000]
      hasFilters = true
    }

    // Get metals
    const metals = searchParams.get("metals")
    if (metals) {
      urlFilters.metals = metals.split(",")
      hasFilters = true
    }

    // Get gemstones
    const gemstones = searchParams.get("gemstones")
    if (gemstones) {
      urlFilters.gemstones = gemstones.split(",")
      hasFilters = true
    }

    // Get sizes
    const sizes = searchParams.get("sizes")
    if (sizes) {
      urlFilters.sizes = sizes.split(",")
      hasFilters = true
    }

    // Get brands
    const brands = searchParams.get("brands")
    if (brands) {
      urlFilters.brands = brands.split(",")
      hasFilters = true
    }

    // Get rating
    const rating = searchParams.get("rating")
    if (rating) {
      urlFilters.rating = Number.parseInt(rating)
      hasFilters = true
    }

    // Get boolean filters
    const inStock = searchParams.get("in_stock")
    if (inStock) {
      urlFilters.inStock = inStock === "true"
      hasFilters = true
    }

    const isNew = searchParams.get("new")
    if (isNew) {
      urlFilters.isNew = isNew === "true"
      hasFilters = true
    }

    const isSale = searchParams.get("sale")
    if (isSale) {
      urlFilters.isSale = isSale === "true"
      hasFilters = true
    }

    const isFeatured = searchParams.get("featured")
    if (isFeatured) {
      urlFilters.isFeatured = isFeatured === "true"
      hasFilters = true
    }

    // Update filters if we have URL parameters
    if (hasFilters) {
      isUpdatingFromURL.current = true
      updateFilters(urlFilters)
      setTimeout(() => {
        isUpdatingFromURL.current = false
      }, 100)
    }

    isInitialized.current = true
  }, []) // Empty dependency array - only run once on mount

  // Update URL when filters change (but not when updating from URL)
  const updateURL = useCallback(() => {
    if (isUpdatingFromURL.current) return

    const params = new URLSearchParams()

    if (filters.query) params.set("q", filters.query)
    if (filters.category) params.set("category", filters.category)
    if (filters.subcategory) params.set("subcategory", filters.subcategory)

    if (filters.priceRange[0] > 0) params.set("min_price", filters.priceRange[0].toString())
    if (filters.priceRange[1] < 10000) params.set("max_price", filters.priceRange[1].toString())

    if (filters.metals.length > 0) params.set("metals", filters.metals.join(","))
    if (filters.gemstones.length > 0) params.set("gemstones", filters.gemstones.join(","))
    if (filters.sizes.length > 0) params.set("sizes", filters.sizes.join(","))
    if (filters.brands.length > 0) params.set("brands", filters.brands.join(","))

    if (filters.rating > 0) params.set("rating", filters.rating.toString())
    if (filters.inStock) params.set("in_stock", "true")
    if (filters.isNew) params.set("new", "true")
    if (filters.isSale) params.set("sale", "true")
    if (filters.isFeatured) params.set("featured", "true")

    const newUrl = params.toString() ? `/search?${params.toString()}` : "/search"
    router.replace(newUrl, { scroll: false })
  }, [filters, router])

  // Debounced URL update
  useEffect(() => {
    if (!isInitialized.current || isUpdatingFromURL.current) return

    const timeoutId = setTimeout(updateURL, 300)
    return () => clearTimeout(timeoutId)
  }, [updateURL])

  const hasActiveFilters =
    filters.query ||
    filters.category ||
    filters.subcategory ||
    filters.metals.length > 0 ||
    filters.gemstones.length > 0 ||
    filters.sizes.length > 0 ||
    filters.brands.length > 0 ||
    filters.rating > 0 ||
    filters.inStock ||
    filters.isNew ||
    filters.isSale ||
    filters.isFeatured ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 10000

  const getPageTitle = () => {
    if (filters.query) return `Search results for "${filters.query}"`
    if (filters.category && filters.subcategory) {
      return `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)} - ${filters.subcategory.charAt(0).toUpperCase() + filters.subcategory.slice(1)}`
    }
    if (filters.category) {
      return `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}`
    }
    return "All Products"
  }

  const handleClearAllFilters = () => {
    clearFilters()
    router.replace("/search", { scroll: false })
  }

  // Generate breadcrumb items
  const getBreadcrumbItems = () => {
    const items = [{ href: "/", label: "Home" }]

    if (filters.query) {
      items.push({ label: `Search: "${filters.query}"` })
    } else if (filters.category) {
      items.push({ href: "/shop", label: "Shop" })
      if (filters.subcategory) {
        items.push({
          href: `/search?category=${filters.category}`,
          label: filters.category.charAt(0).toUpperCase() + filters.category.slice(1),
        })
        items.push({
          label: filters.subcategory.charAt(0).toUpperCase() + filters.subcategory.slice(1),
        })
      } else {
        items.push({
          label: filters.category.charAt(0).toUpperCase() + filters.category.slice(1),
        })
      }
    } else {
      items.push({ label: "Search" })
    }

    return items
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <Breadcrumb items={getBreadcrumbItems()} />
        </div>
      </div>

      {/* Category Navigation */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <CategoryNavigation orientation="horizontal" />
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <SearchFilters showMobileToggle />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-light">{getPageTitle()}</h1>
                  <p className="text-gray-600">
                    {loading ? "Loading..." : `Showing ${filteredProducts.length} results`}
                    {hasActiveFilters && (
                      <button onClick={handleClearAllFilters} className="ml-2 text-blue-600 hover:underline text-sm">
                        Clear all filters
                      </button>
                    )}
                  </p>
                </div>

                {/* View Mode Toggle */}
                <div className="hidden md:flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Sort and Filter Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-4">
                  <SearchFilters showMobileToggle />
                </div>
                <SortDropdown />
              </div>
            </div>

            {/* Products Grid/List */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  {hasActiveFilters
                    ? "Try adjusting your search criteria or browse our categories"
                    : "Browse our categories to discover beautiful jewelry"}
                </p>
                {hasActiveFilters ? (
                  <Button onClick={handleClearAllFilters}>Clear All Filters</Button>
                ) : (
                  <Button onClick={() => router.push("/collections")}>Browse Collections</Button>
                )}
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={
                      viewMode === "grid"
                        ? "group cursor-pointer"
                        : "flex items-center space-x-6 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    }
                  >
                    {/* Product Image */}
                    <div
                      className={
                        viewMode === "grid"
                          ? "relative bg-gray-50 rounded-lg overflow-hidden mb-4 aspect-square"
                          : "relative bg-gray-50 rounded-lg overflow-hidden w-32 h-32 flex-shrink-0"
                      }
                    >
                      {/* Badges */}
                      <div className="absolute top-2 left-2 z-10 flex flex-col space-y-1">
                        {product.isNew && <Badge className="bg-green-500 text-white text-xs">NEW</Badge>}
                        {product.isSale && <Badge className="bg-red-500 text-white text-xs">SALE</Badge>}
                        {product.isFeatured && <Badge className="bg-purple-500 text-white text-xs">FEATURED</Badge>}
                        {!product.inStock && (
                          <Badge variant="secondary" className="text-xs">
                            OUT OF STOCK
                          </Badge>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <div className="absolute top-2 right-2 z-10">
                        <WishlistButton product={product} size="sm" className="bg-white/80 hover:bg-white shadow-sm" />
                      </div>

                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={viewMode === "grid" ? 400 : 128}
                        height={viewMode === "grid" ? 400 : 128}
                        className={`w-full h-full object-cover ${
                          viewMode === "grid" ? "group-hover:scale-105" : ""
                        } transition-transform duration-300`}
                      />

                      {/* Quick Add to Cart - Grid View Only */}
                      {viewMode === "grid" && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <AddToCartButton
                            product={product}
                            size="sm"
                            className="bg-black text-white hover:bg-gray-800"
                          />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className={viewMode === "grid" ? "text-center" : "flex-1"}>
                      <h3 className={`font-medium mb-2 ${viewMode === "grid" ? "text-sm" : "text-lg"}`}>
                        {product.name}
                      </h3>

                      {/* Rating */}
                      {product.reviewCount > 0 && (
                        <div
                          className={`flex items-center mb-2 ${viewMode === "grid" ? "justify-center" : ""} space-x-1`}
                        >
                          <StarRating rating={product.rating} size="sm" />
                          <span className="text-xs text-gray-500">({product.reviewCount})</span>
                        </div>
                      )}

                      {/* Product Details */}
                      <div className={`text-sm text-gray-600 mb-3 ${viewMode === "list" ? "space-y-1" : ""}`}>
                        <p className="capitalize">{product.category}</p>
                        <p>{product.metal}</p>
                        {product.gemstone && <p>{product.gemstone}</p>}
                        {product.size && <p>Size: {product.size}</p>}
                      </div>

                      {/* Price */}
                      <div
                        className={`flex items-center space-x-2 mb-3 ${viewMode === "grid" ? "justify-center" : ""}`}
                      >
                        <span className={`font-medium ${viewMode === "grid" ? "text-base" : "text-lg"}`}>
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through text-sm">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Stock Status */}
                      {!product.inStock && <p className="text-red-600 text-sm mb-3">Out of Stock</p>}

                      {/* Actions */}
                      <div className={`flex space-x-2 ${viewMode === "grid" ? "justify-center" : ""}`}>
                        <AddToCartButton
                          product={product}
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          disabled={!product.inStock}
                        />
                        <WishlistButton product={product} size="sm" variant="outline" className="px-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More / Pagination */}
            {filteredProducts.length > 0 && filteredProducts.length >= 12 && (
              <div className="mt-12 text-center">
                <Button variant="outline" size="lg">
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
