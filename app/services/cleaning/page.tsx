"use client"

import Image from "next/image"
import { Sparkles, Clock, Shield, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Link from "next/link"

export default function CleaningPage() {
  const cleaningServices = [
    {
      title: "Basic Cleaning",
      description: "Professional cleaning and polishing",
      price: "Free with purchase",
      image: "/images/cleaning-basic.png",
      duration: "15 minutes",
      features: ["Ultrasonic cleaning", "Professional polishing", "Basic inspection"],
    },
    {
      title: "Deep Cleaning",
      description: "Comprehensive restoration cleaning",
      price: "Starting at $35",
      image: "/images/cleaning-deep.png",
      duration: "30-45 minutes",
      features: ["Steam cleaning", "Detailed polishing", "Prong inspection", "Stone tightening"],
    },
    {
      title: "Restoration Cleaning",
      description: "Complete restoration for antique pieces",
      price: "Starting at $75",
      image: "/images/cleaning-restoration.png",
      duration: "1-2 hours",
      features: ["Hand polishing", "Antique restoration", "Detailed inspection", "Protective coating"],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] lg:h-[500px] bg-gradient-to-r from-yellow-50 to-amber-100">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-gray-800 leading-tight">
              Jewelry Cleaning
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              Restore the brilliance of your precious jewelry with our professional cleaning services. Our expert
              techniques safely remove dirt, oils, and tarnish to bring back the original sparkle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                  Book Cleaning
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
              src="/images/cleaning-hero-process.png"
              alt="Professional jewelry cleaning process"
              width={800}
              height={500}
              className="absolute right-0 top-0 h-full w-full object-cover object-center rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Why Professional Cleaning */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Why Professional Cleaning</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Professional cleaning extends the life and beauty of your jewelry
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Restore Brilliance</h3>
              <p className="text-gray-600">Bring back the original sparkle and shine</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Safe Methods</h3>
              <p className="text-gray-600">Professional techniques that won't damage your jewelry</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Quick Service</h3>
              <p className="text-gray-600">Most cleanings completed while you wait</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Expert Care</h3>
              <p className="text-gray-600">Trained professionals handle your precious pieces</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cleaning Services */}
      <section id="services" className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Cleaning Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Professional cleaning options for every type of jewelry
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {cleaningServices.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-yellow-600 text-white text-xs">{service.duration}</Badge>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-yellow-600">{service.price}</span>
                    <Link href="/contact">
                      <Button size="sm" variant="outline">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cleaning Process */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Our Cleaning Process</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Step-by-step professional cleaning for optimal results
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/images/cleaning-process-steps.png"
                alt="Jewelry cleaning process steps"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Initial Inspection</h3>
                    <p className="text-gray-600">Examine for loose stones and damage before cleaning</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Ultrasonic Cleaning</h3>
                    <p className="text-gray-600">Remove dirt and oils using ultrasonic technology</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Steam Cleaning</h3>
                    <p className="text-gray-600">High-pressure steam removes stubborn residue</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Professional Polishing</h3>
                    <p className="text-gray-600">Restore shine and remove minor scratches</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Final Inspection</h3>
                    <p className="text-gray-600">Quality check and protective coating application</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Examples */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Cleaning Results</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              See the dramatic difference professional cleaning makes
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Image
                src="/images/cleaning-before-after-ring.png"
                alt="Ring cleaning before and after"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium mb-1">Diamond Ring Restoration</h3>
                <p className="text-sm text-gray-600">Restored brilliance to a dull diamond ring</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Image
                src="/images/cleaning-before-after-necklace.png"
                alt="Necklace cleaning before and after"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium mb-1">Gold Necklace Polish</h3>
                <p className="text-sm text-gray-600">Removed tarnish and restored golden shine</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Image
                src="/images/cleaning-before-after-earrings.png"
                alt="Earrings cleaning before and after"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium mb-1">Pearl Earrings Care</h3>
                <p className="text-sm text-gray-600">Gentle cleaning preserved pearl luster</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Care Tips */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light mb-6">At-Home Care Tips</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Between professional cleanings, follow these tips to keep your jewelry looking its best:
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                  <p className="text-gray-600">Remove jewelry before swimming, showering, or exercising</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                  <p className="text-gray-600">Store pieces separately to prevent scratching</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                  <p className="text-gray-600">Clean gently with a soft cloth after wearing</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                  <p className="text-gray-600">Avoid harsh chemicals and abrasive materials</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                  <p className="text-gray-600">Schedule professional cleaning every 6 months</p>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/images/cleaning-care-tips.png"
                alt="Jewelry care tips"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-yellow-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-light mb-4">Ready to Restore Your Jewelry's Sparkle?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Bring your jewelry back to life with our professional cleaning services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-3">
                Book Cleaning Service
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-yellow-600 px-8 py-3"
            >
              Call (555) 123-4567
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
