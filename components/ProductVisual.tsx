import type { StoreProduct } from "@/data/products";

export function ProductVisual({ product, compact = false }: { product: StoreProduct; compact?: boolean }) {
  return (
    <div className={`product-visual ${product.tone} ${compact ? "product-visual-compact" : ""}`}>
      {product.badge && <span className={`badge ${product.slug === "nada" ? "new" : ""}`}>{product.badge}</span>}
      <div className={`bottle ${product.bottle}`}><i>أثــر</i><small>{product.name}</small></div>
    </div>
  );
}
