"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearch } from "@/lib/search-context"

interface SortDropdownProps {
  className?: string
}

export function SortDropdown({ className = "" }: SortDropdownProps) {
  const { sortBy, updateSort } = useSearch()

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
    { value: "rating", label: "Highest Rated" },
    { value: "popularity", label: "Most Popular" },
  ]

  return (
    <Select value={sortBy} onValueChange={updateSort}>
      <SelectTrigger className={`w-48 ${className}`}>
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
