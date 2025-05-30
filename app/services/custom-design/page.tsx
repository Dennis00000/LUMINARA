"use client"

import Image from "next/image"
import { Palette, Eye, Hammer, Gem } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Link from "next/link"

export default function CustomDesignPage() {
  const designSteps = [
    {
      step: 1,
      title: "Initial Consultation",
      description: "Share your vision, budget, and timeline with our design team",
      image: "/images/custom-step-consultation.png",
    },
    {
      step: 2,
      title: "Design Development",
      description: "We create detailed sketches and 3D renderings of your piece",
      image: "/images/custom-step-design.png",
    },
    {
      step: 3,
      title: "Material Selection",
      description: "Choose from our premium selection of metals and gemstones",
      image: "/images/custom-step-materials.png",
    },
    {
      step: 4,
      title: "Crafting Process",
      description: "Our master craftsmen bring your design to life",
      image: "/images/custom-step-crafting.png",
    },
  ]

  const portfolioItems = [
    {
      title: "Custom Engagement Ring",
      description: "Unique three-stone design with vintage details",
      image: "/images/custom-portfolio-engagement.png",
      category: "Engagement Rings",
    },
    {
      title: "Anniversary Necklace",
      description: "Personalized pendant with family birthstones",
      image: "/images/custom-portfolio-necklace.png",
      category: "Necklaces",
    },
    {
      title: "Corporate Award",
      description: "Custom designed recognition piece",
      image: "/images/custom-portfolio-award.png",
      category: "Special Projects",
    },
    {
      title: "Wedding Band Set",
      description: "Matching his and hers bands with unique texture",
      image: "/images/custom-portfolio-bands.png",
      category: "Wedding Bands",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] lg:h-[500px] bg-gradient-to-r from-purple-50 to-pink-100">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-gray-800 leading-tight">
              Custom Design
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              Transform your vision into reality with our bespoke jewelry design service. From engagement rings to
              family heirlooms, we create one-of-a-kind pieces that tell your unique story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                  Start Your Design
                </Button>
              </Link>
              <Link href="#portfolio">
                <Button size="lg" variant="outline" className="px-8 py-3">
                  View Portfolio
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative h-full hidden md:block">
            <Image
              src="/images/custom-design-hero.png"
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
              From initial concept to finished masterpiece, we guide you through every step
            </p>
          </div>
          <div className="space-y-16">
            {designSteps.map((step, index) => (
              <div
                key={step.step}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl font-bold">{step.step}</span>
                    </div>
                    <h3 className="text-2xl font-light">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                </div>
                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <Image
                    src={step.image || "/placeholder.svg"}
                    alt={step.title}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Custom Design Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Comprehensive design services for every occasion</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Design Consultation</h3>
              <p className="text-gray-600 mb-4">One-on-one sessions to develop your concept</p>
              <p className="text-sm text-gray-500">Starting at $150</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">3D Rendering</h3>
              <p className="text-gray-600 mb-4">Photorealistic visualization of your design</p>
              <p className="text-sm text-gray-500">Starting at $300</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gem className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Stone Sourcing</h3>
              <p className="text-gray-600 mb-4">Access to rare and premium gemstones</p>
              <p className="text-sm text-gray-500">Market pricing</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hammer className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Master Crafting</h3>
              <p className="text-gray-600 mb-4">Handcrafted by skilled artisans</p>
              <p className="text-sm text-gray-500">Varies by complexity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Custom Design Portfolio</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Explore some of our recent custom creations</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {portfolioItems.map((item, index) => (
              <div key={index} className="group">
                <div className="relative bg-gray-50 rounded-lg overflow-hidden mb-4 aspect-square">
                  <Badge className="absolute top-3 left-3 z-10 bg-purple-600 text-white text-xs">{item.category}</Badge>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-light mb-4">Ready to Create Something Unique?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Let's bring your vision to life. Schedule a consultation with our design team today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">
                Schedule Consultation
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3"
            >
              Call (555) 123-4567
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
