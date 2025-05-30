import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-9xl font-light text-gray-300 mb-4">404</h1>
            <h2 className="text-3xl font-light mb-4">Page Not Found</h2>
            <p className="text-gray-600 leading-relaxed">
              The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong
              URL.
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/">
              <Button className="bg-black text-white hover:bg-gray-800 mr-4">Go Home</Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline">Browse Jewelry</Button>
            </Link>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-medium mb-4">Popular Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/shop?category=rings" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <span className="text-sm font-medium">Rings</span>
              </Link>
              <Link href="/shop?category=necklaces" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <span className="text-sm font-medium">Necklaces</span>
              </Link>
              <Link href="/shop?category=earrings" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <span className="text-sm font-medium">Earrings</span>
              </Link>
              <Link href="/shop?category=bracelets" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <span className="text-sm font-medium">Bracelets</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
