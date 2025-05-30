import { Lock, CreditCard, Truck, Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">1</div>
              <span className="text-sm font-medium">Information</span>
            </div>
            <div className="w-12 h-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm">
                2
              </div>
              <span className="text-sm text-gray-600">Shipping</span>
            </div>
            <div className="w-12 h-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm">
                3
              </div>
              <span className="text-sm text-gray-600">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="newsletter" />
                  <Label htmlFor="newsletter" className="text-sm">
                    Email me with news and offers
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main Street" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input id="apartment" placeholder="Apartment 4B" />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="NY" />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input id="zipCode" placeholder="10001" />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" placeholder="United States" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Method */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="standard">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <div>
                        <Label htmlFor="standard" className="font-medium">
                          Standard Shipping
                        </Label>
                        <p className="text-sm text-gray-600">5-7 business days</p>
                      </div>
                    </div>
                    <span className="font-medium">$25.00</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="express" id="express" />
                      <div>
                        <Label htmlFor="express" className="font-medium">
                          Express Shipping
                        </Label>
                        <p className="text-sm text-gray-600">2-3 business days</p>
                      </div>
                    </div>
                    <span className="font-medium">$45.00</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="overnight" id="overnight" />
                      <div>
                        <Label htmlFor="overnight" className="font-medium">
                          Overnight Shipping
                        </Label>
                        <p className="text-sm text-gray-600">Next business day</p>
                      </div>
                    </div>
                    <span className="font-medium">$75.00</span>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="card" className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <CreditCard className="w-5 h-5" />
                    <Label htmlFor="card">Credit Card</Label>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="John Doe" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                    <RadioGroupItem value="apple" id="apple" />
                    <Label htmlFor="apple">Apple Pay</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gray-200 rounded"></div>
                    <div className="flex-1">
                      <h4 className="font-medium">Diamond Solitaire Ring</h4>
                      <p className="text-sm text-gray-600">Size 7, 14k White Gold</p>
                      <p className="text-sm">Qty: 1</p>
                    </div>
                    <span className="font-medium">$1,299.00</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gray-200 rounded"></div>
                    <div className="flex-1">
                      <h4 className="font-medium">Pearl Drop Earrings</h4>
                      <p className="text-sm text-gray-600">Sterling Silver</p>
                      <p className="text-sm">Qty: 1</p>
                    </div>
                    <span className="font-medium">$299.00</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>$1,598.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$25.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>$127.84</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>$1,750.84</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-black text-white hover:bg-gray-800 mb-4 py-3">
                  <Lock className="w-4 h-4 mr-2" />
                  Complete Order
                </Button>

                {/* Security Features */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>SSL encrypted checkout</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4" />
                    <span>Free returns within 30 days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Satisfaction guaranteed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
