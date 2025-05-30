"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-1 text-sm text-gray-500", className)}
    >
      <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-1 flex-shrink-0">
            {index === 0 && (
              <Home className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            )}

            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-gray-900 transition-colors min-h-[44px] flex items-center px-1 sm:px-2 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium min-h-[44px] flex items-center px-1 sm:px-2 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
                {item.label}
              </span>
            )}

            {index < items.length - 1 && (
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}

export function generateBreadcrumbs(pathname: string, customItems?: BreadcrumbItem[]): BreadcrumbItem[] {
  if (customItems) return customItems

  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }]

  let currentPath = ""
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`

    const label = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    const isLast = index === segments.length - 1
    breadcrumbs.push({
      label,
      href: isLast ? undefined : currentPath,
    })
  })

  return breadcrumbs
}
