import type { Product } from "@/types"

interface Props {
  params: {
    id: string
  }
}

const products: Product[] = [
  {
    id: "1",
    name: "Product 1",
    category: "Category A",
    description: "Description for Product 1",
    price: 25,
    imageUrl: "/placeholder.jpg",
  },
  {
    id: "2",
    name: "Product 2",
    category: "Category B",
    description: "Description for Product 2",
    price: 50,
    imageUrl: "/placeholder.jpg",
  },
]

import { Breadcrumb } from "@/components/breadcrumb"

const ProductPage = ({ params }: Props) => {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: product.category, href: `/shop?category=${product.category.toLowerCase()}` },
              { label: product.name },
            ]}
            className="py-3 sm:py-4"
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1>{product.name}</h1>
        <p>Category: {product.category}</p>
        <p>Description: {product.description}</p>
        <p>Price: ${product.price}</p>
        <img src={product.imageUrl || "/placeholder.svg"} alt={product.name} />
      </div>
    </div>
  )
}

export default ProductPage
