"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const GIFT_MIN = 1000;
const HOME_IDS = ["x1", "k580", "v75", "zen"];

const PRODUCTS = [
  {
    id: "x1",
    name: "คีย์บอร์ดเกมมิ่ง Mechanical รุ่น X1 Pro",
    groups: ["gaming", "mechanical"],
    badge: "hot",
    rating: 4.8,
    reviews: "1.2k",
    price: 2990,
    oldPrice: 3490,
    connect: "USB-C ถอดสายได้",
    layout: "Full-size",
    switchType: "Mechanical Red",
    blurb: "สวิตช์ Mechanical ตอบสนองไว ไฟ RGB รอบคีย์ โครงสร้างแน่น เหมาะทั้งเกม FPS และพิมพ์ยาว ๆ",
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "k580",
    name: "คีย์บอร์ดไร้สาย Ultra Slim รุ่น K580",
    groups: ["membrane"],
    badge: "sale",
    rating: 4.7,
    reviews: "890",
    price: 1990,
    oldPrice: 2490,
    connect: "Bluetooth / 2.4GHz",
    layout: "100% บางเฉียบ",
    switchType: "Membrane เงียบ",
    blurb: "บางเบา พกง่าย แบตอึด เสียงพิมพ์ไม่รบกวนคนข้าง ๆ เหมาะกับทำงานและเรียน",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "v75",
    name: "คีย์บอร์ดเกมมิ่ง 75% รุ่น V75",
    groups: ["gaming", "mechanical"],
    badge: null,
    rating: 4.8,
    reviews: "720",
    price: 2590,
    oldPrice: 3090,
    connect: "USB-C",
    layout: "75%",
    switchType: "Mechanical Brown",
    blurb: "เลย์เอาต์ 75% ประหยัดพื้นที่ แต่ยังมีปุ่มลูกศรครบ ไฟขอบคีย์ปรับสีได้",
    image:
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "zen",
    name: "คีย์บอร์ดแมคคานิคอล RGB รุ่น ZEN75",
    groups: ["gaming", "mechanical"],
    badge: null,
    rating: 4.9,
    reviews: "430",
    price: 3290,
    oldPrice: null,
    connect: "USB-C ถอดสายได้",
    layout: "75%",
    switchType: "Hot-swap Linear",
    blurb: "ไฟ RGB รายปุ่ม ฮอตสวอปเปลี่ยนสวิตช์เองได้ พิมพ์ลื่นและไฟสวยตอนเล่นเกมกลางคืน",
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "np",
    name: "คีย์แพด Mechanical Numpad รุ่น NP21",
    groups: ["numpad"],
    badge: "sale",
    rating: 4.6,
    reviews: "210",
    price: 890,
    oldPrice: 1190,
    connect: "USB-C",
    layout: "Numpad 21 ปุ่ม",
    switchType: "Mechanical Red",
    blurb: "คีย์แพดแยกสำหรับตัวเลข ตาราง และมาโคร สายถักถอดได้",
    image:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "mb",
    name: "คีย์บอร์ดเมมเบรนเงียบ รุ่น Office S100",
    groups: ["membrane"],
    badge: "sale",
    rating: 4.5,
    reviews: "640",
    price: 790,
    oldPrice: 990,
    connect: "USB-A",
    layout: "Full-size",
    switchType: "Membrane",
    blurb: "เงียบเป็นพิเศษ สำหรับออฟฟิศและประชุมออนไลน์ พิมพ์นุ่มมือทั้งวัน",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=80",
  },
];

const CATS = [
  {
    id: "gaming",
    name: "เกมมิ่งคีย์บอร์ด",
    lines: ["เกมมิ่ง", "คีย์บอร์ด"],
    image: PRODUCTS[0].image,
  },
  {
    id: "mechanical",
    name: "คีย์บอร์ดแบบกลไก",
    lines: ["คีย์บอร์ด", "แบบกลไก"],
    image: PRODUCTS[3].image,
  },
  {
    id: "membrane",
    name: "คีย์บอร์ดแบบเมมเบรน",
    lines: ["คีย์บอร์ด", "แบบเมมเบรน"],
    image: PRODUCTS[1].image,
  },
  {
    id: "numpad",
    name: "คีย์แพด (Numpad)",
    lines: ["คีย์แพด", "(Numpad)"],
    image: PRODUCTS[4].image,
  },
  {
    id: "sale",
    name: "สินค้าลดราคา",
    lines: ["สินค้า", "ลดราคา"],
    image: PRODUCTS[2].image,
  },
];

const SLIDES = [
  {
    title: "คีย์บอร์ดเกมมิ่ง",
    highlight: "ประสิทธิภาพสูง",
    sub: "เล่นลื่น ไหลสุดทุกเกม",
    go: "gaming",
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "บางเบา พกง่าย",
    highlight: "Ultra Slim",
    sub: "พิมพ์เงียบ ทำงานได้ทั้งวัน",
    go: "membrane",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "ไฟ RGB จัดเต็ม",
    highlight: "Mechanical",
    sub: "สัมผัสชัดทุกปุ่ม",
    go: "mechanical",
    image:
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "โปรประจำสัปดาห์",
    highlight: "สินค้าลดราคา",
    sub: "คัดรุ่นยอดนิยมมาให้แล้ว",
    go: "sale",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
  },
];

const SORTS = [
  { id: "featured", label: "แนะนำ" },
  { id: "priceAsc", label: "ราคาต่ำ-สูง" },
  { id: "priceDesc", label: "ราคาสูง-ต่ำ" },
  { id: "rating", label: "รีวิวสูงสุด" },
];

const NAV = [
  { id: "home", label: "หน้าหลัก" },
  { id: "categories", label: "หมวดหมู่" },
  { id: "favorites", label: "รายการโปรด" },
  { id: "orders", label: "คำสั่งซื้อ" },
  { id: "account", label: "บัญชีผู้ใช้" },
];

const baht = (n) => `฿${n.toLocaleString("en-US")}`;

function IconSearch({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.2-3.2" strokeLinecap="round" />
    </svg>
  );
}
function IconSliders({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16M4 17h16" strokeLinecap="round" />
      <circle cx="8" cy="7" r="2.2" fill="white" />
      <circle cx="16" cy="17" r="2.2" fill="white" />
    </svg>
  );
}
function IconCart({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6h15l-1.6 8.2a2 2 0 0 1-2 1.6H9.2a2 2 0 0 1-2-1.6L5.2 3.8H3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="20" r="1.3" fill="currentColor" />
      <circle cx="17" cy="20" r="1.3" fill="currentColor" />
    </svg>
  );
}
function IconBell({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 16V10a6 6 0 1 1 12 0v6l1.5 2H4.5L6 16Z" strokeLinejoin="round" />
      <path d="M10 19a2 2 0 0 0 4 0" strokeLinecap="round" />
    </svg>
  );
}
function IconHeart({ className = "h-5 w-5", filled = false }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9Z" strokeLinejoin="round" />
    </svg>
  );
}
function IconClose({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}
function IconHome({ active }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <path d="M4 10.6 12 4l8 6.6V20a1 1 0 0 1-1 1h-5.2v-6.2H10.2V21H5a1 1 0 0 1-1-1v-9.4Z" strokeLinejoin="round" />
    </svg>
  );
}
function IconGrid() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.4" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.4" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.4" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.4" />
    </svg>
  );
}
function IconDoc() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9.5A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z" />
      <path d="M14 3.8V8h4.2M8.5 12.5h7M8.5 16h7" strokeLinecap="round" />
    </svg>
  );
}
function IconUser() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19.2a6.5 6.5 0 0 1 13 0" strokeLinecap="round" />
    </svg>
  );
}
function IconGift({ className = "h-7 w-7" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
      <rect x="4" y="10" width="16" height="9" rx="1.5" />
      <path d="M4 14h16M12 10v9M12 10c-2 0-4-1-4-2.6S9.2 5 12 7.2C14.8 5 17 6 17 7.4S14 10 12 10Z" strokeLinejoin="round" />
    </svg>
  );
}

function Badge({ type }) {
  if (type === "hot") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[#fff1e8] px-2 py-1 text-[10px] font-bold text-[#f97316]">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
          <path d="M12 2s2 4 2 6a3 3 0 0 1-2 2c2 0 4 2 4 5a6 6 0 1 1-12 0c0-4 4-7 6-11 1 2 2 2 2-2Z" />
        </svg>
        ยอดนิยม
      </span>
    );
  }
  if (type === "sale") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[#e7f0ff] px-2 py-1 text-[10px] font-bold text-[#2f6bff]">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 13 11 4H5v6l9 9a2 2 0 0 0 3 0l3-3a2 2 0 0 0 0-3Z" />
          <circle cx="8" cy="8" r="1" fill="currentColor" />
        </svg>
        ลดพิเศษ
      </span>
    );
  }
  return null;
}

function ProductCard({ p, wished, onWish, onAdd, onOpen }) {
  return (
    <article
      onClick={onOpen}
      className="cursor-pointer overflow-hidden rounded-[22px] bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)]"
    >
      <div className="relative flex h-[118px] items-center justify-center bg-gradient-to-b from-white to-[#f4f7fb]">
        <div className="absolute left-2.5 top-2.5">
          <Badge type={p.badge} />
        </div>
        <button
          aria-label="รายการโปรด"
          onClick={(e) => {
            e.stopPropagation();
            onWish();
          }}
          className={`absolute right-2 top-2 p-1 ${wished ? "text-rose-500" : "text-slate-300"}`}
        >
          <IconHeart filled={wished} />
        </button>
        <img src={p.image} alt={p.name} referrerPolicy="no-referrer" className="h-[84px] w-[88%] object-contain" />
      </div>
      <div className="px-3 pb-3 pt-1.5">
        <h3 className="line-clamp-2 min-h-[38px] text-[13px] font-bold leading-snug text-slate-800">{p.name}</h3>
        <p className="mt-1 text-[11px] text-slate-400">
          <span className="text-amber-400">★</span> {p.rating} ({p.reviews} รีวิว)
        </p>
        <div className="mt-2 flex items-center justify-between gap-1">
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-1">
              <span className="text-[16px] font-extrabold text-[#2f6bff]">{baht(p.price)}</span>
              {p.oldPrice ? (
                <span className="text-[11px] text-slate-400 line-through">{baht(p.oldPrice)}</span>
              ) : null}
            </div>
          </div>
          <button
            aria-label="ใส่ตะกร้า"
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#2f6bff] text-white shadow-md shadow-blue-500/30"
          >
            <IconCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function KeyStoreApp() {
  const [tab, setTab] = useState("home");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(null);
  const [sort, setSort] = useState("featured");
  const [viewAll, setViewAll] = useState(false);
  const [hero, setHero] = useState(0);
  const [cart, setCart] = useState([
    { id: "x1", qty: 1 },
    { id: "k580", qty: 1 },
  ]);
  const [favs, setFavs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [panel, setPanel] = useState(null);
  const [overlay, setOverlay] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [qtyPick, setQtyPick] = useState(1);
  const [toast, setToast] = useState("");
  const listRef = useRef(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setHero((i) => (i + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setQtyPick(1);
  }, [activeId]);

  function flash(message) {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 1800);
  }

  function addToCart(id, qty = 1) {
    setCart((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) {
        return prev.map((i) => (i.id === id ? { ...i, qty: Math.min(i.qty + qty, 10) } : i));
      }
      return [...prev, { id, qty }];
    });
    flash("เพิ่มลงตะกร้าแล้ว");
  }

  function setQty(id, qty) {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, qty: Math.min(qty, 10) } : i));
    });
  }

  function toggleFav(id) {
    setFavs((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function pickCategory(id) {
    const next = category === id ? null : id;
    setTab("home");
    setPanel(null);
    setQuery("");
    setSort("featured");
    setCategory(next);
    setViewAll(Boolean(next));
    setTimeout(() => listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }

  function shopSlide(id) {
    setTab("home");
    setPanel(null);
    setQuery("");
    setSort("featured");
    setCategory(id);
    setViewAll(true);
    setTimeout(() => listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }

  function goTab(id) {
    setTab(id);
    setPanel(null);
    setOverlay(null);
  }

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q)) return false;
      if (category === "sale") return Boolean(p.oldPrice);
      if (category) return p.groups.includes(category);
      return true;
    });
    const featuredHome = !q && !category && sort === "featured" && !viewAll;
    if (featuredHome) {
      list = HOME_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
    } else if (sort === "priceAsc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "priceDesc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, category, sort, viewAll]);

  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => {
    const p = PRODUCTS.find((x) => x.id === i.id);
    return s + (p ? p.price * i.qty : 0);
  }, 0);
  const active = PRODUCTS.find((p) => p.id === activeId) || null;
  const slide = SLIDES[hero];
  const sectionTitle = category
    ? CATS.find((c) => c.id === category)?.name
    : query
      ? "ผลการค้นหา"
      : "สินค้าแนะนำ";

  function openProduct(id) {
    setActiveId(id);
    setOverlay("product");
    setPanel(null);
  }

  function checkout() {
    if (!cart.length) return;
    const items = cart.map((c) => {
      const p = PRODUCTS.find((x) => x.id === c.id);
      return { id: c.id, name: p.name, price: p.price, qty: c.qty, image: p.image };
    });
    const sum = items.reduce((s, i) => s + i.price * i.qty, 0);
    const order = {
      id: `KS${Date.now().toString().slice(-6)}`,
      items,
      total: sum,
      gift: sum >= GIFT_MIN,
      at: new Date().toLocaleString("th-TH"),
    };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    setOverlay(null);
    setTab("orders");
    flash(order.gift ? "สั่งซื้อสำเร็จ พร้อมของแถมหูฟัง" : "สั่งซื้อสำเร็จ");
  }

  function renderGrid(list) {
    if (!list.length) {
      return <p className="py-12 text-center text-sm text-slate-400">ไม่พบสินค้า</p>;
    }
    return (
      <div className="grid grid-cols-2 gap-3">
        {list.map((p) => (
          <ProductCard
            key={p.id}
            p={p}
            wished={favs.includes(p.id)}
            onWish={() => toggleFav(p.id)}
            onAdd={() => addToCart(p.id)}
            onOpen={() => openProduct(p.id)}
          />
        ))}
      </div>
    );
  }

  const cartButton = (
    <button
      aria-label="ตะกร้า"
      onClick={() => {
        setOverlay("cart");
        setPanel(null);
      }}
      className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm"
    >
      <IconCart />
      {count > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#ff3b30] px-1 text-[10px] font-bold text-white">
          {count}
        </span>
      ) : null}
    </button>
  );

  return (
    <div className="flex min-h-screen justify-center bg-[#d5e2f3]">
      <div className="relative flex h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden bg-[#f4f7fb] sm:my-4 sm:h-[calc(100dvh-2rem)] sm:rounded-[32px] sm:shadow-[0_24px_70px_rgba(30,64,175,0.18)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44">
          <div className="absolute -right-8 -top-8 h-36 w-40 rounded-full bg-[#d9e7ff]" />
          <div className="absolute right-10 top-6 h-24 w-24 rounded-full bg-[#e8f1ff]" />
        </div>

        <main className="no-scrollbar relative z-10 flex-1 overflow-y-auto pb-28">
          <div className="flex items-center justify-between px-5 pb-1 pt-3 text-[13px] font-semibold text-slate-900">
            <span>9:41</span>
            <span className="flex items-center gap-1.5 text-slate-800">
              <svg viewBox="0 0 18 12" className="h-3 w-4" fill="currentColor">
                <rect x="0" y="7" width="3" height="5" rx="0.5" />
                <rect x="5" y="4" width="3" height="8" rx="0.5" />
                <rect x="10" y="1.5" width="3" height="10.5" rx="0.5" />
                <rect x="15" y="0" width="3" height="12" rx="0.5" opacity="0.35" />
              </svg>
              <svg viewBox="0 0 16 12" className="h-3 w-4" fill="currentColor">
                <path d="M8 2.2c2.3 0 4.4.9 6 2.3l-1.2 1.3A6.6 6.6 0 0 0 8 4 6.6 6.6 0 0 0 3.2 5.8L2 4.5A8.7 8.7 0 0 1 8 2.2Zm0 3.2c1.4 0 2.6.5 3.6 1.4L10.4 8A3.4 3.4 0 0 0 8 7a3.4 3.4 0 0 0-2.4 1L4.4 6.8A5.2 5.2 0 0 1 8 5.4ZM8 9.2a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Z" />
              </svg>
              <svg viewBox="0 0 25 12" className="h-3 w-6">
                <rect x="0.5" y="0.5" width="21" height="11" rx="2" stroke="currentColor" fill="none" />
                <rect x="2" y="2" width="14" height="8" rx="1" fill="currentColor" />
                <rect x="22.5" y="3.5" width="1.5" height="5" rx="0.5" fill="currentColor" opacity="0.5" />
              </svg>
            </span>
          </div>

          {tab === "home" ? (
            <>
              <header className="flex items-center justify-between px-4 pb-1 pt-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2f6bff] text-white shadow-lg shadow-blue-500/30">
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                      <rect x="2" y="6" width="20" height="12" rx="2.5" />
                      <rect x="4.2" y="8.2" width="2.2" height="2" rx="0.3" fill="#2f6bff" />
                      <rect x="7.4" y="8.2" width="2.2" height="2" rx="0.3" fill="#2f6bff" />
                      <rect x="10.6" y="8.2" width="2.2" height="2" rx="0.3" fill="#2f6bff" />
                      <rect x="13.8" y="8.2" width="2.2" height="2" rx="0.3" fill="#2f6bff" />
                      <rect x="17" y="8.2" width="2.6" height="2" rx="0.3" fill="#2f6bff" />
                      <rect x="5" y="11.4" width="2.2" height="2" rx="0.3" fill="#2f6bff" />
                      <rect x="8.2" y="11.4" width="7.6" height="2" rx="0.3" fill="#2f6bff" />
                      <rect x="16.8" y="11.4" width="2.4" height="2" rx="0.3" fill="#2f6bff" />
                      <rect x="6" y="14.4" width="12" height="1.8" rx="0.3" fill="#2f6bff" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[26px] font-extrabold leading-none text-[#2f6bff]">KeyStore</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">Your Keyboard Store</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {cartButton}
                  <button
                    aria-label="การแจ้งเตือน"
                    onClick={() => setPanel((p) => (p === "bell" ? null : "bell"))}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm"
                  >
                    <IconBell />
                  </button>
                </div>
              </header>

              <div className="mt-3 flex gap-2 px-4">
                <label className="flex h-12 flex-1 items-center gap-2 rounded-2xl bg-white px-3 shadow-sm">
                  <IconSearch className="h-5 w-5 text-slate-400" />
                  <input
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      if (e.target.value) setViewAll(true);
                    }}
                    placeholder="ค้นหาคีย์บอร์ด..."
                    className="w-full bg-transparent text-[14px] outline-none placeholder:text-slate-400"
                  />
                </label>
                <button
                  aria-label="ตัวกรอง"
                  onClick={() => setPanel((p) => (p === "filter" ? null : "filter"))}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm"
                >
                  <IconSliders />
                </button>
              </div>

              {panel === "bell" ? (
                <div className="mx-4 mt-3 rounded-2xl bg-white p-3 shadow-lg">
                  <p className="text-sm font-bold text-slate-800">การแจ้งเตือน</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">คีย์บอร์ดเกมมิ่งหลายรุ่นลดราคาวันนี้</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">ซื้อครบ ฿1,000 รับฟรีหูฟังเกมมิ่ง ของแถมมีจำนวนจำกัด</p>
                </div>
              ) : null}

              {panel === "filter" ? (
                <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-4">
                  {SORTS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSort(s.id)}
                      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        sort === s.id ? "bg-[#2f6bff] text-white" : "bg-white text-slate-500"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              ) : null}

              <section className="px-4 pt-4">
                <div className="relative h-[176px] overflow-hidden rounded-[22px] bg-[#071428]">
                  <img
                    src={slide.image}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 h-full w-full object-cover object-right"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#071428] via-[#071428]/88 to-[#071428]/10" />
                  <div className="relative z-10 max-w-[68%] px-5 pt-5">
                    <p className="text-[20px] font-extrabold leading-tight text-white">{slide.title}</p>
                    <p className="text-[20px] font-extrabold leading-tight text-[#7dd3fc]">{slide.highlight}</p>
                    <p className="mt-1 text-[12px] text-slate-300">{slide.sub}</p>
                    <button
                      onClick={() => shopSlide(slide.go)}
                      className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#2f6bff] px-4 py-1.5 text-sm font-semibold text-white"
                    >
                      ช้อปเลย <span aria-hidden>›</span>
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                    {SLIDES.map((_, i) => (
                      <button
                        key={i}
                        aria-label={`สไลด์ ${i + 1}`}
                        onClick={() => setHero(i)}
                        className={`h-1.5 rounded-full ${i === hero ? "w-5 bg-[#3b82f6]" : "w-1.5 bg-white/55"}`}
                      />
                    ))}
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-5 gap-1.5 px-3 pt-4">
                {CATS.map((c) => (
                  <button key={c.id} onClick={() => pickCategory(c.id)} className="min-w-0">
                    <div
                      className={`mx-auto flex h-[62px] w-[62px] items-center justify-center overflow-hidden rounded-[18px] bg-white shadow-sm ${
                        category === c.id ? "ring-2 ring-[#2f6bff]" : ""
                      }`}
                    >
                      <img src={c.image} alt="" referrerPolicy="no-referrer" className="h-11 w-11 object-contain" />
                    </div>
                    <span className="mt-1.5 block text-center text-[10px] font-medium leading-tight text-slate-500">
                      {c.lines[0]}
                      <br />
                      {c.lines[1]}
                    </span>
                  </button>
                ))}
              </section>

              <section ref={listRef} className="px-4 pt-5">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-[20px] font-extrabold text-slate-800">{sectionTitle}</h2>
                  <button
                    onClick={() => {
                      if (viewAll && !category && !query) {
                        setViewAll(false);
                        setSort("featured");
                      } else {
                        setViewAll(true);
                        setCategory(null);
                        setSort("featured");
                      }
                    }}
                    className="text-[13px] font-semibold text-[#2f6bff]"
                  >
                    {viewAll && !category && !query ? "เฉพาะแนะนำ" : "ดูทั้งหมด"} ›
                  </button>
                </div>
                {renderGrid(visible)}
              </section>

              <button
                onClick={() => setOverlay("cart")}
                className="relative mx-4 mb-4 mt-4 flex h-[92px] w-[calc(100%-2rem)] items-center overflow-hidden rounded-[20px] bg-gradient-to-r from-[#0b1c3f] to-[#16356e] text-left"
              >
                <span className="ml-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <IconGift />
                </span>
                <span className="relative z-10 pl-3">
                  <span className="block text-[14px] font-bold text-white">เมื่อซื้อครบ 1,000.-</span>
                  <span className="block text-[16px] font-extrabold">
                    <span className="text-white">รับฟรี </span>
                    <span className="text-[#7dd3fc]">หูฟังเกมมิ่ง!</span>
                  </span>
                  <span className="block text-[11px] text-slate-300">ของแถมมีจำนวนจำกัด</span>
                </span>
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80"
                  alt="หูฟังเกมมิ่ง"
                  referrerPolicy="no-referrer"
                  className="absolute -right-2 bottom-0 h-[100px] w-[120px] object-contain"
                />
              </button>
            </>
          ) : (
            <div className="px-4 pb-4 pt-3">
              <div className="mb-4 flex items-center justify-between">
                <h1 className="text-xl font-extrabold text-slate-800">
                  {NAV.find((n) => n.id === tab)?.label}
                </h1>
                {cartButton}
              </div>

              {tab === "categories" ? (
                <div className="grid grid-cols-2 gap-3">
                  {CATS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => pickCategory(c.id)}
                      className="rounded-2xl bg-white p-3 text-left shadow-sm"
                    >
                      <div className="flex h-20 items-center justify-center rounded-xl bg-[#f4f7fb]">
                        <img src={c.image} alt="" referrerPolicy="no-referrer" className="h-14 object-contain" />
                      </div>
                      <p className="mt-2 text-sm font-bold text-slate-700">{c.name}</p>
                    </button>
                  ))}
                </div>
              ) : null}

              {tab === "favorites"
                ? renderGrid(PRODUCTS.filter((p) => favs.includes(p.id)))
                : null}

              {tab === "orders" ? (
                orders.length === 0 ? (
                  <div className="py-16 text-center">
                    <p className="text-sm text-slate-400">ยังไม่มีคำสั่งซื้อ</p>
                    <button onClick={() => goTab("home")} className="mt-3 text-sm font-semibold text-[#2f6bff]">
                      ไปเลือกสินค้า
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((o) => (
                      <article key={o.id} className="rounded-2xl bg-white p-3 shadow-sm">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-slate-800">{o.id}</p>
                          <p className="text-sm font-extrabold text-[#2f6bff]">{baht(o.total)}</p>
                        </div>
                        <p className="text-[11px] text-slate-400">{o.at}</p>
                        <ul className="mt-2 space-y-1">
                          {o.items.map((i) => (
                            <li key={i.id} className="text-xs text-slate-600">
                              {i.name} × {i.qty}
                            </li>
                          ))}
                        </ul>
                        {o.gift ? (
                          <p className="mt-2 text-xs font-semibold text-[#2f6bff]">ของแถม: หูฟังเกมมิ่ง</p>
                        ) : null}
                      </article>
                    ))}
                  </div>
                )
              ) : null}

              {tab === "account" ? (
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2f6bff] text-xl font-bold text-white">
                      ม
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-800">มินตรา พิมพ์ดี</p>
                      <p className="text-xs text-slate-400">mintra@keystore.app</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <p className="rounded-xl bg-[#f4f7fb] px-3 py-2">ที่อยู่: 99/1 อาคารคีย์สโตร์ เขตสาธิต กรุงเทพฯ</p>
                    <p className="rounded-xl bg-[#f4f7fb] px-3 py-2">ชำระเงิน: เก็บเงินปลายทาง / บัตร (ตัวอย่าง)</p>
                    <p className="rounded-xl bg-[#f4f7fb] px-3 py-2">รายการโปรด {favs.length} รายการ</p>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </main>

        <nav className="absolute inset-x-0 bottom-0 z-20 border-t border-slate-100 bg-white px-2 pb-2 pt-2">
          <div className="grid grid-cols-5">
            {NAV.map((item) => {
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => goTab(item.id)}
                  className={`flex flex-col items-center gap-0.5 ${active ? "text-[#2f6bff]" : "text-slate-400"}`}
                >
                  {item.id === "home" ? <IconHome active={active} /> : null}
                  {item.id === "categories" ? <IconGrid /> : null}
                  {item.id === "favorites" ? <IconHeart filled={active} /> : null}
                  {item.id === "orders" ? <IconDoc /> : null}
                  {item.id === "account" ? <IconUser /> : null}
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="mx-auto mt-1.5 h-1 w-28 rounded-full bg-black/80" />
        </nav>

        {overlay ? (
          <div className="absolute inset-0 z-30 bg-black/40" onClick={() => setOverlay(null)}>
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-x-0 bottom-0 top-16 flex flex-col rounded-t-[28px] bg-white"
            >
              <div className="flex items-center justify-between px-4 py-3">
                <h2 className="text-base font-extrabold text-slate-800">
                  {overlay === "cart" ? "ตะกร้าสินค้า" : "รายละเอียดสินค้า"}
                </h2>
                <button aria-label="ปิด" onClick={() => setOverlay(null)} className="rounded-full p-1 text-slate-500">
                  <IconClose />
                </button>
              </div>

              {overlay === "cart" ? (
                <>
                  <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4">
                    {cart.length === 0 ? (
                      <p className="py-16 text-center text-sm text-slate-400">ตะกร้าว่างอยู่</p>
                    ) : (
                      cart.map((line) => {
                        const p = PRODUCTS.find((x) => x.id === line.id);
                        if (!p) return null;
                        return (
                          <div key={p.id} className="flex gap-3 rounded-2xl bg-[#f4f7fb] p-2">
                            <img src={p.image} alt="" referrerPolicy="no-referrer" className="h-16 w-20 rounded-xl bg-white object-contain" />
                            <div className="min-w-0 flex-1">
                              <p className="line-clamp-2 text-xs font-bold text-slate-800">{p.name}</p>
                              <p className="text-sm font-extrabold text-[#2f6bff]">{baht(p.price)}</p>
                              <div className="mt-1 flex items-center gap-2">
                                <button onClick={() => setQty(p.id, line.qty - 1)} className="h-7 w-7 rounded-lg bg-white text-slate-600">−</button>
                                <span className="w-4 text-center text-sm">{line.qty}</span>
                                <button onClick={() => setQty(p.id, line.qty + 1)} className="h-7 w-7 rounded-lg bg-white text-slate-600">+</button>
                                <button onClick={() => setQty(p.id, 0)} className="ml-auto text-xs text-rose-500">ลบ</button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div className="border-t px-4 py-3">
                    <div className="mb-2">
                      <div className="mb-1 flex justify-between text-[11px] text-slate-500">
                        <span>{total >= GIFT_MIN ? "รับฟรีหูฟังเกมมิ่งแล้ว" : `ซื้ออีก ${baht(GIFT_MIN - total)} รับฟรีหูฟัง`}</span>
                        <span>{Math.min(100, Math.round((total / GIFT_MIN) * 100))}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full bg-[#2f6bff]" style={{ width: `${Math.min(100, (total / GIFT_MIN) * 100)}%` }} />
                      </div>
                    </div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm text-slate-500">รวม</span>
                      <span className="text-lg font-extrabold text-[#2f6bff]">{baht(total)}</span>
                    </div>
                    <button
                      disabled={!cart.length}
                      onClick={checkout}
                      className="h-11 w-full rounded-2xl bg-[#2f6bff] text-sm font-bold text-white disabled:opacity-40"
                    >
                      สั่งซื้อ
                    </button>
                  </div>
                </>
              ) : active ? (
                <>
                  <div className="no-scrollbar flex-1 overflow-y-auto px-4">
                    <div className="flex h-48 items-center justify-center rounded-2xl bg-[#f4f7fb]">
                      <img src={active.image} alt={active.name} referrerPolicy="no-referrer" className="h-40 object-contain" />
                    </div>
                    <div className="mt-3 flex items-start justify-between gap-3">
                      <h3 className="text-base font-extrabold leading-snug text-slate-800">{active.name}</h3>
                      <button onClick={() => toggleFav(active.id)} className={favs.includes(active.id) ? "text-rose-500" : "text-slate-300"}>
                        <IconHeart filled={favs.includes(active.id)} />
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">
                      <span className="text-amber-400">★</span> {active.rating} ({active.reviews} รีวิว)
                    </p>
                    <p className="mt-2 text-2xl font-extrabold text-[#2f6bff]">
                      {baht(active.price)}{" "}
                      {active.oldPrice ? (
                        <span className="text-sm font-medium text-slate-400 line-through">{baht(active.oldPrice)}</span>
                      ) : null}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{active.blurb}</p>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
                      <div className="rounded-xl bg-[#f4f7fb] px-2 py-2">
                        <p className="text-slate-400">การเชื่อมต่อ</p>
                        <p className="font-semibold text-slate-700">{active.connect}</p>
                      </div>
                      <div className="rounded-xl bg-[#f4f7fb] px-2 py-2">
                        <p className="text-slate-400">เลย์เอาต์</p>
                        <p className="font-semibold text-slate-700">{active.layout}</p>
                      </div>
                      <div className="rounded-xl bg-[#f4f7fb] px-2 py-2">
                        <p className="text-slate-400">สวิตช์</p>
                        <p className="font-semibold text-slate-700">{active.switchType}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 border-t px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setQtyPick((q) => Math.max(1, q - 1))} className="h-10 w-10 rounded-xl bg-[#f4f7fb]">−</button>
                      <span className="w-5 text-center font-bold">{qtyPick}</span>
                      <button onClick={() => setQtyPick((q) => Math.min(10, q + 1))} className="h-10 w-10 rounded-xl bg-[#f4f7fb]">+</button>
                    </div>
                    <button
                      onClick={() => {
                        addToCart(active.id, qtyPick);
                        setOverlay(null);
                      }}
                      className="h-11 flex-1 rounded-2xl bg-[#2f6bff] text-sm font-bold text-white"
                    >
                      ใส่ตะกร้า
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        ) : null}

        {toast ? (
          <div className="absolute left-1/2 top-16 z-50 max-w-[88%] -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-center text-xs text-white shadow-lg">
            {toast}
          </div>
        ) : null}
      </div>
    </div>
  );
}