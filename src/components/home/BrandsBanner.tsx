const brands = [
  "SONY", "Samsung", "Apple", "ASUS", "Dell",
  "Lenovo", "Nokia", "Bose", "JBL", "MSI",
  "LG", "Huawei",
];

export default function BrandsBanner() {
  return (
    <section className="border-t border-[#eeeeee] py-8">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center gap-4 mb-5">
          <h2 className="section-title">Top Brands</h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 border border-[#eeeeee] divide-x divide-[#eeeeee]">
          {brands.map((brand) => (
            <div
              key={brand}
              className="flex items-center justify-center p-4 hover:bg-[#fffbf0] transition-colors cursor-pointer group"
            >
              <span className="text-sm font-black text-[#c4c4c4] group-hover:text-[#333e48] transition-colors tracking-tight select-none">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
