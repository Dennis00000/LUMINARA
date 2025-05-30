"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarRating } from "@/components/star-rating"
import { useReviews } from "@/lib/reviews-context"
import { Upload, X } from "lucide-react"

interface ReviewFormProps {
  productId: string
  productName: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function ReviewForm({ productId, productName, onSuccess, onCancel }: ReviewFormProps) {
  const { addReview, loading } = useReviews()
  const [formData, setFormData] = useState({
    rating: 0,
    title: "",
    comment: "",
    images: [] as string[],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (formData.rating === 0) {
      newErrors.rating = "Please select a rating"
    }
    if (!formData.title.trim()) {
      newErrors.title = "Please enter a review title"
    }
    if (!formData.comment.trim()) {
      newErrors.comment = "Please enter your review"
    }
    if (formData.comment.length < 10) {
      newErrors.comment = "Review must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      await addReview({
        productId,
        userId: "current-user", // In a real app, this would come from auth context
        userName: "Current User", // In a real app, this would come from auth context
        userEmail: "user@example.com", // In a real app, this would come from auth context
        rating: formData.rating,
        title: formData.title,
        comment: formData.comment,
        images: formData.images,
        verified: false, // This would be determined by purchase history
        status: "pending", // Reviews start as pending for moderation
      })

      // Reset form
      setFormData({
        rating: 0,
        title: "",
        comment: "",
        images: [],
      })

      onSuccess?.()
    } catch (error) {
      console.error("Failed to submit review:", error)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    // In a real app, you would upload these files and get URLs back
    const imageUrls = files.map((file) => URL.createObjectURL(file))
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...imageUrls].slice(0, 5), // Limit to 5 images
    }))
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
        <p className="text-sm text-gray-600">Share your experience with {productName}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <Label className="text-base font-medium">Overall Rating *</Label>
            <div className="mt-2">
              <StarRating
                rating={formData.rating}
                interactive
                size="lg"
                onRatingChange={(rating) => setFormData((prev) => ({ ...prev, rating }))}
              />
              {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
            </div>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title">Review Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Summarize your experience"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="comment">Your Review *</Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
              placeholder="Tell others about your experience with this product..."
              rows={4}
              className={errors.comment ? "border-red-500" : ""}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.comment && <p className="text-red-500 text-sm">{errors.comment}</p>}
              <p className="text-gray-500 text-sm ml-auto">{formData.comment.length}/500</p>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <Label>Add Photos (Optional)</Label>
            <div className="mt-2">
              <div className="flex flex-wrap gap-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Review ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {formData.images.length < 5 && (
                  <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                    <Upload className="w-6 h-6 text-gray-400" />
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">Add up to 5 photos to help others see your experience</p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button type="submit" disabled={loading} className="bg-black text-white hover:bg-gray-800">
              {loading ? "Submitting..." : "Submit Review"}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>

          <p className="text-xs text-gray-500">
            Your review will be published after moderation. Please follow our community guidelines.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
