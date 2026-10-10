"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductVisual } from "@/components/ProductVisual";
import { StoreHeader } from "@/components/StoreHeader";
import { useCart } from "@/components/CartProvider";
import type { StoreProduct } from "@/data/products";

export function ProductDetailsClient({ product }: { product: StoreProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  return (
    <><StoreHeader/><main className="product-detail"><div className="product-detail-visual"><ProductVisual product={product}/></div><section className="product-detail-copy"><div className="breadcrumbs"><Link href="/products">كل العطور</Link><span>/</span><span>{product.name}</span></div><p className="eyebrow dark">{product.categoryLabel} · ٧٥ مل</p><h1>{product.name}</h1><p className="product-subtitle">{product.subtitle}</p><strong className="detail-price">{product.displayPrice}</strong><p className="detail-description">{product.description}</p><div className="note-pyramid"><div><span>المقدمة</span><strong>{product.topNotes}</strong></div><div><span>القلب</span><strong>{product.heartNotes}</strong></div><div><span>القاعدة</span><strong>{product.baseNotes}</strong></div></div><div className="detail-meta"><span>الثبات</span><strong>{product.longevity}</strong></div><div className="buy-row"><div className="quantity"><button onClick={() => setQuantity(value => Math.max(1, value - 1))}>−</button><span>{new Intl.NumberFormat("ar-EG").format(quantity)}</span><button onClick={() => setQuantity(value => value + 1)}>+</button></div><button className="button button-dark buy-button" onClick={() => { addItem(product.slug, quantity); setAdded(true); }}>أضف للسلة · {product.displayPrice}</button></div>{added && <Link className="added-message" href="/cart">تمت الإضافة — اذهب إلى السلة ←</Link>}</section></main></>
  );
}
