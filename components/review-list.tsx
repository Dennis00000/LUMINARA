"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StarRating } from "@/components/star-rating"
import { useReviews } from "@/lib/reviews-context"
import { ThumbsUp, ThumbsDown, Shield, Flag, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ReviewListProps {
  productId: string
  className?: string
}

export function ReviewList({ productId, className = "" }: ReviewListProps) {
  const { getProductReviews, voteHelpful } = useReviews()
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")

  const allReviews = getProductReviews(productId)

  // Filter reviews
  const filteredReviews = allReviews.filter((review) => {
    if (filterBy === "all") return true
    if (filterBy === "verified") return review.verified
    if (filterBy === "5-star") return review.rating === 5
    if (filterBy === "4-star") return review.rating === 4
    if (filterBy === "3-star") return review.rating === 3
    if (filterBy === "2-star") return review.rating === 2
    if (filterBy === "1-star") return review.rating === 1
    return true
  })

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case "highest":
        return b.rating - a.rating
      case "lowest":
        return a.rating - b.rating
      case "helpful":
        return b.helpful - a.helpful
      default:
        return 0
    }
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleVoteHelpful = (reviewId: string, helpful: boolean) => {
    voteHelpful(reviewId, helpful)
  }

  if (allReviews.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500 text-lg">No reviews yet</p>
        <p className="text-gray-400">Be the first to share your experience</p>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reviews</SelectItem>
              <SelectItem value="verified">Verified Only</SelectItem>
              <SelectItem value="5-star">5 Stars</SelectItem>
              <SelectItem value="4-star">4 Stars</SelectItem>
              <SelectItem value="3-star">3 Stars</SelectItem>
              <SelectItem value="2-star">2 Stars</SelectItem>
              <SelectItem value="1-star">1 Star</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm text-gray-600">
          Showing {sortedReviews.length} of {allReviews.length} reviews
        </p>
      </div>

      {/* Reviews */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-lg p-6">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">{review.userName.charAt(0)}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{review.userName}</h4>
                    {review.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Flag className="w-4 h-4 mr-2" />
                    Report Review
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Rating and Title */}
            <div className="mb-3">
              <div className="flex items-center space-x-3 mb-2">
                <StarRating rating={review.rating} size="sm" />
                <h3 className="font-medium">{review.title}</h3>
              </div>
            </div>

            {/* Review Content */}
            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>

            {/* Review Images */}
            {review.images && review.images.length > 0 && (
              <div className="mb-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {review.images.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`Review image ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Review Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleVoteHelpful(review.id, true)}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-green-600 transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Helpful ({review.helpful})</span>
                </button>
                <button
                  onClick={() => handleVoteHelpful(review.id, false)}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span>Not Helpful ({review.notHelpful})</span>
                </button>
              </div>

              {review.helpful > 5 && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Helpful Review
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {sortedReviews.length < allReviews.length && (
        <div className="text-center mt-8">
          <Button variant="outline">Load More Reviews</Button>
        </div>
      )}
    </div>
  )
}
