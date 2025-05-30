"use client"

import { StarRating } from "@/components/star-rating"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useReviews } from "@/lib/reviews-context"
import { Shield, Star } from "lucide-react"

interface ReviewSummaryProps {
  productId: string
  className?: string
}

export function ReviewSummary({ productId, className = "" }: ReviewSummaryProps) {
  const { getProductSummary } = useReviews()
  const summary = getProductSummary(productId)

  if (summary.totalReviews === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500">No reviews yet</p>
        <p className="text-sm text-gray-400">Be the first to review this product</p>
      </div>
    )
  }

  const verifiedPercentage = (summary.verifiedPurchases / summary.totalReviews) * 100

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overall Rating */}
      <div className="text-center">
        <div className="text-4xl font-light mb-2">{summary.averageRating.toFixed(1)}</div>
        <StarRating rating={summary.averageRating} size="lg" className="justify-center mb-2" />
        <p className="text-gray-600">
          Based on {summary.totalReviews} {summary.totalReviews === 1 ? "review" : "reviews"}
        </p>
        {summary.verifiedPurchases > 0 && (
          <div className="flex items-center justify-center mt-2">
            <Shield className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-sm text-green-600">{verifiedPercentage.toFixed(0)}% verified purchases</span>
          </div>
        )}
      </div>

      {/* Rating Distribution */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm text-gray-700 mb-3">Rating Distribution</h4>
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = summary.ratingDistribution[rating as keyof typeof summary.ratingDistribution]
          const percentage = summary.totalReviews > 0 ? (count / summary.totalReviews) * 100 : 0

          return (
            <div key={rating} className="flex items-center space-x-3 text-sm">
              <div className="flex items-center space-x-1 w-12">
                <span>{rating}</span>
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="flex-1">
                <Progress value={percentage} className="h-2" />
              </div>
              <span className="text-gray-500 w-8 text-right">{count}</span>
            </div>
          )
        })}
      </div>

      {/* Quality Indicators */}
      <div className="flex flex-wrap gap-2">
        {summary.averageRating >= 4.5 && (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Highly Rated
          </Badge>
        )}
        {verifiedPercentage >= 70 && (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Verified Quality
          </Badge>
        )}
        {summary.totalReviews >= 10 && (
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            Popular Choice
          </Badge>
        )}
      </div>
    </div>
  )
}
