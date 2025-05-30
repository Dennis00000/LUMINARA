import { Breadcrumb } from "@/components/breadcrumb"

const BridalCollectionPage = () => {
  return (
    <div>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Collections", href: "/collections" },
              { label: "Bridal Collection" },
            ]}
            className="py-3 sm:py-4"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:py-8 lg:py-12">
        <h1 className="text-3xl font-extrabold text-gray-900">Bridal Collection</h1>
        <p className="mt-2 text-base text-gray-500">
          Explore our exquisite bridal collection, designed to make your special day unforgettable.
        </p>

        {/* Add bridal collection items here */}
      </div>
    </div>
  )
}

export default BridalCollectionPage
