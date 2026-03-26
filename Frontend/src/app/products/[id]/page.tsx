"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { apiGet, PaginatedResponse, ProductDetailDto, ProductListItemDto, ProductReviewDto } from "@/lib/velocityApi";

function uniqBy<T, K>(items: T[], getKey: (x: T) => K): T[] {
  const seen = new Set<K>();
  const out: T[] = [];
  for (const it of items) {
    const k = getKey(it);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(it);
  }
  return out;
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart();
  const productId = params.id;

  const [product, setProduct] = useState<ProductDetailDto | null>(null);
  const [reviews, setReviews] = useState<ProductReviewDto[]>([]);
  const [related, setRelated] = useState<ProductDetailDto[]>([]);

  const [selectedSize, setSelectedSize] = useState<string>("8.5");
  const [selectedColor, setSelectedColor] = useState<string>("Default");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "tech">("details");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const p = await apiGet<ProductDetailDto>(`/api/products/${productId}`);
        const r = await apiGet<ProductReviewDto[]>(`/api/products/${productId}/reviews`);

        if (cancelled) return;

        setProduct(p);
        setReviews(r);

        // Default selections from variants
        const firstVariant = p.variants[0];
        if (firstVariant) {
          setSelectedSize(firstVariant.size);
          setSelectedColor(firstVariant.color);
        }

        // Related products (simple: fetch list and take 4 others)
        const list = await apiGet<PaginatedResponse<ProductListItemDto>>("/api/products?pageNumber=1&pageSize=12");
        const otherIds = list.items.filter((x) => x.id !== productId).slice(0, 4).map((x) => x.id);
        const otherDetails = await Promise.all(otherIds.map((id) => apiGet<ProductDetailDto>(`/api/products/${id}`)));
        if (!cancelled) setRelated(otherDetails);
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [productId]);

  const derived = useMemo(() => {
    if (!product) return null;

    const colors = uniqBy(
      product.variants.map((v) => ({ name: v.color, hex: v.colorHex ?? "#111111" })),
      (c) => `${c.name}|${c.hex}`
    );

    const sizes = uniqBy(product.variants.map((v) => v.size), (s) => s).sort(
      (a, b) => parseFloat(a) - parseFloat(b)
    );

    const primaryImage =
      product.images.find((i) => i.isPrimary)?.url ?? product.images[0]?.url ?? "/images/products/placeholder.png";

    return { colors, sizes, primaryImage };
  }, [product]);

  const handleAddToCart = () => {
    if (!product || !derived) return;

    addToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: `$${product.price.toFixed(2)}`,
      image: derived.primaryImage,
      size: selectedSize,
      color: selectedColor,
      quantity,
      selected: true,
    });
  };

  const updateQuantity = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  if (!product || !derived) {
    return (
      <main className="min-h-screen bg-white pt-28 pb-20">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="text-neutral-400 font-bold">Loading product...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-neutral-400 mb-10">
          <Link href="/" className="hover:text-[#1A2E35] transition-colors">
            HOME
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#1A2E35] transition-colors">
            SHOES
          </Link>
          <span>/</span>
          <span className="text-[#1A2E35] text-center w-full md:w-auto">{product.name}</span>
        </nav>

        {/* Product Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 mb-32">
          {/* Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white mb-6 group cursor-zoom-in flex items-center justify-center p-8">
              <Image
                src={derived.primaryImage}
                alt={product.name}
                fill
                className="object-contain transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {(product.images.length > 0 ? product.images : [{ url: derived.primaryImage, isPrimary: true, sortOrder: 0 }]).slice(0, 4).map((img, i) => (
                <div
                  key={img.url + i}
                  className={`aspect-square rounded-2xl overflow-hidden bg-white cursor-pointer border-2 transition-all p-2 flex items-center justify-center ${i === 0 ? "border-[#FF5E1F]" : "border-transparent hover:border-neutral-200"}`}
                >
                  <Image src={img.url} alt={`${product.name} view ${i + 1}`} width={150} height={150} className="object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8 space-y-4">
              <div className="flex items-center gap-4">
                <span className="bg-[#FF5E1F]/10 text-[#FF5E1F] px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest">
                  {product.badge || "NEW ARRIVAL"}
                </span>
                <div className="flex items-center gap-1.5 text-[#FF5E1F] text-[13px] font-black">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span>
                    {product.averageRating} ({product.reviews} Reviews)
                  </span>
                </div>
              </div>
              <h1 className="text-[56px] md:text-[64px] font-black italic uppercase tracking-tighter leading-[0.85] text-[#1A2E35]">
                {product.name}
              </h1>
              <p className="text-neutral-400 font-bold text-lg tracking-tight uppercase">Ultimate Response {product.category} Performance</p>
              <div className="pt-4">
                <span className="text-[48px] font-black text-[#FF5E1F] leading-none tracking-tighter">${product.price.toFixed(2)}</span>
              </div>
            </div>

            {/* Selection */}
            <div className="space-y-10 mb-12">
              <div className="space-y-6">
                <h5 className="font-black uppercase tracking-[0.15em] text-[11px] text-neutral-400">
                  SELECT COLOR: <span className="text-[#1A2E35]">{selectedColor.toUpperCase()}</span>
                </h5>
                <div className="flex gap-6">
                  {derived.colors.map((color) => (
                    <button key={color.name} onClick={() => setSelectedColor(color.name)} className="flex flex-col items-center group">
                      <div
                        className={`w-12 h-12 rounded-full border-2 p-[4px] transition-all transform duration-300 ${selectedColor === color.name ? "border-[#FF5E1F] scale-110 shadow-lg shadow-orange-500/20" : "border-neutral-100 hover:border-neutral-300"}`}
                      >
                        <div className="w-full h-full rounded-full border border-black/5" style={{ backgroundColor: color.hex }}></div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <h5 className="font-black uppercase tracking-[0.15em] text-[11px] text-neutral-400">SELECT SIZE (US)</h5>
                  <button className="text-[11px] font-black uppercase tracking-widest text-[#FF5E1F] border-b-2 border-[#FF5E1F] leading-none pb-0.5">Size Guide</button>
                </div>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                  {derived.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-14 rounded-xl text-[16px] font-black transition-all ${selectedSize === size ? "bg-[#FF5E1F] text-white shadow-lg shadow-orange-500/20" : "bg-[#F9FAFB] text-[#1A2E35] hover:bg-neutral-100"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center bg-[#F9FAFB] rounded-[14px] p-1 border border-neutral-100">
                <button onClick={() => updateQuantity(-1)} className="w-12 h-14 flex items-center justify-center text-neutral-400 hover:text-[#1A2E35] transition-colors">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <span className="w-10 text-center font-black text-xl text-[#1A2E35] tabular-nums">{quantity}</span>
                <button onClick={() => updateQuantity(1)} className="w-12 h-14 flex items-center justify-center text-neutral-400 hover:text-[#1A2E35] transition-colors">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#FF5E1F] text-white h-16 rounded-[14px] font-black uppercase tracking-widest text-[15px] hover:bg-[#E64D13] transition-all active:scale-[0.98] shadow-xl shadow-orange-500/20 flex items-center justify-center gap-3"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
                ADD TO CART
              </button>
            </div>
          </div>
        </div>

        {/* Product Info Tabs */}
        <section className="mb-24">
          <div className="flex gap-12 border-b border-neutral-100 mb-12">
            {[{ id: "details", label: "PRODUCT DETAILS" }, { id: "tech", label: "TECHNOLOGY" }].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "details" | "tech")}
                className={`pb-6 text-[14px] font-black tracking-[0.2em] transition-all relative ${activeTab === tab.id ? "text-[#1A2E35]" : "text-neutral-300 hover:text-neutral-400"}`}
              >
                {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF5E1F] animate-in slide-in-from-left duration-300"></div>}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-32 items-start animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-8">
              <div className="prose prose-neutral max-w-none">
                <p className="text-neutral-500 font-medium text-lg leading-relaxed">
                  {activeTab === "details" ? product.details : product.technologyContent}
                </p>
                <p className="text-neutral-500 font-medium text-lg leading-relaxed mt-4">
                  {activeTab === "details" ? product.description : "This cutting-edge integration ensures maximum efficiency, allowing you to push your limits with every stride."}
                </p>
              </div>
            </div>

            <div className="bg-white border-t border-x border-neutral-100 rounded-2xl overflow-hidden shadow-2xl shadow-neutral-100/50">
              <div className="px-6 py-4 bg-[#F9FAFB] border-b border-neutral-100 flex items-center justify-between">
                <h4 className="text-[12px] font-black uppercase tracking-widest text-neutral-400">Technical Specs</h4>
              </div>
              <div className="divide-y divide-neutral-100">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="px-6 py-4 flex justify-between gap-6">
                    <span className="text-[13px] font-black uppercase tracking-widest text-neutral-400">{spec.label}</span>
                    <span className="text-[14px] font-bold text-[#1A2E35] text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="mb-24">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-[28px] md:text-[34px] font-black italic uppercase tracking-tight text-[#1A2E35] leading-none">Customer Reviews</h2>
              <p className="text-neutral-400 font-bold uppercase tracking-widest text-[11px] mt-3">
                {reviews.length} reviews for this product
              </p>
            </div>
          </div>

          {reviews.length === 0 ? (
            <div className="text-neutral-400 font-bold">No reviews yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((r) => (
                <div key={r.id} className="border border-neutral-100 rounded-2xl p-6 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-black text-[#1A2E35] uppercase tracking-wide text-[13px]">{r.customerName}</div>
                    <div className="text-neutral-400 font-bold text-[12px]">{new Date(r.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="flex items-center gap-1 text-[#FF5E1F] mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < r.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-neutral-600 font-medium leading-relaxed">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mb-10">
            <div className="flex items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="text-[28px] md:text-[34px] font-black italic uppercase tracking-tight text-[#1A2E35] leading-none">You may also like</h2>
                <p className="text-neutral-400 font-bold uppercase tracking-widest text-[11px] mt-3">More from the catalog</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {related.map((p) => {
                const colors = uniqBy(
                  p.variants.map((v) => ({ name: v.color, hex: v.colorHex ?? "#111111" })),
                  (c) => `${c.name}|${c.hex}`
                );
                const sizes = uniqBy(p.variants.map((v) => v.size), (s) => s).sort((a, b) => parseFloat(a) - parseFloat(b));
                const image = p.images.find((i) => i.isPrimary)?.url ?? p.images[0]?.url ?? "/images/products/placeholder.png";

                return (
                  <ProductCard
                    key={p.id}
                    product={{
                      id: p.id,
                      name: p.name,
                      brand: p.brand,
                      category: p.category,
                      price: `$${p.price.toFixed(2)}`,
                      oldPrice: p.oldPrice != null ? `$${Number(p.oldPrice).toFixed(2)}` : undefined,
                      badge: p.badge ?? undefined,
                      badgeColor: p.badgeColor ?? undefined,
                      image,
                      colors,
                      sizes,
                    }}
                  />
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
