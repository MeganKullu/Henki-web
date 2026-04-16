"use client";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX";

export function pushEvent(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

export function trackViewItem(product: {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
}) {
  pushEvent("view_item", {
    ecommerce: {
      currency: "KES",
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_brand: product.brand,
          item_category: product.category,
          price: product.price,
          quantity: 1,
        },
      ],
    },
  });
}

export function trackAddToCart(product: {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  quantity: number;
}) {
  pushEvent("add_to_cart", {
    ecommerce: {
      currency: "KES",
      value: product.price * product.quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_brand: product.brand,
          item_category: product.category,
          price: product.price,
          quantity: product.quantity,
        },
      ],
    },
  });
}

export function trackBeginCheckout(
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>,
  total: number
) {
  pushEvent("begin_checkout", {
    ecommerce: {
      currency: "KES",
      value: total,
      items: items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    },
  });
}

export function trackPurchase(
  orderId: string,
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>,
  total: number
) {
  pushEvent("purchase", {
    ecommerce: {
      transaction_id: orderId,
      currency: "KES",
      value: total,
      items: items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    },
  });
}
