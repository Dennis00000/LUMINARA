"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useSearch } from "@/lib/search-context"
import { ChevronDown, X, Filter, Star } from "lucide-react"

interface SearchFiltersProps {
  className?: string
  showMobileToggle?: boolean
}

export function SearchFilters({ className = "", showMobileToggle = false }: SearchFiltersProps) {
  const { filters, updateFilters, clearFilters, getMetals, getGemstones, getSizes, getBrands, getPriceRange } =
    useSearch()

  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [openSections, setOpenSections] = useState({
    price: true,
    metal: true,
    gemstone: true,
    size: false,
    brand: false,
    rating: false,
    availability: false,
  })

  const metals = getMetals()
  const gemstones = getGemstones()
  const sizes = getSizes()
  const brands = getBrands()
  const [minPrice, maxPrice] = getPriceRange()

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handlePriceChange = (value: number[]) => {
    updateFilters({ priceRange: [value[0], value[1]] })
  }

  const handleMetalChange = (metal: string, checked: boolean) => {
    const newMetals = checked ? [...filters.metals, metal] : filters.metals.filter((m) => m !== metal)
    updateFilters({ metals: newMetals })
  }

  const handleGemstoneChange = (gemstone: string, checked: boolean) => {
    const newGemstones = checked ? [...filters.gemstones, gemstone] : filters.gemstones.filter((g) => g !== gemstone)
    updateFilters({ gemstones: newGemstones })
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked ? [...filters.sizes, size] : filters.sizes.filter((s) => s !== size)
    updateFilters({ sizes: newSizes })
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked ? [...filters.brands, brand] : filters.brands.filter((b) => b !== brand)
    updateFilters({ brands: newBrands })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.priceRange[0] > minPrice || filters.priceRange[1] < maxPrice) count++
    if (filters.metals.length > 0) count++
    if (filters.gemstones.length > 0) count++
    if (filters.sizes.length > 0) count++
    if (filters.brands.length > 0) count++
    if (filters.rating > 0) count++
    if (filters.inStock) count++
    if (filters.isNew) count++
    if (filters.isSale) count++
    if (filters.isFeatured) count++
    return count
  }

  const activeFiltersCount = getActiveFiltersCount()

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Active Filters ({activeFiltersCount})</h4>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.metals.map((metal) => (
              <Badge key={metal} variant="secondary" className="flex items-center space-x-1">
                <span>{metal}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => handleMetalChange(metal, false)} />
              </Badge>
            ))}
            {filters.gemstones.map((gemstone) => (
              <Badge key={gemstone} variant="secondary" className="flex items-center space-x-1">
                <span>{gemstone}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => handleGemstoneChange(gemstone, false)} />
              </Badge>
            ))}
            {filters.sizes.map((size) => (
              <Badge key={size} variant="secondary" className="flex items-center space-x-1">
                <span>Size {size}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => handleSizeChange(size, false)} />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <Collapsible open={openSections.price} onOpenChange={() => toggleSection("price")}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <h4 className="font-medium">Price Range</h4>
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections.price ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-3 pb-3">
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              max={maxPrice}
              min={minPrice}
              step={50}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Metal */}
      <Collapsible open={openSections.metal} onOpenChange={() => toggleSection("metal")}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <h4 className="font-medium">Metal Type</h4>
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections.metal ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-3 pb-3">
          <div className="space-y-3">
            {metals.map((metal) => (
              <div key={metal} className="flex items-center space-x-2">
                <Checkbox
                  id={`metal-${metal}`}
                  checked={filters.metals.includes(metal)}
                  onCheckedChange={(checked) => handleMetalChange(metal, checked as boolean)}
                />
                <label htmlFor={`metal-${metal}`} className="text-sm cursor-pointer">
                  {metal}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Gemstone */}
      <Collapsible open={openSections.gemstone} onOpenChange={() => toggleSection("gemstone")}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <h4 className="font-medium">Gemstone</h4>
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections.gemstone ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-3 pb-3">
          <div className="space-y-3">
            {gemstones.map((gemstone) => (
              <div key={gemstone} className="flex items-center space-x-2">
                <Checkbox
                  id={`gemstone-${gemstone}`}
                  checked={filters.gemstones.includes(gemstone)}
                  onCheckedChange={(checked) => handleGemstoneChange(gemstone, checked as boolean)}
                />
                <label htmlFor={`gemstone-${gemstone}`} className="text-sm cursor-pointer">
                  {gemstone}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Size */}
      {sizes.length > 0 && (
        <Collapsible open={openSections.size} onOpenChange={() => toggleSection("size")}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <h4 className="font-medium">Size</h4>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.size ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-3 pb-3">
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={filters.sizes.includes(size)}
                    onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                  />
                  <label htmlFor={`size-${size}`} className="text-sm cursor-pointer">
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Brand */}
      {brands.length > 0 && (
        <Collapsible open={openSections.brand} onOpenChange={() => toggleSection("brand")}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <h4 className="font-medium">Brand</h4>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.brand ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-3 pb-3">
            <div className="space-y-3">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                  />
                  <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Rating */}
      <Collapsible open={openSections.rating} onOpenChange={() => toggleSection("rating")}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <h4 className="font-medium">Customer Rating</h4>
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections.rating ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-3 pb-3">
          <div className="space-y-3">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.rating === rating}
                  onCheckedChange={(checked) => updateFilters({ rating: checked ? rating : 0 })}
                />
                <label htmlFor={`rating-${rating}`} className="flex items-center space-x-1 text-sm cursor-pointer">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span>& Up</span>
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Availability & Special */}
      <Collapsible open={openSections.availability} onOpenChange={() => toggleSection("availability")}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <h4 className="font-medium">Availability & Special</h4>
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections.availability ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-3 pb-3">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-stock"
                checked={filters.inStock}
                onCheckedChange={(checked) => updateFilters({ inStock: checked as boolean })}
              />
              <label htmlFor="in-stock" className="text-sm cursor-pointer">
                In Stock Only
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is-new"
                checked={filters.isNew}
                onCheckedChange={(checked) => updateFilters({ isNew: checked as boolean })}
              />
              <label htmlFor="is-new" className="text-sm cursor-pointer">
                New Arrivals
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is-sale"
                checked={filters.isSale}
                onCheckedChange={(checked) => updateFilters({ isSale: checked as boolean })}
              />
              <label htmlFor="is-sale" className="text-sm cursor-pointer">
                On Sale
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is-featured"
                checked={filters.isFeatured}
                onCheckedChange={(checked) => updateFilters({ isFeatured: checked as boolean })}
              />
              <label htmlFor="is-featured" className="text-sm cursor-pointer">
                Featured Items
              </label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )

  if (showMobileToggle) {
    return (
      <>
        {/* Mobile Filter Toggle */}
        <Button
          variant="outline"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="md:hidden flex items-center space-x-2"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        {/* Mobile Filter Overlay */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowMobileFilters(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <FilterContent />
              </div>
            </div>
          </div>
        )}

        {/* Desktop Filters */}
        <Card className={`hidden md:block ${className}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Filters</span>
              {activeFiltersCount > 0 && <Badge variant="secondary">{activeFiltersCount}</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FilterContent />
          </CardContent>
        </Card>
      </>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Filters</span>
          {activeFiltersCount > 0 && <Badge variant="secondary">{activeFiltersCount}</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FilterContent />
      </CardContent>
    </Card>
  )
}
