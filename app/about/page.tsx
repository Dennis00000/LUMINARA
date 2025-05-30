"use client"

import Image from "next/image"
import { Award, Users, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] lg:h-[500px] bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-gray-800 leading-tight">Our Story</h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              For over three generations, Luminara has been crafting exceptional jewelry that celebrates life's most
              precious moments. Our commitment to quality, craftsmanship, and customer service has made us a trusted
              name in fine jewelry.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                Visit Our Store
              </Button>
            </Link>
          </div>
          <div className="flex-1 relative h-full hidden md:block">
            <Image
              src="/images/about-hero-craftsman.png"
              alt="Master craftsman at work"
              width={800}
              height={500}
              className="absolute right-0 top-0 h-full w-full object-cover object-center rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Our Heritage */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light mb-6">Three Generations of Excellence</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded in 1952 by master jeweler Antonio Luminara, our family business began with a simple mission: to
                create beautiful, lasting jewelry that tells a story. What started as a small workshop has grown into a
                renowned jewelry house, but our values remain unchanged.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Today, under the guidance of the third generation, we continue to blend traditional craftsmanship with
                modern design, creating pieces that are both timeless and contemporary.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-light text-black mb-2">70+</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-black mb-2">50,000+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/images/about-heritage-workshop.png"
                alt="Historic jewelry workshop"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Our Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-3">Quality</h3>
              <p className="text-gray-600">Only the finest materials and meticulous craftsmanship</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-3">Service</h3>
              <p className="text-gray-600">Personalized attention and exceptional customer care</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-3">Passion</h3>
              <p className="text-gray-600">Love for the art of jewelry making drives everything we do</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-3">Innovation</h3>
              <p className="text-gray-600">Blending traditional techniques with modern design</p>
            </div>
          </div>
        </div>
      </section>

      {/* Master Craftsmen */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Master Craftsmen</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Meet the skilled artisans who bring our designs to life
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative mb-6">
                <Image
                  src="/images/craftsman-antonio.png"
                  alt="Antonio Alukas - Master Jeweler"
                  width={300}
                  height={300}
                  className="rounded-full mx-auto"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">Antonio Luminara III</h3>
              <p className="text-gray-600 mb-3">Master Jeweler & CEO</p>
              <p className="text-sm text-gray-500">
                Third-generation jeweler carrying on the family tradition of excellence
              </p>
            </div>
            <div className="text-center">
              <div className="relative mb-6">
                <Image
                  src="/images/craftsman-maria.png"
                  alt="Maria Santos - Head Designer"
                  width={300}
                  height={300}
                  className="rounded-full mx-auto"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">Maria Santos</h3>
              <p className="text-gray-600 mb-3">Head Designer</p>
              <p className="text-sm text-gray-500">
                Award-winning designer with over 20 years of experience in luxury jewelry
              </p>
            </div>
            <div className="text-center">
              <div className="relative mb-6">
                <Image
                  src="/images/craftsman-david.png"
                  alt="David Chen - Master Setter"
                  width={300}
                  height={300}
                  className="rounded-full mx-auto"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">David Chen</h3>
              <p className="text-gray-600 mb-3">Master Stone Setter</p>
              <p className="text-sm text-gray-500">
                Precision stone setting specialist with expertise in rare gemstones
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Tour */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/images/about-workshop-tour.png"
                alt="Jewelry workshop tour"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-light mb-6">Visit Our Workshop</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Experience the magic of jewelry creation firsthand. Our workshop tours offer a behind-the-scenes look at
                how our master craftsmen transform precious metals and gemstones into works of art.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                See traditional techniques passed down through generations, witness the precision of modern technology,
                and understand the passion that goes into every piece we create.
              </p>
              <Link href="/contact">
                <Button className="bg-black text-white hover:bg-gray-800">Schedule a Tour</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Ethical & Sustainable</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our commitment to responsible sourcing and environmental stewardship
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-light mb-4">Responsible Sourcing</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We are committed to ethical sourcing practices. All our diamonds are conflict-free and certified, and we
                work only with suppliers who share our values of fair labor practices and environmental responsibility.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Kimberley Process certified diamonds</li>
                <li>• Recycled precious metals when possible</li>
                <li>• Fair trade gemstone sourcing</li>
                <li>• Environmental impact reduction initiatives</li>
              </ul>
            </div>
            <div>
              <Image
                src="/images/about-sustainability.png"
                alt="Ethical sourcing and sustainability"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
