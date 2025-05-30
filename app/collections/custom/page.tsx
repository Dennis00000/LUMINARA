"use client"

import Image from "next/image"
import Link from "next/link"
import { Palette, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

export default function CustomCollectionPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] lg:h-[500px] bg-gradient-to-r from-emerald-50 to-teal-100">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-gray-800 leading-tight">
              Custom Design
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              Bring your vision to life with our custom jewelry design service. Work with our master craftsmen to create
              a one-of-a-kind piece that tells your unique story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services/custom-design">
                <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                  Start Your Design
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="px-8 py-3">
                  Book Consultation
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative h-full hidden md:block">
            <Image
              src="/images/custom-collection-hero.png"
              alt="Custom jewelry design process"
              width={800}
              height={500}
              className="absolute right-0 top-0 h-full w-full object-cover object-center rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Our Design Process</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From concept to creation, we guide you through every step
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Consultation</h3>
              <p className="text-gray-600">Share your vision and ideas with our design experts</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">2</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Design</h3>
              <p className="text-gray-600">We create detailed sketches and 3D renderings</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">3</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Approval</h3>
              <p className="text-gray-600">Review and approve the final design before crafting</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">4</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Creation</h3>
              <p className="text-gray-600">Master craftsmen bring your design to life</p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Features */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Why Choose Custom Design</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Create something truly unique and meaningful</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Unlimited Creativity</h3>
              <p className="text-gray-600 mb-4">No limits on design - create exactly what you envision</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Personal Service</h3>
              <p className="text-gray-600 mb-4">One-on-one attention from our design team</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Master Craftsmanship</h3>
              <p className="text-gray-600 mb-4">Handcrafted by skilled artisans with decades of experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-light mb-4">Ready to Create Your Dream Piece?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Schedule a consultation with our design team and start your custom jewelry journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services/custom-design">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3">
                Start Your Design
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-3"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
