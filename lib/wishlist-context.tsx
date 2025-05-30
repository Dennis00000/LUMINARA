"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

export interface WishlistItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  metal?: string
  size?: string
  dateAdded: string
}

interface WishlistState {
  items: WishlistItem[]
  itemCount: number
}

type WishlistAction =
  | { type: "ADD_ITEM"; payload: Omit<WishlistItem, "dateAdded"> }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_WISHLIST" }
  | { type: "LOAD_WISHLIST"; payload: WishlistItem[] }

interface WishlistContextType extends WishlistState {
  addItem: (item: Omit<WishlistItem, "dateAdded">) => void
  removeItem: (id: string) => void
  clearWishlist: () => void
  isInWishlist: (id: string) => boolean
  toggleWishlist: (item: Omit<WishlistItem, "dateAdded">) => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        return state
      }

      const newItem = {
        ...action.payload,
        dateAdded: new Date().toISOString(),
      }

      return {
        items: [...state.items, newItem],
        itemCount: state.itemCount + 1,
      }
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter((item) => item.id !== action.payload)
      return {
        items: updatedItems,
        itemCount: updatedItems.length,
      }
    }

    case "CLEAR_WISHLIST": {
      return { items: [], itemCount: 0 }
    }

    case "LOAD_WISHLIST": {
      return {
        items: action.payload,
        itemCount: action.payload.length,
      }
    }

    default:
      return state
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    itemCount: 0,
  })

  useEffect(() => {
    const savedWishlist = localStorage.getItem("luminara-wishlist")
    if (savedWishlist) {
      try {
        const wishlistItems = JSON.parse(savedWishlist)
        dispatch({ type: "LOAD_WISHLIST", payload: wishlistItems })
      } catch (error) {
        console.error("Error loading wishlist:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("luminara-wishlist", JSON.stringify(state.items))
  }, [state.items])

  const addItem = (item: Omit<WishlistItem, "dateAdded">) => {
    dispatch({ type: "ADD_ITEM", payload: item })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const clearWishlist = () => {
    dispatch({ type: "CLEAR_WISHLIST" })
  }

  const isInWishlist = (id: string) => {
    return state.items.some((item) => item.id === id)
  }

  const toggleWishlist = (item: Omit<WishlistItem, "dateAdded">) => {
    if (isInWishlist(item.id)) {
      removeItem(item.id)
    } else {
      addItem(item)
    }
  }

  const value: WishlistContextType = {
    ...state,
    addItem,
    removeItem,
    clearWishlist,
    isInWishlist,
    toggleWishlist,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
