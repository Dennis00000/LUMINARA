"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearch } from "@/lib/search-context"

interface CategoryNavigationProps {
  className?: string
  orientation?: "horizontal" | "vertical"
  showSubcategories?: boolean
}

export function CategoryNavigation({
  className = "",
  orientation = "horizontal",
  showSubcategories = true,
}: CategoryNavigationProps) {
  const { getCategories, getSubcategories, updateFilters, filters } = useSearch()
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  const categories = getCategories()

  const categoryConfig = {
    rings: {
      label: "Rings",
      icon: "💍",
      description: "Engagement, wedding, and fashion rings",
    },
    necklaces: {
      label: "Necklaces",
      icon: "📿",
      description: "Chains, pendants, and statement pieces",
    },
    earrings: {
      label: "Earrings",
      icon: "👂",
      description: "Studs, hoops, and drop earrings",
    },
    bracelets: {
      label: "Bracelets",
      icon: "⌚",
      description: "Tennis, charm, and cuff bracelets",
    },
    watches: {
      label: "Watches",
      icon: "⌚",
      description: "Luxury timepieces and accessories",
    },
  }

  const handleCategoryClick = (category: string) => {
    // Preserve existing search query if any
    const currentQuery = searchParams.get("q") || searchParams.get("query") || ""

    updateFilters({
      category,
      subcategory: "",
      query: currentQuery,
    })

    // Build URL with preserved query
    const params = new URLSearchParams()
    if (currentQuery) params.set("q", currentQuery)
    params.set("category", category)

    router.push(`/search?${params.toString()}`)
  }

  const handleSubcategoryClick = (category: string, subcategory: string) => {
    // Preserve existing search query if any
    const currentQuery = searchParams.get("q") || searchParams.get("query") || ""

    updateFilters({
      category,
      subcategory,
      query: currentQuery,
    })

    // Build URL with preserved query
    const params = new URLSearchParams()
    if (currentQuery) params.set("q", currentQuery)
    params.set("category", category)
    params.set("subcategory", subcategory)

    router.push(`/search?${params.toString()}`)
  }

  const handleAllProductsClick = () => {
    // Preserve existing search query if any
    const currentQuery = searchParams.get("q") || searchParams.get("query") || ""

    updateFilters({
      category: "",
      subcategory: "",
      query: currentQuery,
    })

    // Build URL with preserved query
    const params = new URLSearchParams()
    if (currentQuery) params.set("q", currentQuery)

    const url = params.toString() ? `/search?${params.toString()}` : "/search"
    router.push(url)
  }

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  if (orientation === "horizontal") {
    return (
      <nav className={`${className}`}>
        <div className="flex items-center space-x-8 overflow-x-auto">
          {/* All Products */}
          <Button
            variant="ghost"
            onClick={handleAllProductsClick}
            className={`whitespace-nowrap transition-colors ${
              !filters.category ? "text-black font-medium" : "text-gray-600 hover:text-black"
            }`}
          >
            All Products
          </Button>

          {categories.map((category) => {
            const config = categoryConfig[category as keyof typeof categoryConfig]
            const subcategories = getSubcategories(category)
            const isActive = filters.category === category

            return (
              <div key={category} className="relative group">
                <Button
                  variant="ghost"
                  onClick={() => handleCategoryClick(category)}
                  className={`flex items-center space-x-2 whitespace-nowrap transition-colors ${
                    isActive ? "text-black font-medium" : "text-gray-600 hover:text-black"
                  }`}
                >
                  <span className="text-lg">{config?.icon}</span>
                  <span className="capitalize">{config?.label || category}</span>
                  {showSubcategories && subcategories.length > 0 && <ChevronDown className="w-4 h-4" />}
                </Button>

                {/* Dropdown for subcategories */}
                {showSubcategories && subcategories.length > 0 && (
                  <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-2">
                      <div className="p-3 border-b border-gray-100">
                        <h4 className="font-medium capitalize">{config?.label || category}</h4>
                        <p className="text-sm text-gray-500">{config?.description}</p>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={() => handleCategoryClick(category)}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md transition-colors"
                        >
                          All {config?.label || category}
                        </button>
                        {subcategories.map((subcategory) => (
                          <button
                            key={subcategory}
                            onClick={() => handleSubcategoryClick(category, subcategory)}
                            className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md transition-colors capitalize"
                          >
                            {subcategory}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </nav>
    )
  }

  // Vertical orientation
  return (
    <nav className={`space-y-2 ${className}`}>
      {/* All Products */}
      <Button
        variant="ghost"
        onClick={handleAllProductsClick}
        className={`w-full justify-start transition-colors ${
          !filters.category ? "text-black font-medium bg-gray-100" : "text-gray-600 hover:text-black hover:bg-gray-50"
        }`}
      >
        All Products
      </Button>

      {categories.map((category) => {
        const config = categoryConfig[category as keyof typeof categoryConfig]
        const subcategories = getSubcategories(category)
        const isExpanded = expandedCategory === category
        const isActive = filters.category === category

        return (
          <div key={category}>
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => handleCategoryClick(category)}
                className={`flex items-center space-x-2 flex-1 justify-start transition-colors ${
                  isActive ? "text-black font-medium bg-gray-100" : "text-gray-600 hover:text-black hover:bg-gray-50"
                }`}
              >
                <span className="text-lg">{config?.icon}</span>
                <span className="capitalize">{config?.label || category}</span>
              </Button>

              {showSubcategories && subcategories.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => toggleCategory(category)} className="p-1">
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </Button>
              )}
            </div>

            {/* Subcategories */}
            {showSubcategories && isExpanded && subcategories.length > 0 && (
              <div className="ml-6 mt-2 space-y-1">
                {subcategories.map((subcategory) => {
                  const isSubActive = filters.category === category && filters.subcategory === subcategory

                  return (
                    <Button
                      key={subcategory}
                      variant="ghost"
                      onClick={() => handleSubcategoryClick(category, subcategory)}
                      className={`w-full justify-start text-sm transition-colors ${
                        isSubActive
                          ? "text-black font-medium bg-gray-100"
                          : "text-gray-500 hover:text-black hover:bg-gray-50"
                      }`}
                    >
                      <span className="capitalize">{subcategory}</span>
                    </Button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
