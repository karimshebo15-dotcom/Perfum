import { notFound } from "next/navigation";
import { ProductDetailsClient } from "./ProductDetailsClient";
import { getProduct, storeProducts } from "@/data/products";

export function generateStaticParams() {
  return storeProducts.map(product => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductDetailsClient product={product} />;
}
