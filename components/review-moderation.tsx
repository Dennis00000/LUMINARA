"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarRating } from "@/components/star-rating"
import { useReviews, type Review } from "@/lib/reviews-context"
import { Check, X, Eye, Clock } from "lucide-react"

interface ReviewModerationProps {
  className?: string
}

export function ReviewModeration({ className = "" }: ReviewModerationProps) {
  const { reviews, moderateReview, loading } = useReviews()
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [moderatorNotes, setModeratorNotes] = useState("")

  const pendingReviews = reviews.filter((review) => review.status === "pending")
  const approvedReviews = reviews.filter((review) => review.status === "approved")
  const rejectedReviews = reviews.filter((review) => review.status === "rejected")

  const handleModerate = async (reviewId: string, status: Review["status"]) => {
    await moderateReview(reviewId, status, moderatorNotes)
    setSelectedReview(null)
    setModeratorNotes("")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status: Review["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            <Check className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            <X className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Moderation Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{pendingReviews.length}</div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{approvedReviews.length}</div>
            <div className="text-sm text-gray-600">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{rejectedReviews.length}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-yellow-600" />
            Pending Reviews ({pendingReviews.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingReviews.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No pending reviews</p>
          ) : (
            <div className="space-y-4">
              {pendingReviews.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{review.userName}</h4>
                        {review.verified && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                            Verified
                          </Badge>
                        )}
                        {getStatusBadge(review.status)}
                      </div>
                      <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedReview(review)}
                      className="flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Review
                    </Button>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <StarRating rating={review.rating} size="sm" />
                      <span className="font-medium">{review.title}</span>
                    </div>
                    <p className="text-gray-700 text-sm line-clamp-2">{review.comment}</p>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleModerate(review.id, "approved")}
                      disabled={loading}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleModerate(review.id, "rejected")}
                      disabled={loading}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Detail Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Review Details</span>
                <Button variant="ghost" size="sm" onClick={() => setSelectedReview(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Review Info */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="font-medium">{selectedReview.userName.charAt(0)}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{selectedReview.userName}</h4>
                    {selectedReview.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{selectedReview.userEmail}</p>
                  <p className="text-sm text-gray-500">{formatDate(selectedReview.createdAt)}</p>
                </div>
              </div>

              {/* Rating and Title */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <StarRating rating={selectedReview.rating} size="md" />
                  <span className="font-medium text-lg">{selectedReview.title}</span>
                </div>
              </div>

              {/* Review Content */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 leading-relaxed">{selectedReview.comment}</p>
              </div>

              {/* Review Images */}
              {selectedReview.images && selectedReview.images.length > 0 && (
                <div>
                  <h5 className="font-medium mb-2">Attached Images</h5>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedReview.images.map((image, index) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`Review image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Moderator Notes */}
              <div>
                <label className="block text-sm font-medium mb-2">Moderator Notes (Optional)</label>
                <Textarea
                  value={moderatorNotes}
                  onChange={(e) => setModeratorNotes(e.target.value)}
                  placeholder="Add notes about this review..."
                  rows={3}
                />
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={() => handleModerate(selectedReview.id, "approved")}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Approve Review
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleModerate(selectedReview.id, "rejected")}
                  disabled={loading}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject Review
                </Button>
                <Button variant="outline" onClick={() => setSelectedReview(null)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* All Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>All Reviews ({reviews.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reviews.map((review) => (
              <div key={review.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium">{review.userName.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{review.userName}</span>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <p className="text-xs text-gray-500">{formatDate(review.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(review.status)}
                  <Button variant="ghost" size="sm" onClick={() => setSelectedReview(review)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
