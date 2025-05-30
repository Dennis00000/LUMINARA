"use client"

import Image from "next/image"
import { FileText, Shield, Eye, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Link from "next/link"

export default function AppraisalPage() {
  const appraisalTypes = [
    {
      title: "Insurance Appraisal",
      description: "Detailed valuation for insurance coverage",
      price: "Starting at $150",
      image: "/images/appraisal-insurance.png",
      features: ["Detailed documentation", "Current market value", "Insurance accepted"],
    },
    {
      title: "Estate Appraisal",
      description: "Comprehensive evaluation for estate planning",
      price: "Starting at $200",
      image: "/images/appraisal-estate.png",
      features: ["Fair market value", "Legal documentation", "Tax purposes"],
    },
    {
      title: "Resale Appraisal",
      description: "Market value assessment for selling",
      price: "Starting at $125",
      image: "/images/appraisal-resale.png",
      features: ["Current market trends", "Selling recommendations", "Condition assessment"],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] lg:h-[500px] bg-gradient-to-r from-green-50 to-emerald-100">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-gray-800 leading-tight">
              Jewelry Appraisal
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              Get professional, certified appraisals for your valuable jewelry. Our certified gemologists provide
              accurate valuations for insurance, estate planning, or resale purposes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                  Schedule Appraisal
                </Button>
              </Link>
              <Link href="#services">
                <Button size="lg" variant="outline" className="px-8 py-3">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative h-full hidden md:block">
            <Image
              src="/images/appraisal-hero-gemologist.png"
              alt="Certified gemologist appraising jewelry"
              width={800}
              height={500}
              className="absolute right-0 top-0 h-full w-full object-cover object-center rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Why Professional Appraisal */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Why Professional Appraisal Matters</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Protect your investment with accurate, certified valuations
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Insurance Protection</h3>
              <p className="text-gray-600">Ensure adequate coverage for your valuable pieces</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Legal Documentation</h3>
              <p className="text-gray-600">Official documentation for legal and tax purposes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Expert Analysis</h3>
              <p className="text-gray-600">Detailed examination by certified gemologists</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Market Value</h3>
              <p className="text-gray-600">Current market pricing and value trends</p>
            </div>
          </div>
        </div>
      </section>

      {/* Appraisal Services */}
      <section id="services" className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Appraisal Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Professional appraisals for every need</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {appraisalTypes.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-green-600">{service.price}</span>
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

      {/* Appraisal Process */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Our Appraisal Process</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Thorough evaluation using industry-standard methods
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Initial Examination</h3>
                    <p className="text-gray-600">Visual inspection and preliminary assessment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Detailed Analysis</h3>
                    <p className="text-gray-600">Gemstone testing and metal analysis using professional equipment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Market Research</h3>
                    <p className="text-gray-600">Current market value research and comparable sales analysis</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Documentation</h3>
                    <p className="text-gray-600">Comprehensive written report with photographs and certification</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/images/appraisal-process-equipment.png"
                alt="Professional appraisal equipment"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Our Credentials</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Certified professionals you can trust</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <Image
                src="/images/credential-gia.png"
                alt="GIA Certified"
                width={100}
                height={100}
                className="mx-auto mb-4"
              />
              <h3 className="text-lg font-medium mb-2">GIA Certified</h3>
              <p className="text-gray-600 text-sm">Gemological Institute of America graduate gemologist</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <Image
                src="/images/credential-asa.png"
                alt="ASA Member"
                width={100}
                height={100}
                className="mx-auto mb-4"
              />
              <h3 className="text-lg font-medium mb-2">ASA Member</h3>
              <p className="text-gray-600 text-sm">American Society of Appraisers certified member</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <Image
                src="/images/credential-naja.png"
                alt="NAJA Certified"
                width={100}
                height={100}
                className="mx-auto mb-4"
              />
              <h3 className="text-lg font-medium mb-2">NAJA Certified</h3>
              <p className="text-gray-600 text-sm">National Association of Jewelry Appraisers member</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-light mb-4">Need a Professional Appraisal?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Protect your valuable jewelry with a certified appraisal from our expert gemologists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                Schedule Appraisal
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3"
            >
              Call (555) 123-4567
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
