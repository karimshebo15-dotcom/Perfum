"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { StoreHeader } from "@/components/StoreHeader";
import { storeProducts } from "@/data/products";

export default function ProductsPage() {
  const [filter, setFilter] = useState<"all" | "warm" | "fresh" | "woody">("all");
  const [toast, setToast] = useState("");
  const filtered = useMemo(() => storeProducts.filter(product => filter === "all" || product.category === filter), [filter]);

  function added(name: string) {
    setToast(`تمت إضافة ${name} إلى السلة`);
    window.setTimeout(() => setToast(""), 2200);
  }

  return (
    <><StoreHeader/><main className="store-page"><section className="store-hero"><p className="eyebrow dark">مجموعة أثر</p><h1>كل العطور</h1><p>ست حكايات مختلفة، صُممت لتجد بينها الرائحة التي تشبهك.</p></section><section className="catalog-section"><div className="catalog-toolbar"><span>{new Intl.NumberFormat("ar-EG").format(filtered.length)} عطور</span><div className="filters">{([['all','الكل'],['warm','دافئ'],['fresh','منعش'],['woody','خشبي']] as const).map(([value,label]) => <button key={value} className={`filter ${filter === value ? "active" : ""}`} onClick={() => setFilter(value)}>{label}</button>)}</div></div><div className="catalog-grid">{filtered.map(product => <ProductCard key={product.slug} product={product} onAdded={added}/>)}</div></section></main><div className={`toast ${toast ? "show" : ""}`} role="status">{toast}</div></>
  );
}
