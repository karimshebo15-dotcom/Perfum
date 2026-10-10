"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";

type Product = {
  name: string;
  notes: string;
  price: string;
  category: "warm" | "fresh";
  tone: string;
  bottle: string;
  badge?: string;
};

const products: Product[] = [
  { name: "سُهاد", notes: "عود • عنبر • فانيليا مدخنة", price: "٢٬٨٥٠ ج.م", category: "warm", tone: "tone-amber", bottle: "bottle-square", badge: "الأكثر مبيعًا" },
  { name: "نَدى", notes: "برغموت • زهر البرتقال • مسك", price: "٢٬٤٥٠ ج.م", category: "fresh", tone: "tone-ivory", bottle: "bottle-round", badge: "جديد" },
  { name: "وَجد", notes: "ورد طائفي • زعفران • خشب الصندل", price: "٢٬٦٥٠ ج.م", category: "warm", tone: "tone-olive", bottle: "bottle-tall" },
];

const navLinks = [
  ["قصتنا", "#story"], ["العطور", "#bestsellers"], ["المجموعات", "#collections"], ["دليل النوتات", "#notes"],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "warm" | "fresh">("all");
  const [cart, setCart] = useState(0);
  const [toast, setToast] = useState("");

  const visibleProducts = useMemo(() => products.filter(product => filter === "all" || product.category === filter), [filter]);
  const searchResult = products.find(product => `${product.name} ${product.notes}`.includes(search.trim()));

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function addToCart(name: string) {
    setCart(value => value + 1);
    setToast(`تمت إضافة ${name} إلى السلة`);
  }

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setToast("شكرًا لك — أهلاً بك في مجتمع أثر");
  }

  return (
    <>
      <a className="skip-link" href="#main">تخطَّ إلى المحتوى</a>
      <div className="announcement">توصيل مجاني للطلبات فوق ١٥٠٠ ج.م <span>•</span> عينات مجانية مع كل طلب</div>

      <header className="site-header" id="top">
        <a className="brand" href="#top" aria-label="أثر - الصفحة الرئيسية"><span className="brand-mark">أ</span><span className="brand-name">أثــر</span></a>
        <nav className="desktop-nav" aria-label="التنقل الرئيسي">{navLinks.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        <div className="header-actions">
          <button className="icon-button" type="button" aria-label="البحث" onClick={() => setSearchOpen(true)}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg></button>
          <button className="cart-button" type="button" aria-label={`سلة التسوق، ${cart} منتجات`}>السلة <span>{new Intl.NumberFormat("ar-EG").format(cart)}</span></button>
          <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobileNav" aria-label="فتح القائمة" onClick={() => setMenuOpen(value => !value)}><span></span><span></span></button>
        </div>
        <nav className="mobile-nav" id="mobileNav" aria-label="قائمة الهاتف">{navLinks.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="heroTitle">
          <Image className="hero-image" src="/assets/hero-perfume.png" alt="زجاجة عطر عنبرية محاطة بخشب العود والدخان" fill priority sizes="100vw" />
          <div className="hero-shade"></div>
          <div className="hero-copy reveal"><p className="eyebrow">مجموعة خريف ٢٠٢٦</p><h1 id="heroTitle">لكل حكاية<br/><em>أثرٌ يبقى</em></h1><p className="hero-text">عطور عربية معاصرة، تمتزج فيها جرأة العود بدفء العنبر ونقاء المسك.</p><div className="hero-actions"><a className="button button-light" href="#bestsellers">اكتشف العطور</a><a className="text-link" href="#story">اعرف قصتنا <span>←</span></a></div></div>
          <div className="hero-meta" aria-label="معلومات العطر"><span>عود هندي</span><span>عنبر دافئ</span><span>مسك أبيض</span></div>
          <a className="scroll-cue" href="#story" aria-label="مرر للأسفل"><span></span>استكشف</a>
        </section>

        <section className="manifesto section" id="story">
          <div className="section-number">٠١</div><div className="manifesto-kicker reveal">وُلِدنا لنترك علامة</div>
          <div className="manifesto-body reveal"><h2>لا نصنع عطرًا يشبه غيره.<br/>نصنع <em>حضورك.</em></h2><p>بدأت «أثر» من شغف بسيط: أن نحفظ ذاكرة المكان في زجاجة. نختار خاماتنا بعناية، ونمزج كل تركيبة على مهل، لتصل إليك رائحة صادقة، متوازنة، ولا تُنسى.</p><a className="line-link" href="#values">المزيد عن دار أثر <span>←</span></a></div>
        </section>

        <section className="products section" id="bestsellers" aria-labelledby="productsTitle">
          <div className="section-heading reveal"><div><p className="eyebrow dark">الأكثر طلبًا</p><h2 id="productsTitle">اختر أثرك</h2></div><div className="filters" role="group" aria-label="تصفية العطور">{([['all','الكل'],['warm','دافئ'],['fresh','منعش']] as const).map(([value,label]) => <button key={value} className={`filter ${filter === value ? "active" : ""}`} onClick={() => setFilter(value)} type="button">{label}</button>)}</div></div>
          <div className="product-grid">{visibleProducts.map(product => <article className="product-card reveal visible" key={product.name}><div className={`product-visual ${product.tone}`}>{product.badge && <span className={`badge ${product.name === "نَدى" ? "new" : ""}`}>{product.badge}</span>}<div className={`bottle ${product.bottle}`}><i>أثــر</i><small>{product.name}</small></div><button className="quick-add" type="button" onClick={() => addToCart(product.name)}>+ أضف للسلة</button></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.notes}</p></div><strong>{product.price}</strong></div></article>)}</div>
          <div className="center-action"><a className="button button-dark" href="#collections">عرض المجموعة كاملة</a></div>
        </section>

        <section className="collection-story" id="collections">
          <div className="collection-image-wrap reveal"><Image src="/assets/collection-perfumes.png" alt="مجموعة من ثلاث زجاجات عطر فوق حجر طبيعي" fill sizes="(max-width: 900px) 100vw, 64vw" /><div className="image-label"><span>ثلاث حكايات</span><strong>مجموعة الجذور</strong></div></div>
          <div className="collection-copy reveal"><p className="eyebrow dark">المجموعة الجديدة</p><h2>من الأرض،<br/><em>إلى الذاكرة</em></h2><p>ثلاث تركيبات تستلهم دفء الصحراء بعد الغروب: دخان العود، لمعان العنبر، وسكون المسك. صُممت لتُلبس منفردة أو تُدمج معًا لتكوين أثرك الخاص.</p><ul className="collection-list"><li><span>٠١</span><div><strong>سُهاد</strong><small>عميق ودافئ</small></div></li><li><span>٠٢</span><div><strong>نَدى</strong><small>نقي ومضيء</small></div></li><li><span>٠٣</span><div><strong>وَجد</strong><small>زهري ومتبل</small></div></li></ul><a className="line-link" href="#bestsellers">اكتشف مجموعة الجذور <span>←</span></a></div>
        </section>

        <section className="notes section" id="notes">
          <div className="section-number light">٠٢</div><div className="notes-intro reveal"><p className="eyebrow">اعرف عطرك</p><h2>رحلة الرائحة<br/>في ثلاث <em>لحظات</em></h2></div>
          <div className="note-steps"><article className="note-step reveal"><span>١</span><div><h3>المقدمة</h3><p>أول انطباع يدوم لدقائق؛ نفحات منعشة وخفيفة تفتح الحكاية.</p><small>برغموت · فلفل وردي · ليمون</small></div></article><article className="note-step reveal"><span>٢</span><div><h3>القلب</h3><p>روح العطر التي تظهر بعد قليل وتكشف شخصيته الحقيقية.</p><small>ورد · زعفران · ياسمين</small></div></article><article className="note-step reveal"><span>٣</span><div><h3>القاعدة</h3><p>الأثر الأطول بقاءً؛ دافئ، عميق، ويلتصق بالذاكرة.</p><small>عود · عنبر · مسك</small></div></article></div>
        </section>

        <section className="values" id="values" aria-label="قيمنا"><div><strong>تركيز عالٍ</strong><span>زيوت عطرية تدوم طوال اليوم</span></div><div><strong>صناعة مسؤولة</strong><span>مكونات مختارة بعناية وتغليف أقل</span></div><div><strong>هدية مع الطلب</strong><span>عينتان لتكتشف عطرك القادم</span></div></section>

        <section className="community" id="community"><div className="community-copy reveal"><p className="eyebrow">مجتمع أثر</p><h2>رائحتك،<br/><em>على طريقتك</em></h2><p>شاركنا طقوسك اليومية وكيف تختار عطرك. تابعنا على إنستغرام واستخدم <bdo dir="ltr">#AtharStories</bdo>.</p><a className="button button-light" href="#newsletter">انضم للمجتمع</a></div><div className="community-orbit" aria-hidden="true"><div className="orbit-ring"></div><div className="orbit-core">أثــر<small>منك يبدأ</small></div></div></section>

        <section className="newsletter" id="newsletter"><div><p className="eyebrow dark">رسائل من أثر</p><h2>كن أول من يعرف</h2></div><form onSubmit={subscribe}><label className="sr-only" htmlFor="email">البريد الإلكتروني</label><input id="email" type="email" placeholder="بريدك الإلكتروني" required autoComplete="email"/><button type="submit">اشترك <span>←</span></button></form><p>بالاشتراك، أنت توافق على استلام أخبارنا وعروضنا. يمكنك إلغاء الاشتراك في أي وقت.</p></section>
      </main>

      <footer><div className="footer-top"><a className="footer-brand" href="#top"><span>أ</span>أثــر</a><div className="footer-links"><div><strong>تصفّح</strong><a href="#bestsellers">العطور</a><a href="#collections">المجموعات</a><a href="#story">قصتنا</a></div><div><strong>المساعدة</strong><a href="#newsletter">تواصل معنا</a><a href="#values">الشحن والاستبدال</a><a href="#notes">الأسئلة الشائعة</a></div><div><strong>تابعنا</strong><a href="#community">إنستغرام</a><a href="#community">تيك توك</a><a href="#community">بينترست</a></div></div></div><div className="footer-bottom"><span>© ٢٠٢٦ أثر للعطور. جميع الحقوق محفوظة.</span><span>صُنع ليبقى أثره</span></div></footer>

      <div className={`search-panel ${searchOpen ? "open" : ""}`} aria-hidden={!searchOpen}><button type="button" className="search-close" aria-label="إغلاق البحث" onClick={() => setSearchOpen(false)}>×</button><div><label htmlFor="siteSearch">ما العطر الذي تبحث عنه؟</label><input id="siteSearch" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="جرّب: عود، مسك، منعش..." autoFocus={searchOpen}/><div className="search-results">{search.trim() && (searchResult ? <a className="search-result-link" href="#bestsellers" onClick={() => { setFilter(searchResult.category); setSearchOpen(false); }}>وجدنا لك: {searchResult.name}</a> : "لم نجد نتيجة مطابقة، جرّب كلمة أخرى.")}</div></div></div>
      <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}
