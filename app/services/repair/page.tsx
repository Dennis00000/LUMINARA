"use client"

import Image from "next/image"
import { Wrench, Clock, Shield, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Link from "next/link"

export default function RepairPage() {
  const repairServices = [
    {
      title: "Ring Sizing",
      description: "Professional resizing for the perfect fit",
      price: "Starting at $75",
      image: "/images/repair-ring-sizing.png",
      duration: "1-2 days",
    },
    {
      title: "Stone Setting",
      description: "Secure loose stones and replace missing gems",
      price: "Starting at $125",
      image: "/images/repair-stone-setting.png",
      duration: "3-5 days",
    },
    {
      title: "Chain Repair",
      description: "Fix broken chains and replace clasps",
      price: "Starting at $50",
      image: "/images/repair-chain-repair.png",
      duration: "1-3 days",
    },
    {
      title: "Prong Retipping",
      description: "Restore worn prongs to secure your stones",
      price: "Starting at $100",
      image: "/images/repair-prong-retipping.png",
      duration: "2-4 days",
    },
    {
      title: "Polishing & Cleaning",
      description: "Restore the original shine and luster",
      price: "Starting at $35",
      image: "/images/repair-polishing.png",
      duration: "Same day",
    },
    {
      title: "Watch Repair",
      description: "Battery replacement and movement service",
      price: "Starting at $25",
      image: "/images/repair-watch-repair.png",
      duration: "1-2 weeks",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] lg:h-[500px] bg-gradient-to-r from-blue-50 to-cyan-100">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-gray-800 leading-tight">
              Jewelry Repair
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              Trust our master craftsmen to restore your precious jewelry to its original beauty. From simple repairs to
              complex restorations, we handle every piece with care and expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                  Get Free Estimate
                </Button>
              </Link>
              <Link href="#services">
                <Button size="lg" variant="outline" className="px-8 py-3">
                  View Services
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative h-full hidden md:block">
            <Image
              src="/images/repair-hero-craftsman.png"
              alt="Jewelry repair craftsman at work"
              width={800}
              height={500}
              className="absolute right-0 top-0 h-full w-full object-cover object-center rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Why Choose Our Repair Service</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Professional expertise you can trust with your most precious pieces
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Expert Craftsmen</h3>
              <p className="text-gray-600">Certified jewelers with decades of experience</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Quick Turnaround</h3>
              <p className="text-gray-600">Most repairs completed within a week</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Insured Service</h3>
              <p className="text-gray-600">Your jewelry is fully protected during repair</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Quality Guarantee</h3>
              <p className="text-gray-600">All repairs backed by our satisfaction guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Repair Services */}
      <section id="services" className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Our Repair Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive repair services for all types of jewelry
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repairServices.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-blue-600 text-white text-xs">{service.duration}</Badge>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-blue-600">{service.price}</span>
                    <Link href="/contact">
                      <Button size="sm" variant="outline">
                        Get Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Our Repair Process</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Simple steps to get your jewelry restored</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Bring It In</h3>
              <p className="text-gray-600 text-sm">Visit our store or mail your jewelry to us</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Free Assessment</h3>
              <p className="text-gray-600 text-sm">We evaluate and provide a detailed estimate</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Expert Repair</h3>
              <p className="text-gray-600 text-sm">Our craftsmen restore your piece with care</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Quality Check</h3>
              <p className="text-gray-600 text-sm">Final inspection before returning to you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Before & After Gallery</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              See the transformation our expert repairs can achieve
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Image
                src="/images/repair-before-after-1.png"
                alt="Ring repair before and after"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium mb-1">Vintage Ring Restoration</h3>
                <p className="text-sm text-gray-600">Complete restoration of a family heirloom</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Image
                src="/images/repair-before-after-2.png"
                alt="Necklace repair before and after"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium mb-1">Chain Link Repair</h3>
                <p className="text-sm text-gray-600">Seamless repair of broken gold chain</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Image
                src="/images/repair-before-after-3.png"
                alt="Watch repair before and after"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium mb-1">Watch Movement Service</h3>
                <p className="text-sm text-gray-600">Complete movement overhaul and case refinishing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-light mb-4">Need Jewelry Repair?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Bring your precious pieces back to life with our expert repair services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                Get Free Estimate
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
            >
              Call (555) 123-4567
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
