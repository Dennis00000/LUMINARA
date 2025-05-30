"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  userEmail: string
  rating: number
  title: string
  comment: string
  images?: string[]
  verified: boolean
  helpful: number
  notHelpful: number
  status: "pending" | "approved" | "rejected"
  createdAt: string
  updatedAt: string
  moderatorNotes?: string
}

export interface ReviewSummary {
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
  verifiedPurchases: number
}

interface ReviewsState {
  reviews: Review[]
  reviewSummaries: Record<string, ReviewSummary>
  userReviews: Record<string, Review[]>
  loading: boolean
  error: string | null
}

type ReviewsAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "ADD_REVIEW"; payload: Review }
  | { type: "UPDATE_REVIEW"; payload: Review }
  | { type: "DELETE_REVIEW"; payload: string }
  | { type: "LOAD_REVIEWS"; payload: Review[] }
  | { type: "VOTE_HELPFUL"; payload: { reviewId: string; helpful: boolean } }
  | { type: "MODERATE_REVIEW"; payload: { reviewId: string; status: Review["status"]; notes?: string } }

interface ReviewsContextType extends ReviewsState {
  addReview: (review: Omit<Review, "id" | "createdAt" | "updatedAt" | "helpful" | "notHelpful">) => Promise<void>
  updateReview: (reviewId: string, updates: Partial<Review>) => Promise<void>
  deleteReview: (reviewId: string) => Promise<void>
  voteHelpful: (reviewId: string, helpful: boolean) => Promise<void>
  moderateReview: (reviewId: string, status: Review["status"], notes?: string) => Promise<void>
  getProductReviews: (productId: string) => Review[]
  getProductSummary: (productId: string) => ReviewSummary
  getUserReviews: (userId: string) => Review[]
  canUserReview: (userId: string, productId: string) => boolean
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined)

function reviewsReducer(state: ReviewsState, action: ReviewsAction): ReviewsState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }

    case "SET_ERROR":
      return { ...state, error: action.payload }

    case "ADD_REVIEW": {
      const newReviews = [...state.reviews, action.payload]
      return {
        ...state,
        reviews: newReviews,
        reviewSummaries: calculateSummaries(newReviews),
      }
    }

    case "UPDATE_REVIEW": {
      const updatedReviews = state.reviews.map((review) => (review.id === action.payload.id ? action.payload : review))
      return {
        ...state,
        reviews: updatedReviews,
        reviewSummaries: calculateSummaries(updatedReviews),
      }
    }

    case "DELETE_REVIEW": {
      const filteredReviews = state.reviews.filter((review) => review.id !== action.payload)
      return {
        ...state,
        reviews: filteredReviews,
        reviewSummaries: calculateSummaries(filteredReviews),
      }
    }

    case "LOAD_REVIEWS": {
      return {
        ...state,
        reviews: action.payload,
        reviewSummaries: calculateSummaries(action.payload),
      }
    }

    case "VOTE_HELPFUL": {
      const updatedReviews = state.reviews.map((review) => {
        if (review.id === action.payload.reviewId) {
          return {
            ...review,
            helpful: action.payload.helpful ? review.helpful + 1 : review.helpful,
            notHelpful: !action.payload.helpful ? review.notHelpful + 1 : review.notHelpful,
          }
        }
        return review
      })
      return { ...state, reviews: updatedReviews }
    }

    case "MODERATE_REVIEW": {
      const updatedReviews = state.reviews.map((review) => {
        if (review.id === action.payload.reviewId) {
          return {
            ...review,
            status: action.payload.status,
            moderatorNotes: action.payload.notes,
            updatedAt: new Date().toISOString(),
          }
        }
        return review
      })
      return {
        ...state,
        reviews: updatedReviews,
        reviewSummaries: calculateSummaries(updatedReviews),
      }
    }

    default:
      return state
  }
}

function calculateSummaries(reviews: Review[]): Record<string, ReviewSummary> {
  const summaries: Record<string, ReviewSummary> = {}

  // Group reviews by product
  const reviewsByProduct = reviews.reduce(
    (acc, review) => {
      if (review.status === "approved") {
        if (!acc[review.productId]) {
          acc[review.productId] = []
        }
        acc[review.productId].push(review)
      }
      return acc
    },
    {} as Record<string, Review[]>,
  )

  // Calculate summary for each product
  Object.entries(reviewsByProduct).forEach(([productId, productReviews]) => {
    const totalReviews = productReviews.length
    const averageRating = totalReviews > 0 ? productReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews : 0

    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    let verifiedPurchases = 0

    productReviews.forEach((review) => {
      ratingDistribution[review.rating as keyof typeof ratingDistribution]++
      if (review.verified) {
        verifiedPurchases++
      }
    })

    summaries[productId] = {
      averageRating,
      totalReviews,
      ratingDistribution,
      verifiedPurchases,
    }
  })

  return summaries
}

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reviewsReducer, {
    reviews: [],
    reviewSummaries: {},
    userReviews: {},
    loading: false,
    error: null,
  })

  // Load reviews from localStorage on mount
  useEffect(() => {
    const savedReviews = localStorage.getItem("alukas-reviews")
    if (savedReviews) {
      try {
        const reviews = JSON.parse(savedReviews)
        dispatch({ type: "LOAD_REVIEWS", payload: reviews })
      } catch (error) {
        console.error("Error loading reviews from localStorage:", error)
      }
    } else {
      // Load sample reviews for demo
      loadSampleReviews()
    }
  }, [])

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("alukas-reviews", JSON.stringify(state.reviews))
  }, [state.reviews])

  const loadSampleReviews = () => {
    const sampleReviews: Review[] = [
      {
        id: "review-1",
        productId: "diamond-ring-1",
        userId: "user-1",
        userName: "Sarah Johnson",
        userEmail: "sarah@example.com",
        rating: 5,
        title: "Absolutely stunning!",
        comment:
          "This ring exceeded all my expectations. The diamond is brilliant and the setting is perfect. My fiancé did an amazing job picking this out!",
        verified: true,
        helpful: 12,
        notHelpful: 0,
        status: "approved",
        createdAt: "2024-03-10T10:00:00Z",
        updatedAt: "2024-03-10T10:00:00Z",
      },
      {
        id: "review-2",
        productId: "diamond-ring-1",
        userId: "user-2",
        userName: "Emily Chen",
        userEmail: "emily@example.com",
        rating: 4,
        title: "Beautiful ring, great quality",
        comment:
          "The ring is gorgeous and well-made. The only reason I'm giving 4 stars instead of 5 is that it took a bit longer to arrive than expected.",
        verified: true,
        helpful: 8,
        notHelpful: 1,
        status: "approved",
        createdAt: "2024-03-08T14:30:00Z",
        updatedAt: "2024-03-08T14:30:00Z",
      },
      {
        id: "review-3",
        productId: "pearl-earrings-1",
        userId: "user-3",
        userName: "Jessica Williams",
        userEmail: "jessica@example.com",
        rating: 5,
        title: "Perfect for special occasions",
        comment:
          "These pearl earrings are elegant and sophisticated. I've worn them to several formal events and always receive compliments.",
        verified: true,
        helpful: 6,
        notHelpful: 0,
        status: "approved",
        createdAt: "2024-03-05T16:45:00Z",
        updatedAt: "2024-03-05T16:45:00Z",
      },
      {
        id: "review-4",
        productId: "gold-necklace-1",
        userId: "user-4",
        userName: "Michael Brown",
        userEmail: "michael@example.com",
        rating: 3,
        title: "Good quality but not as expected",
        comment:
          "The necklace is well-made but the gold color is slightly different from what I expected from the photos.",
        verified: false,
        helpful: 3,
        notHelpful: 2,
        status: "approved",
        createdAt: "2024-03-03T09:15:00Z",
        updatedAt: "2024-03-03T09:15:00Z",
      },
    ]

    dispatch({ type: "LOAD_REVIEWS", payload: sampleReviews })
  }

  const addReview = async (reviewData: Omit<Review, "id" | "createdAt" | "updatedAt" | "helpful" | "notHelpful">) => {
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      const newReview: Review = {
        ...reviewData,
        id: `review-${Date.now()}`,
        helpful: 0,
        notHelpful: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      dispatch({ type: "ADD_REVIEW", payload: newReview })
      dispatch({ type: "SET_ERROR", payload: null })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to add review" })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const updateReview = async (reviewId: string, updates: Partial<Review>) => {
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      const existingReview = state.reviews.find((r) => r.id === reviewId)
      if (!existingReview) throw new Error("Review not found")

      const updatedReview: Review = {
        ...existingReview,
        ...updates,
        updatedAt: new Date().toISOString(),
      }

      dispatch({ type: "UPDATE_REVIEW", payload: updatedReview })
      dispatch({ type: "SET_ERROR", payload: null })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to update review" })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const deleteReview = async (reviewId: string) => {
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      dispatch({ type: "DELETE_REVIEW", payload: reviewId })
      dispatch({ type: "SET_ERROR", payload: null })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to delete review" })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const voteHelpful = async (reviewId: string, helpful: boolean) => {
    try {
      dispatch({ type: "VOTE_HELPFUL", payload: { reviewId, helpful } })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to vote on review" })
    }
  }

  const moderateReview = async (reviewId: string, status: Review["status"], notes?: string) => {
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      dispatch({ type: "MODERATE_REVIEW", payload: { reviewId, status, notes } })
      dispatch({ type: "SET_ERROR", payload: null })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to moderate review" })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const getProductReviews = (productId: string): Review[] => {
    return state.reviews.filter((review) => review.productId === productId && review.status === "approved")
  }

  const getProductSummary = (productId: string): ReviewSummary => {
    return (
      state.reviewSummaries[productId] || {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        verifiedPurchases: 0,
      }
    )
  }

  const getUserReviews = (userId: string): Review[] => {
    return state.reviews.filter((review) => review.userId === userId)
  }

  const canUserReview = (userId: string, productId: string): boolean => {
    const userProductReviews = state.reviews.filter(
      (review) => review.userId === userId && review.productId === productId,
    )
    return userProductReviews.length === 0
  }

  const value: ReviewsContextType = {
    ...state,
    addReview,
    updateReview,
    deleteReview,
    voteHelpful,
    moderateReview,
    getProductReviews,
    getProductSummary,
    getUserReviews,
    canUserReview,
  }

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
}

export function useReviews() {
  const context = useContext(ReviewsContext)
  if (context === undefined) {
    throw new Error("useReviews must be used within a ReviewsProvider")
  }
  return context
}
