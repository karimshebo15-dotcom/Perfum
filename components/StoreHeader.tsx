"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export function StoreHeader() {
  const { count } = useCart();
  return (
    <header className="store-header">
      <Link className="brand" href="/"><span className="brand-mark">أ</span><span className="brand-name">أثــر</span></Link>
      <nav aria-label="التنقل الرئيسي"><Link href="/">الرئيسية</Link><Link href="/products">كل العطور</Link><Link href="/products#collections">المجموعات</Link></nav>
      <Link className="cart-button store-cart" href="/cart">السلة <span>{new Intl.NumberFormat("ar-EG").format(count)}</span></Link>
    </header>
  );
}
