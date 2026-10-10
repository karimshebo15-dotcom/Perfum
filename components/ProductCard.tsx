"use client";

import Link from "next/link";
import type { StoreProduct } from "@/data/products";
import { useCart } from "./CartProvider";
import { ProductVisual } from "./ProductVisual";

export function ProductCard({ product, onAdded }: { product: StoreProduct; onAdded?: (name: string) => void }) {
  const { addItem } = useCart();
  return (
    <article className="product-card reveal visible">
      <div className="product-card-visual-wrap">
        <Link href={`/products/${product.slug}`} aria-label={`عرض تفاصيل عطر ${product.name}`}><ProductVisual product={product} /></Link>
        <button className="quick-add" type="button" onClick={() => { addItem(product.slug); onAdded?.(product.name); }}>+ أضف للسلة</button>
      </div>
      <div className="product-info"><div><Link href={`/products/${product.slug}`}><h3>{product.name}</h3></Link><p>{product.notes}</p></div><strong>{product.displayPrice}</strong></div>
    </article>
  );
}
