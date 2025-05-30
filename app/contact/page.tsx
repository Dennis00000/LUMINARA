"use client"

import Image from "next/image"
import { MapPin, Phone, Mail, Clock, Navigation, Car, Train } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"

export default function ContactPage() {
  const handleGetDirections = () => {
    const address = "123 W 47th St, New York, NY 10036"
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, "_blank")
  }

  const handleAppleMaps = () => {
    const address = "123 W 47th St, New York, NY 10036"
    const encodedAddress = encodeURIComponent(address)
    window.open(`http://maps.apple.com/?daddr=${encodedAddress}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[300px] lg:h-[400px] bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-gray-800 leading-tight">Contact Us</h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              We'd love to hear from you. Visit our showroom, give us a call, or send us a message.
            </p>
          </div>
          <div className="flex-1 relative h-full hidden md:block">
            <Image
              src="/images/contact-hero-store.png"
              alt="Luminara jewelry store"
              width={800}
              height={400}
              className="absolute right-0 top-0 h-full w-full object-cover object-center rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-light mb-6">Get in Touch</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <Input placeholder="Your first name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <Input placeholder="Your last name" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input type="email" placeholder="your.email@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <Input type="tel" placeholder="(555) 123-4567" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="custom">Custom Design</SelectItem>
                      <SelectItem value="repair">Repair Service</SelectItem>
                      <SelectItem value="appraisal">Appraisal</SelectItem>
                      <SelectItem value="appointment">Schedule Appointment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <Textarea placeholder="Tell us how we can help you..." rows={5} />
                </div>
                <Button className="w-full bg-black text-white hover:bg-gray-800">Send Message</Button>
              </form>
            </div>

            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-light mb-6">Visit Our Showroom</h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-gray-600 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Address</h3>
                    <p className="text-gray-600">
                      123 W 47th Street
                      <br />
                      New York, NY 10036
                      <br />
                      United States
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-gray-600 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-gray-600 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-gray-600">info@luminara.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-gray-600 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Hours</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Friday: 10:00 AM - 7:00 PM</p>
                      <p>Saturday: 10:00 AM - 6:00 PM</p>
                      <p>Sunday: 12:00 PM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Store Image */}
              <div className="mb-6">
                <Image
                  src="/images/contact-showroom-interior.png"
                  alt="Luminara showroom interior"
                  width={600}
                  height={300}
                  className="rounded-lg shadow-lg w-full"
                />
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium mb-3">Private Appointments Available</h3>
                <p className="text-gray-600 mb-4">
                  Schedule a private consultation for custom design, bridal jewelry selection, or high-value purchases.
                </p>
                <Button variant="outline" className="w-full">
                  Book Private Appointment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light mb-4">Find Us</h2>
            <p className="text-gray-600">Located in the heart of Manhattan's Diamond District</p>
          </div>

          {/* Directions and Transit Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Navigation className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <h3 className="font-medium mb-2">Get Directions</h3>
                <p className="text-sm text-gray-600 mb-4">Navigate to our store using your preferred map app</p>
                <div className="space-y-2">
                  <Button onClick={handleGetDirections} className="w-full" size="sm">
                    Google Maps
                  </Button>
                  <Button onClick={handleAppleMaps} variant="outline" className="w-full" size="sm">
                    Apple Maps
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Train className="w-8 h-8 mx-auto mb-3 text-green-600" />
                <h3 className="font-medium mb-2">Public Transit</h3>
                <p className="text-sm text-gray-600 mb-4">Convenient subway access</p>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Times Square - 42nd St</strong>
                  </p>
                  <p>N, Q, R, W, S, 1, 2, 3, 7</p>
                  <p className="text-gray-500">5 min walk</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Car className="w-8 h-8 mx-auto mb-3 text-orange-600" />
                <h3 className="font-medium mb-2">Parking</h3>
                <p className="text-sm text-gray-600 mb-4">Multiple parking options nearby</p>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Edison ParkFast</strong>
                  </p>
                  <p>123 W 46th St</p>
                  <p className="text-gray-500">2 min walk</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Google Maps Embed */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648750455!2d-73.98823492404069!3d40.75773097138558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1703123456789!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Luminara Jewelry Store Location"
              className="w-full"
            />
          </div>

          {/* Map Controls */}
          <div className="mt-6 text-center">
            <div className="inline-flex bg-white rounded-lg shadow-sm border p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps/place/Times+Square,+New+York,+NY/@40.7580,73.9855,17z",
                    "_blank",
                  )
                }
                className="text-sm"
              >
                View Larger Map
              </Button>
              <Button variant="ghost" size="sm" onClick={handleGetDirections} className="text-sm">
                Get Directions
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps/@40.7580,-73.9855,3a,75y,90t/data=!3m7!1e1!3m5!1s0x89c25855c6480299:0x55194ec5a1ae072e",
                    "_blank",
                  )
                }
                className="text-sm"
              >
                Street View
              </Button>
            </div>
          </div>

          {/* Nearby Landmarks */}
          <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-4 text-center">Nearby Landmarks</h3>
            <div className="grid md:grid-cols-4 gap-4 text-center text-sm">
              <div>
                <p className="font-medium">Times Square</p>
                <p className="text-gray-600">3 blocks south</p>
              </div>
              <div>
                <p className="font-medium">Rockefeller Center</p>
                <p className="text-gray-600">4 blocks north</p>
              </div>
              <div>
                <p className="font-medium">Bryant Park</p>
                <p className="text-gray-600">6 blocks east</p>
              </div>
              <div>
                <p className="font-medium">Central Park</p>
                <p className="text-gray-600">10 blocks north</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
