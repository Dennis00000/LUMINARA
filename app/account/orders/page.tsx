import { Truck, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Link from "next/link"

export default function OrdersPage() {
  const orders = [
    {
      id: "ALK-2024-001",
      date: "March 15, 2024",
      items: 2,
      total: "$1,299.00",
      status: "Delivered",
      tracking: "1Z999AA1234567890",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      id: "ALK-2024-002",
      date: "March 10, 2024",
      items: 1,
      total: "$599.00",
      status: "Shipped",
      tracking: "1Z999AA1234567891",
      icon: Truck,
      color: "text-blue-600",
    },
    {
      id: "ALK-2024-003",
      date: "March 5, 2024",
      items: 3,
      total: "$2,199.00",
      status: "Processing",
      tracking: null,
      icon: Clock,
      color: "text-yellow-600",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/account">
            <Button variant="ghost" size="sm">
              ← Back to Account
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-light mb-8">Order History</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <p className="text-gray-600">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-lg">{order.total}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <order.icon className={`w-4 h-4 ${order.color}`} />
                      <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>{order.status}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">{order.items} items</p>
                    {order.tracking && <p className="text-sm text-gray-600">Tracking: {order.tracking}</p>}
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {order.tracking && (
                      <Button variant="outline" size="sm">
                        Track Package
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
