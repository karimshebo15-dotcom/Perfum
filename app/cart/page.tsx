"use client";

import Link from "next/link";
import { ProductVisual } from "@/components/ProductVisual";
import { StoreHeader } from "@/components/StoreHeader";
import { useCart } from "@/components/CartProvider";
import { getProduct } from "@/data/products";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const lines = items.flatMap(item => { const product = getProduct(item.slug); return product ? [{ ...item, product }] : []; });
  const subtotal = lines.reduce((total, line) => total + line.product.price * line.quantity, 0);
  const shipping = subtotal >= 1500 || subtotal === 0 ? 0 : 120;
  const format = (value: number) => `${new Intl.NumberFormat("ar-EG").format(value)} ج.م`;

  return (
    <><StoreHeader/><main className="cart-page"><section className="cart-heading"><p className="eyebrow dark">اختياراتك</p><h1>سلة التسوق</h1><span>{new Intl.NumberFormat("ar-EG").format(lines.reduce((sum,line) => sum + line.quantity, 0))} منتجات</span></section>{lines.length === 0 ? <section className="empty-cart"><span>أ</span><h2>سلتك تنتظر أثرك</h2><p>اكتشف المجموعة واختر العطر الذي يحكي قصتك.</p><Link className="button button-dark" href="/products">تصفّح العطور</Link></section> : <div className="cart-layout"><section className="cart-lines">{lines.map(({ product, quantity }) => <article className="cart-line" key={product.slug}><Link className="cart-thumb" href={`/products/${product.slug}`}><ProductVisual product={product} compact/></Link><div className="cart-line-copy"><div><Link href={`/products/${product.slug}`}><h2>{product.name}</h2></Link><p>{product.notes}</p><small>٧٥ مل</small></div><div className="cart-line-actions"><div className="quantity"><button onClick={() => updateQuantity(product.slug, quantity - 1)}>−</button><span>{new Intl.NumberFormat("ar-EG").format(quantity)}</span><button onClick={() => updateQuantity(product.slug, quantity + 1)}>+</button></div><button className="remove-line" onClick={() => removeItem(product.slug)}>حذف</button></div></div><strong>{format(product.price * quantity)}</strong></article>)}</section><aside className="order-summary"><h2>ملخص الطلب</h2><div><span>المجموع الفرعي</span><strong>{format(subtotal)}</strong></div><div><span>الشحن</span><strong>{shipping ? format(shipping) : "مجاني"}</strong></div><div className="order-total"><span>الإجمالي</span><strong>{format(subtotal + shipping)}</strong></div><button className="button button-dark checkout-button" onClick={() => alert("تم تجهيز طلبك التجريبي. يمكن ربط الدفع لاحقًا.")}>إتمام الطلب</button><p>دفع آمن · استبدال خلال ١٤ يومًا</p><button className="clear-cart" onClick={clearCart}>تفريغ السلة</button></aside></div>}</main></>
  );
}
