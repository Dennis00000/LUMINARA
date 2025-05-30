"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, X, Clock, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSearch } from "@/lib/search-context"
import { useRouter, useSearchParams } from "next/navigation"

interface SearchBarProps {
  className?: string
  placeholder?: string
  showSuggestions?: boolean
}

export function SearchBar({
  className = "",
  placeholder = "Search jewelry...",
  showSuggestions = true,
}: SearchBarProps) {
  const { filters, search, searchHistory, getSearchSuggestions } = useSearch()
  const [query, setQuery] = useState(filters.query)
  const [showDropdown, setShowDropdown] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setQuery(filters.query)
  }, [filters.query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInputChange = (value: string) => {
    setQuery(value)

    if (showSuggestions && value.trim()) {
      const newSuggestions = getSearchSuggestions(value)
      setSuggestions(newSuggestions)
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }

  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      search(searchQuery.trim())
      setShowDropdown(false)

      // Build URL with search query and preserve other filters
      const params = new URLSearchParams()
      params.set("q", searchQuery.trim())

      // Preserve category if it exists
      const currentCategory = searchParams.get("category")
      if (currentCategory) params.set("category", currentCategory)

      router.push(`/search?${params.toString()}`)
    } else {
      // If empty search, go to search page without query
      const params = new URLSearchParams()
      const currentCategory = searchParams.get("category")
      if (currentCategory) params.set("category", currentCategory)

      const url = params.toString() ? `/search?${params.toString()}` : "/search"
      router.push(url)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    handleSearch(suggestion)
  }

  const clearSearch = () => {
    setQuery("")
    search("")
    setShowDropdown(false)

    // Navigate to search page without query but preserve category
    const params = new URLSearchParams()
    const currentCategory = searchParams.get("category")
    if (currentCategory) params.set("category", currentCategory)

    const url = params.toString() ? `/search?${params.toString()}` : "/search"
    router.push(url)
  }

  const popularSearches = ["diamond rings", "pearl earrings", "gold necklace", "wedding bands"]

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => showSuggestions && setShowDropdown(true)}
          placeholder={placeholder}
          className="pl-10 pr-10 border-gray-300 focus:border-black focus:ring-black"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 h-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Search Dropdown */}
      {showDropdown && showSuggestions && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-96 overflow-y-auto">
          {/* Current Query */}
          {query.trim() && (
            <div className="p-3 border-b border-gray-100">
              <button
                onClick={() => handleSearch()}
                className="flex items-center space-x-3 w-full text-left hover:bg-gray-50 p-2 rounded-md transition-colors"
              >
                <Search className="w-4 h-4 text-gray-400" />
                <span>
                  Search for "<strong>{query}</strong>"
                </span>
              </button>
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-3 border-b border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Suggestions</h4>
              <div className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex items-center space-x-3 w-full text-left hover:bg-gray-50 p-2 rounded-md transition-colors"
                  >
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="capitalize">{suggestion}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search History */}
          {searchHistory.length > 0 && !query.trim() && (
            <div className="p-3 border-b border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Searches</h4>
              <div className="space-y-1">
                {searchHistory.slice(0, 5).map((historyItem, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(historyItem)}
                    className="flex items-center space-x-3 w-full text-left hover:bg-gray-50 p-2 rounded-md transition-colors"
                  >
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{historyItem}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          {!query.trim() && (
            <div className="p-3">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Popular Searches</h4>
              <div className="space-y-1">
                {popularSearches.map((popular, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(popular)}
                    className="flex items-center space-x-3 w-full text-left hover:bg-gray-50 p-2 rounded-md transition-colors"
                  >
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="capitalize">{popular}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
