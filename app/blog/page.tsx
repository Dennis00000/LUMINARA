import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { Input } from "@/components/ui/input"

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "The Ultimate Guide to Choosing the Perfect Engagement Ring",
      excerpt:
        "Discover everything you need to know about selecting an engagement ring that will be treasured forever.",
      image: "/placeholder.svg?height=300&width=400&query=engagement ring guide",
      category: "Guides",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      featured: true,
    },
    {
      id: 2,
      title: "Spring Jewelry Trends: What's Hot This Season",
      excerpt: "Explore the latest jewelry trends that are defining spring fashion.",
      image: "/placeholder.svg?height=300&width=400&query=spring jewelry trends",
      category: "Trends",
      author: "Michael Chen",
      date: "March 12, 2024",
      featured: false,
    },
    {
      id: 3,
      title: "Caring for Your Precious Jewelry: Expert Tips",
      excerpt: "Learn professional techniques to keep your jewelry looking brilliant.",
      image: "/placeholder.svg?height=300&width=400&query=jewelry care tips",
      category: "Care",
      author: "Emma Davis",
      date: "March 10, 2024",
      featured: false,
    },
    {
      id: 4,
      title: "The History and Significance of Birthstone Jewelry",
      excerpt: "Dive into the fascinating history of birthstones and their cultural significance.",
      image: "/placeholder.svg?height=300&width=400&query=birthstone jewelry history",
      category: "Education",
      author: "David Wilson",
      date: "March 8, 2024",
      featured: false,
    },
  ]

  const featuredPost = posts.find((post) => post.featured)
  const regularPosts = posts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-light mb-4">Jewelry Journal</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the latest trends, expert tips, and fascinating stories from the world of fine jewelry
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <Badge className="absolute top-4 left-4 z-10 bg-amber-500 text-white">Featured</Badge>
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
              <div>
                <Badge variant="outline" className="mb-4">
                  {featuredPost.category}
                </Badge>
                <h2 className="text-3xl font-light mb-4">{featuredPost.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                </div>
                <Link href={`/blog/${featuredPost.id}`}>
                  <Button className="bg-black text-white hover:bg-gray-800">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-12">Latest Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-white text-gray-800">{post.category}</Badge>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Read Article
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 lg:py-20 bg-black text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-light mb-4">Stay Inspired</h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                Subscribe to our newsletter and be the first to know about new articles, jewelry trends, styling tips,
                and exclusive offers.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="flex items-center justify-center space-x-3">
                <Check className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-sm">Weekly style guides</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Check className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-sm">Trend alerts</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Check className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-sm">Exclusive content</span>
              </div>
            </div>

            {/* Newsletter Form */}
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 text-black text-base border-0 rounded-lg focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-3">Join 50,000+ jewelry enthusiasts. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
