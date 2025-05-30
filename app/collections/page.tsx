import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

export default function CollectionsPage() {
  const collections = [
    {
      name: "Bridal Collection",
      description: "Celebrate your special day with our exquisite bridal jewelry",
      image: "/placeholder.svg?height=400&width=600&query=bridal jewelry collection",
      href: "/collections/bridal",
      featured: true,
    },
    {
      name: "Luxury Collection",
      description: "Premium pieces crafted with the finest materials",
      image: "/placeholder.svg?height=400&width=600&query=luxury jewelry collection",
      href: "/collections/luxury",
      featured: false,
    },
    {
      name: "Vintage Collection",
      description: "Timeless designs inspired by classic elegance",
      image: "/placeholder.svg?height=400&width=600&query=vintage jewelry collection",
      href: "/collections/vintage",
      featured: false,
    },
    {
      name: "Custom Design",
      description: "Create your unique piece with our master craftsmen",
      image: "/placeholder.svg?height=400&width=600&query=custom jewelry design",
      href: "/collections/custom",
      featured: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-light mb-6">Our Collections</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our carefully curated collections, each telling a unique story of craftsmanship and elegance.
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {collections.map((collection, index) => (
              <div key={index} className={`relative group ${collection.featured ? "md:col-span-2" : ""}`}>
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    width={collection.featured ? 1200 : 600}
                    height={400}
                    className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                      collection.featured ? "h-96" : "h-80"
                    }`}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className={`font-light mb-4 ${collection.featured ? "text-4xl" : "text-3xl"}`}>
                        {collection.name}
                      </h3>
                      <p className={`mb-6 max-w-md ${collection.featured ? "text-lg" : "text-base"}`}>
                        {collection.description}
                      </p>
                      <Link href={collection.href}>
                        <Button variant="outline" className="bg-white text-black hover:bg-gray-100">
                          Explore Collection
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-light mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our master craftsmen can create a custom piece just for you. Let us bring your vision to life.
          </p>
          <Link href="/services/custom-design">
            <Button className="bg-white text-black hover:bg-gray-100">Start Custom Design</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
