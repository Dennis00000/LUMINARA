import { User, Package, Heart, Settings, LogOut, CreditCard, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Link from "next/link"

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-10 h-10 text-gray-600" />
                  </div>
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-sm text-gray-600">john.doe@email.com</p>
                  <Badge variant="outline" className="mt-2">
                    VIP Member
                  </Badge>
                </div>

                <nav className="space-y-2">
                  <Link href="/account" className="flex items-center space-x-3 p-3 bg-black text-white rounded-lg">
                    <User className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/account/orders"
                    className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Package className="w-4 h-4" />
                    <span>Orders</span>
                  </Link>
                  <Link
                    href="/account/wishlist"
                    className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    <span>Wishlist</span>
                  </Link>
                  <Link
                    href="/account/addresses"
                    className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Addresses</span>
                  </Link>
                  <Link
                    href="/account/payment"
                    className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Payment Methods</span>
                  </Link>
                  <Link
                    href="/account/settings"
                    className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Account Settings</span>
                  </Link>
                  <button className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg w-full text-left text-red-600 transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-light mb-8">Account Dashboard</h1>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-light">24</div>
                  <p className="text-xs text-gray-500">Since 2022</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Wishlist Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-light">12</div>
                  <p className="text-xs text-gray-500">Saved for later</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Spent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-light">$8,450</div>
                  <p className="text-xs text-gray-500">Lifetime value</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Rewards Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-light">2,340</div>
                  <p className="text-xs text-gray-500">$23.40 value</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "ALK-2024-001", date: "March 15, 2024", items: 2, total: "$1,299.00", status: "Delivered" },
                    { id: "ALK-2024-002", date: "March 10, 2024", items: 1, total: "$599.00", status: "Shipped" },
                    { id: "ALK-2024-003", date: "March 5, 2024", items: 3, total: "$2,199.00", status: "Processing" },
                  ].map((order, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">Order #{order.id}</h4>
                        <p className="text-sm text-gray-600">{order.date}</p>
                        <p className="text-sm text-gray-600">{order.items} items</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.total}</p>
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "default"
                              : order.status === "Shipped"
                                ? "secondary"
                                : "outline"
                          }
                          className={order.status === "Delivered" ? "bg-green-100 text-green-800" : ""}
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link href="/account/orders">
                    <Button variant="outline">View All Orders</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Link href="/account/settings">
                    <Button variant="outline" className="w-full">
                      Update Profile
                    </Button>
                  </Link>
                  <Link href="/account/wishlist">
                    <Button variant="outline" className="w-full">
                      View Wishlist
                    </Button>
                  </Link>
                  <Link href="/shop">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                  <Link href="/account/addresses">
                    <Button variant="outline" className="w-full">
                      Manage Addresses
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      Contact Support
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button variant="outline" className="w-full">
                      Book Service
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
