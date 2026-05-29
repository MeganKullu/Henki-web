const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254728200018";

export function buildWhatsAppUrl(product: {
  name: string;
  price: number;
  slug: string;
}): string {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://henkielectronics.co.ke";
  const productUrl = `${siteUrl}/products/${product.slug}`;
  const priceFormatted = `KSh ${product.price.toLocaleString("en-KE")}`;
  const message = encodeURIComponent(
    `Hi, I am interested in *${product.name}* - ${productUrl} priced at *${priceFormatted}*. Is it available?`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}
