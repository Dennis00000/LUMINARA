import Breadcrumb from "@/components/ui/breadcrumb"

const LuxuryCollectionPage = () => {
  return (
    <div>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Collections", href: "/collections" },
              { label: "Luxury Collection" },
            ]}
            className="py-3 sm:py-4"
          />
        </div>
      </div>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Luxury Collection</h1>
        <p>Explore our exquisite luxury collection.</p>
        {/* Add your luxury collection items here */}
      </div>
    </div>
  )
}

export default LuxuryCollectionPage
