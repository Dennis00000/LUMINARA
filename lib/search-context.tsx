"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, useCallback } from "react"

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  category: string
  subcategory?: string
  metal: string
  gemstone?: string
  size?: string
  brand?: string
  description: string
  features: string[]
  inStock: boolean
  stockCount: number
  tags: string[]
  rating: number
  reviewCount: number
  isNew: boolean
  isSale: boolean
  isFeatured: boolean
  createdAt: string
}

export interface SearchFilters {
  query: string
  category: string
  subcategory: string
  priceRange: [number, number]
  metals: string[]
  gemstones: string[]
  sizes: string[]
  brands: string[]
  rating: number
  inStock: boolean
  isNew: boolean
  isSale: boolean
  isFeatured: boolean
}

export interface SortOption {
  value: string
  label: string
}

interface SearchState {
  products: Product[]
  filteredProducts: Product[]
  filters: SearchFilters
  sortBy: string
  loading: boolean
  searchHistory: string[]
  suggestions: string[]
}

type SearchAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "SET_FILTERS"; payload: Partial<SearchFilters> }
  | { type: "SET_SORT"; payload: string }
  | { type: "CLEAR_FILTERS" }
  | { type: "ADD_TO_HISTORY"; payload: string }
  | { type: "SET_SUGGESTIONS"; payload: string[] }
  | { type: "FILTER_PRODUCTS" }

interface SearchContextType extends SearchState {
  updateFilters: (filters: Partial<SearchFilters>) => void
  updateSort: (sortBy: string) => void
  clearFilters: () => void
  search: (query: string) => void
  getCategories: () => string[]
  getSubcategories: (category: string) => string[]
  getMetals: () => string[]
  getGemstones: () => string[]
  getSizes: () => string[]
  getBrands: () => string[]
  getPriceRange: () => [number, number]
  getSearchSuggestions: (query: string) => string[]
}

const defaultFilters: SearchFilters = {
  query: "",
  category: "",
  subcategory: "",
  priceRange: [0, 10000],
  metals: [],
  gemstones: [],
  sizes: [],
  brands: [],
  rating: 0,
  inStock: false,
  isNew: false,
  isSale: false,
  isFeatured: false,
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }

    case "SET_PRODUCTS":
      return { ...state, products: action.payload }

    case "SET_FILTERS":
      const newFilters = { ...state.filters, ...action.payload }
      return { ...state, filters: newFilters }

    case "SET_SORT":
      return { ...state, sortBy: action.payload }

    case "CLEAR_FILTERS":
      return { ...state, filters: defaultFilters }

    case "ADD_TO_HISTORY":
      const newHistory = [action.payload, ...state.searchHistory.filter((h) => h !== action.payload)].slice(0, 10)
      return { ...state, searchHistory: newHistory }

    case "SET_SUGGESTIONS":
      return { ...state, suggestions: action.payload }

    case "FILTER_PRODUCTS":
      return { ...state, filteredProducts: filterProducts(state.products, state.filters, state.sortBy) }

    default:
      return state
  }
}

function filterProducts(products: Product[], filters: SearchFilters, sortBy: string): Product[] {
  const filtered = products.filter((product) => {
    // Text search
    if (filters.query) {
      const query = filters.query.toLowerCase()
      const searchableText =
        `${product.name} ${product.description} ${product.category} ${product.metal} ${product.gemstone || ""} ${product.tags.join(" ")}`.toLowerCase()
      if (!searchableText.includes(query)) return false
    }

    // Category filter
    if (filters.category && product.category !== filters.category) return false

    // Subcategory filter
    if (filters.subcategory && product.subcategory !== filters.subcategory) return false

    // Price range filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false

    // Metal filter
    if (filters.metals.length > 0 && !filters.metals.includes(product.metal)) return false

    // Gemstone filter
    if (filters.gemstones.length > 0 && product.gemstone && !filters.gemstones.includes(product.gemstone)) return false

    // Size filter
    if (filters.sizes.length > 0 && product.size && !filters.sizes.includes(product.size)) return false

    // Brand filter
    if (filters.brands.length > 0 && product.brand && !filters.brands.includes(product.brand)) return false

    // Rating filter
    if (filters.rating > 0 && product.rating < filters.rating) return false

    // Stock filter
    if (filters.inStock && !product.inStock) return false

    // New filter
    if (filters.isNew && !product.isNew) return false

    // Sale filter
    if (filters.isSale && !product.isSale) return false

    // Featured filter
    if (filters.isFeatured && !product.isFeatured) return false

    return true
  })

  // Sort products
  filtered.sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      case "rating":
        return b.rating - a.rating
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "popularity":
        return b.reviewCount - a.reviewCount
      case "featured":
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
      default:
        return 0
    }
  })

  return filtered
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(searchReducer, {
    products: [],
    filteredProducts: [],
    filters: defaultFilters,
    sortBy: "featured",
    loading: false,
    searchHistory: [],
    suggestions: [],
  })

  // Load sample products on mount
  useEffect(() => {
    loadSampleProducts()
  }, [])

  // Memoized filter function to prevent unnecessary re-renders
  const filterProductsCallback = useCallback(() => {
    dispatch({ type: "FILTER_PRODUCTS" })
  }, [])

  // Filter products whenever filters or sort changes
  useEffect(() => {
    if (state.products.length > 0) {
      filterProductsCallback()
    }
  }, [state.filters, state.sortBy, state.products, filterProductsCallback])

  const loadSampleProducts = () => {
    const sampleProducts: Product[] = [
      {
        id: "diamond-solitaire-ring",
        name: "Diamond Solitaire Engagement Ring",
        price: 1299,
        originalPrice: 1599,
        image: "/images/diamond-solitaire-ring.png",
        images: ["/images/diamond-solitaire-ring.png", "/diamond-solitaire-side.png", "/placeholder-l212x.png"],
        category: "rings",
        subcategory: "engagement",
        metal: "14k White Gold",
        gemstone: "Diamond",
        size: "7",
        brand: "Alukas",
        description:
          "Classic diamond solitaire engagement ring with brilliant-cut diamond in premium white gold setting",
        features: ["GIA Certified", "Conflict-free diamond", "Lifetime warranty", "Free resizing"],
        inStock: true,
        stockCount: 15,
        tags: ["engagement", "wedding", "diamond", "classic", "solitaire"],
        rating: 4.8,
        reviewCount: 24,
        isNew: false,
        isSale: true,
        isFeatured: true,
        createdAt: "2024-01-15T00:00:00Z",
      },
      {
        id: "pearl-drop-earrings",
        name: "Freshwater Pearl Drop Earrings",
        price: 299,
        image: "/images/pearl-drop-earrings.png",
        category: "earrings",
        subcategory: "drops",
        metal: "Sterling Silver",
        gemstone: "Pearl",
        brand: "Alukas",
        description: "Elegant freshwater pearl drop earrings in sterling silver with secure backing",
        features: ["Freshwater pearls", "Sterling silver", "Secure backing", "Hypoallergenic"],
        inStock: true,
        stockCount: 8,
        tags: ["pearl", "elegant", "formal", "classic", "drops"],
        rating: 4.6,
        reviewCount: 12,
        isNew: true,
        isSale: false,
        isFeatured: false,
        createdAt: "2024-03-01T00:00:00Z",
      },
      {
        id: "gold-chain-necklace",
        name: "18k Gold Chain Necklace",
        price: 899,
        originalPrice: 1099,
        image: "/images/gold-chain-necklace.png",
        category: "necklaces",
        subcategory: "chains",
        metal: "18k Gold",
        brand: "Alukas",
        description: "Luxurious 18k gold chain necklace, perfect for layering or wearing alone",
        features: ["18k solid gold", "Adjustable length", "Secure clasp", "Italian craftsmanship"],
        inStock: true,
        stockCount: 5,
        tags: ["gold", "chain", "luxury", "layering", "italian"],
        rating: 4.7,
        reviewCount: 18,
        isNew: false,
        isSale: true,
        isFeatured: true,
        createdAt: "2024-02-10T00:00:00Z",
      },
      {
        id: "tennis-bracelet",
        name: "Diamond Tennis Bracelet",
        price: 1999,
        image: "/images/diamond-tennis-bracelet.png",
        category: "bracelets",
        subcategory: "tennis",
        metal: "White Gold",
        gemstone: "Diamond",
        brand: "Alukas",
        description: "Classic diamond tennis bracelet with brilliant-cut diamonds in white gold setting",
        features: ["Round brilliant diamonds", "Secure clasp", "Professional setting", "Certified diamonds"],
        inStock: true,
        stockCount: 3,
        tags: ["diamond", "tennis", "bracelet", "luxury", "brilliant"],
        rating: 4.9,
        reviewCount: 31,
        isNew: false,
        isSale: false,
        isFeatured: true,
        createdAt: "2024-01-20T00:00:00Z",
      },
      {
        id: "ruby-cocktail-ring",
        name: "Ruby Cocktail Ring",
        price: 799,
        image: "/images/ruby-cocktail-ring.png",
        category: "rings",
        subcategory: "cocktail",
        metal: "Rose Gold",
        gemstone: "Ruby",
        size: "6",
        brand: "Alukas",
        description: "Statement ruby cocktail ring in rose gold setting with intricate design details",
        features: ["Natural ruby", "Rose gold setting", "Unique design", "Handcrafted"],
        inStock: true,
        stockCount: 7,
        tags: ["ruby", "cocktail", "statement", "red", "handcrafted"],
        rating: 4.5,
        reviewCount: 9,
        isNew: true,
        isSale: false,
        isFeatured: false,
        createdAt: "2024-03-05T00:00:00Z",
      },
      {
        id: "diamond-stud-earrings",
        name: "Diamond Stud Earrings",
        price: 1199,
        image: "/images/diamond-stud-earrings.png",
        category: "earrings",
        subcategory: "studs",
        metal: "Platinum",
        gemstone: "Diamond",
        brand: "Alukas",
        description: "Classic diamond stud earrings in platinum setting with brilliant-cut diamonds",
        features: ["Platinum setting", "Brilliant-cut diamonds", "Secure backs", "GIA certified"],
        inStock: false,
        stockCount: 0,
        tags: ["diamond", "studs", "classic", "platinum", "brilliant"],
        rating: 4.8,
        reviewCount: 22,
        isNew: true,
        isSale: false,
        isFeatured: false,
        createdAt: "2024-02-28T00:00:00Z",
      },
      {
        id: "emerald-pendant",
        name: "Emerald Pendant Necklace",
        price: 1599,
        image: "/images/emerald-pendant-necklace.png",
        category: "necklaces",
        subcategory: "pendants",
        metal: "14k Yellow Gold",
        gemstone: "Emerald",
        brand: "Alukas",
        description: "Stunning emerald pendant necklace in yellow gold with adjustable chain",
        features: ["Natural emerald", "14k yellow gold", "Adjustable chain", "Colombian emerald"],
        inStock: true,
        stockCount: 4,
        tags: ["emerald", "pendant", "green", "luxury", "colombian"],
        rating: 4.7,
        reviewCount: 15,
        isNew: false,
        isSale: false,
        isFeatured: true,
        createdAt: "2024-01-30T00:00:00Z",
      },
      {
        id: "sapphire-eternity-band",
        name: "Sapphire Eternity Band",
        price: 2299,
        originalPrice: 2599,
        image: "/images/sapphire-eternity-band.png",
        category: "rings",
        subcategory: "eternity",
        metal: "Platinum",
        gemstone: "Sapphire",
        size: "7",
        brand: "Alukas",
        description: "Elegant sapphire eternity band in platinum with continuous blue sapphires",
        features: ["Blue sapphires", "Platinum band", "Eternity design", "Ceylon sapphires"],
        inStock: true,
        stockCount: 6,
        tags: ["sapphire", "eternity", "blue", "wedding", "ceylon"],
        rating: 4.9,
        reviewCount: 27,
        isNew: false,
        isSale: true,
        isFeatured: true,
        createdAt: "2024-02-05T00:00:00Z",
      },
      {
        id: "vintage-pearl-necklace",
        name: "Vintage Pearl Necklace",
        price: 649,
        image: "/images/vintage-pearl-necklace.png",
        category: "necklaces",
        subcategory: "vintage",
        metal: "Sterling Silver",
        gemstone: "Pearl",
        brand: "Alukas",
        description: "Vintage-inspired pearl necklace with multiple strands and ornate clasp",
        features: ["Cultured pearls", "Multi-strand design", "Vintage clasp", "Adjustable length"],
        inStock: true,
        stockCount: 12,
        tags: ["vintage", "pearl", "multi-strand", "classic", "cultured"],
        rating: 4.4,
        reviewCount: 8,
        isNew: false,
        isSale: false,
        isFeatured: false,
        createdAt: "2024-02-15T00:00:00Z",
      },
      {
        id: "gold-hoop-earrings",
        name: "14k Gold Hoop Earrings",
        price: 399,
        image: "/images/gold-hoop-earrings.png",
        category: "earrings",
        subcategory: "hoops",
        metal: "14k Gold",
        brand: "Alukas",
        description: "Modern 14k gold hoop earrings with sleek design and secure closure",
        features: ["14k solid gold", "Secure closure", "Lightweight design", "Hypoallergenic"],
        inStock: true,
        stockCount: 20,
        tags: ["gold", "hoops", "modern", "lightweight", "everyday"],
        rating: 4.6,
        reviewCount: 16,
        isNew: true,
        isSale: false,
        isFeatured: false,
        createdAt: "2024-03-10T00:00:00Z",
      },
      {
        id: "diamond-wedding-band",
        name: "Diamond Wedding Band",
        price: 899,
        image: "/images/diamond-wedding-band.png",
        category: "rings",
        subcategory: "wedding",
        metal: "14k White Gold",
        gemstone: "Diamond",
        size: "6",
        brand: "Alukas",
        description: "Classic diamond wedding band with channel-set diamonds in white gold",
        features: ["Channel-set diamonds", "14k white gold", "Comfort fit", "Matching available"],
        inStock: true,
        stockCount: 18,
        tags: ["wedding", "diamond", "channel-set", "comfort-fit", "bridal"],
        rating: 4.8,
        reviewCount: 35,
        isNew: false,
        isSale: false,
        isFeatured: true,
        createdAt: "2024-01-25T00:00:00Z",
      },
      {
        id: "silver-charm-bracelet",
        name: "Sterling Silver Charm Bracelet",
        price: 199,
        image: "/images/silver-charm-bracelet.png",
        category: "bracelets",
        subcategory: "charm",
        metal: "Sterling Silver",
        brand: "Alukas",
        description: "Sterling silver charm bracelet with various decorative charms and secure clasp",
        features: ["Sterling silver", "Multiple charms", "Secure clasp", "Expandable"],
        inStock: true,
        stockCount: 25,
        tags: ["silver", "charm", "bracelet", "expandable", "gift"],
        rating: 4.3,
        reviewCount: 11,
        isNew: false,
        isSale: false,
        isFeatured: false,
        createdAt: "2024-02-20T00:00:00Z",
      },
    ]

    dispatch({ type: "SET_PRODUCTS", payload: sampleProducts })
  }

  const updateFilters = useCallback((filters: Partial<SearchFilters>) => {
    dispatch({ type: "SET_FILTERS", payload: filters })
  }, [])

  const updateSort = useCallback((sortBy: string) => {
    dispatch({ type: "SET_SORT", payload: sortBy })
  }, [])

  const clearFilters = useCallback(() => {
    dispatch({ type: "CLEAR_FILTERS" })
  }, [])

  const search = useCallback(
    (query: string) => {
      if (query.trim()) {
        dispatch({ type: "ADD_TO_HISTORY", payload: query.trim() })
      }
      updateFilters({ query })
    },
    [updateFilters],
  )

  const getCategories = useCallback((): string[] => {
    const categories = [...new Set(state.products.map((p) => p.category))]
    return categories.sort()
  }, [state.products])

  const getSubcategories = useCallback(
    (category: string): string[] => {
      const subcategories = [
        ...new Set(
          state.products
            .filter((p) => p.category === category)
            .map((p) => p.subcategory)
            .filter(Boolean),
        ),
      ] as string[]
      return subcategories.sort()
    },
    [state.products],
  )

  const getMetals = useCallback((): string[] => {
    const metals = [...new Set(state.products.map((p) => p.metal))]
    return metals.sort()
  }, [state.products])

  const getGemstones = useCallback((): string[] => {
    const gemstones = [...new Set(state.products.map((p) => p.gemstone).filter(Boolean))] as string[]
    return gemstones.sort()
  }, [state.products])

  const getSizes = useCallback((): string[] => {
    const sizes = [...new Set(state.products.map((p) => p.size).filter(Boolean))] as string[]
    return sizes.sort()
  }, [state.products])

  const getBrands = useCallback((): string[] => {
    const brands = [...new Set(state.products.map((p) => p.brand).filter(Boolean))] as string[]
    return brands.sort()
  }, [state.products])

  const getPriceRange = useCallback((): [number, number] => {
    const prices = state.products.map((p) => p.price)
    return [Math.min(...prices), Math.max(...prices)]
  }, [state.products])

  const getSearchSuggestions = useCallback(
    (query: string): string[] => {
      if (!query.trim()) return []

      const suggestions = new Set<string>()
      const lowerQuery = query.toLowerCase()

      state.products.forEach((product) => {
        // Add product names that match
        if (product.name.toLowerCase().includes(lowerQuery)) {
          suggestions.add(product.name)
        }

        // Add categories that match
        if (product.category.toLowerCase().includes(lowerQuery)) {
          suggestions.add(product.category)
        }

        // Add tags that match
        product.tags.forEach((tag) => {
          if (tag.toLowerCase().includes(lowerQuery)) {
            suggestions.add(tag)
          }
        })

        // Add metals that match
        if (product.metal.toLowerCase().includes(lowerQuery)) {
          suggestions.add(product.metal)
        }

        // Add gemstones that match
        if (product.gemstone && product.gemstone.toLowerCase().includes(lowerQuery)) {
          suggestions.add(product.gemstone)
        }
      })

      return Array.from(suggestions).slice(0, 8)
    },
    [state.products],
  )

  const value: SearchContextType = {
    ...state,
    updateFilters,
    updateSort,
    clearFilters,
    search,
    getCategories,
    getSubcategories,
    getMetals,
    getGemstones,
    getSizes,
    getBrands,
    getPriceRange,
    getSearchSuggestions,
  }

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}
