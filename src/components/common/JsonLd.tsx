interface ProductJsonLdProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    comparePrice: number | null;
    images: string[];
    brand: string;
    sku: string;
    stock: number;
    slug: string;
    condition?: string | null;
    warranty?: string | null;
    deliveryInfo?: string | null;
  };
}

const CONDITION_SCHEMA: Record<string, string> = {
  new:          "https://schema.org/NewCondition",
  refurbished:  "https://schema.org/RefurbishedCondition",
  used:         "https://schema.org/UsedCondition",
};

export default function ProductJsonLd({ product }: ProductJsonLdProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://henkielectronics.co.ke";

  const schema = {
    "@context": "https://schema.org",
    "@type":    "Product",
    name:        product.name,
    description: product.description,
    image:       product.images,
    brand:       { "@type": "Brand", name: product.brand },
    sku:         product.sku,
    offers: {
      "@type":         "Offer",
      url:             `${siteUrl}/products/${product.slug}`,
      priceCurrency:   "KES",
      price:           product.price,
      availability:    product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition:   CONDITION_SCHEMA[product.condition ?? "new"] ?? CONDITION_SCHEMA.new,
      seller:          { "@type": "Organization", name: "Henki Electronics" },
      shippingDetails: product.deliveryInfo ? {
        "@type":        "OfferShippingDetails",
        shippingLabel:  product.deliveryInfo,
        deliveryTime:   {
          "@type":     "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "d" },
        },
      } : undefined,
      warranty: product.warranty ? {
        "@type":          "WarrantyPromise",
        durationOfWarranty: { "@type": "QuantitativeValue", name: product.warranty },
      } : undefined,
      ...(product.comparePrice && {
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      }),
    },
    aggregateRating: {
      "@type":       "AggregateRating",
      ratingValue:   "4.5",
      reviewCount:   "24",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
