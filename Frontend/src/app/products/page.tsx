"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { apiGet, PaginatedResponse, ProductDetailDto, ProductListItemDto } from "@/lib/velocityApi";

type UiProduct = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  badgeColor?: string;
  image: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  rating: number;
  reviews: number;
};

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

function mapDetailToUi(p: ProductDetailDto): UiProduct {
  const colors = uniqBy(
    p.variants.map((v) => ({ name: v.color, hex: v.colorHex ?? "#111111" })),
    (c) => `${c.name}|${c.hex}`
  );

  const sizes = uniqBy(p.variants.map((v) => v.size), (s) => s)
    .sort((a, b) => parseFloat(a) - parseFloat(b));

  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: p.category,
    price: `$${p.price.toFixed(2)}`,
    oldPrice: p.oldPrice != null ? `$${Number(p.oldPrice).toFixed(2)}` : undefined,
    badge: p.badge ?? undefined,
    badgeColor: p.badgeColor ?? undefined,
    image:
      p.images.find((i) => i.isPrimary)?.url ??
      p.images[0]?.url ??
      "/images/products/placeholder.png",
    colors,
    sizes,
    rating: p.averageRating,
    reviews: p.reviews,
  };
}

function normalizeCategoryParam(raw: string): string {
  const c = raw.trim().toUpperCase();

  // Allow short aliases from homepage pills
  if (c === "ROAD") return "ROAD RUNNING";
  if (c === "TRAIL") return "TRAIL RUNNING";
  if (c === "TRACK" || c === "TRACKFIELD" || c === "TRACK & FIELD" || c === "TRACK AND FIELD") return "TRACK & FIELD";

  return c;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<UiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Newest");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(300);

  const applyCategoryFromUrl = () => {
    if (typeof window === "undefined") return;
    const raw = new URLSearchParams(window.location.search).get("category");
    if (!raw) return;

    const cat = normalizeCategoryParam(raw);

    setSelectedBrands([]);
    setSelectedSizes([]);
    setMaxPrice(300);
    setSortBy("Newest");
    setSelectedCategories([cat]);
  };

  useEffect(() => {
    applyCategoryFromUrl();

    // Handle back/forward navigation
    const onPop = () => applyCategoryFromUrl();
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const list = await apiGet<PaginatedResponse<ProductListItemDto>>("/api/products?pageNumber=1&pageSize=50");

        // Fetch details so we can derive sizes/colors for UI.
        const details = await Promise.all(list.items.map((x) => apiGet<ProductDetailDto>(`/api/products/${x.id}`)));

        if (!cancelled) {
          setProducts(details.map(mapDetailToUi));
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Derived unique sizes from product data for synchronization
  const availableSizes = useMemo(() => {
    const allSizes = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => allSizes.add(s)));
    return Array.from(allSizes).sort((a, b) => parseFloat(a) - parseFloat(b));
  }, [products]);

  const sortOptions = [
    "Newest",
    "Price: Low to High",
    "Price: High to Low",
    "Trending",
  ];

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => {
      const isSelected = prev.some(b => b.toUpperCase() === brand.toUpperCase());
      return isSelected 
        ? prev.filter(b => b.toUpperCase() !== brand.toUpperCase()) 
        : [...prev, brand];
    });
  };

  const toggleCategory = (category: string) => {
    const formattedCat = category.toUpperCase();
    setSelectedCategories(prev => 
      prev.includes(formattedCat) ? prev.filter(c => c !== formattedCat) : [...prev, formattedCat]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (loading) return [];

    // Filter by Brand
    if (selectedBrands.length > 0) {
      result = result.filter(p => 
        selectedBrands.some(brand => brand.toUpperCase() === p.brand.toUpperCase())
      );
    }

    // Filter by Category
    if (selectedCategories.length > 0) {
      result = result.filter(p => {
        const productCat = p.category.toUpperCase();
        return selectedCategories.some(cat => productCat.includes(cat));
      });
    }

    // Filter by Price
    result = result.filter(p => {
      const price = parseFloat(p.price.replace('$', ''));
      return price <= maxPrice;
    });

    // Filter by Size
    if (selectedSizes.length > 0) {
      result = result.filter(p => 
        p.sizes.some(s => selectedSizes.includes(s))
      );
    }

    // Sorting
    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
    } else if (sortBy === "Newest") {
      // API already returns newest by default (sortBy=newest)
      // Keep current order.
    }

    return result;
  }, [selectedBrands, selectedCategories, selectedSizes, maxPrice, sortBy]);

  return (
    <main className="min-h-screen bg-white text-[#1A2E35] pt-28 pb-20">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex gap-12">
        
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-72 shrink-0 space-y-10">
          {/* Sort By */}
          <div className="space-y-4">
            <h5 className="font-black uppercase tracking-widest text-[11px] text-neutral-400">Sort By</h5>
            <div className="relative">
              <div 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full bg-white border-2 border-black rounded-2xl py-3.5 px-5 text-[15px] font-bold flex items-center justify-between cursor-pointer hover:border-[#FF5E1F] transition-colors"
              >
                <span>{sortBy}</span>
                <svg className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
              
              {isSortOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                  {sortOptions.map((option) => (
                    <div 
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortOpen(false);
                      }}
                      className={`px-4 py-2.5 text-[14px] cursor-pointer transition-colors border-b border-neutral-100 last:border-0 italic ${
                        sortBy === option 
                        ? 'bg-[#1D63D2] text-white font-bold' 
                        : 'hover:bg-neutral-50 text-neutral-700 font-medium'
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>


          {/* Price Range */}
          <div className="space-y-6">
            <h5 className="font-black uppercase tracking-widest text-[11px] text-neutral-400">Price Range</h5>
            <div className="px-2">
              <input 
                type="range" 
                min="0" 
                max="300" 
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full h-1 bg-neutral-100 rounded-full appearance-none cursor-pointer accent-[#FF5E1F]"
              />
              <div className="flex justify-between mt-4 text-[13px] font-bold text-neutral-400">
                <span>$0</span>
                <span className="text-[#1A2E35]">${maxPrice}{maxPrice === 300 ? '+' : ''}</span>
              </div>
            </div>
          </div>

          {/* Shoe Size */}
          <div className="space-y-6">
            <h5 className="font-black uppercase tracking-widest text-[11px] text-neutral-400">Shoe Size</h5>
            <div className="grid grid-cols-3 gap-2">
              {availableSizes.map((size) => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button 
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`h-12 rounded-xl text-[13px] font-bold border-2 transition-all ${
                      isSelected 
                      ? 'border-black bg-black text-white shadow-lg' 
                      : 'border-neutral-100 text-neutral-500 hover:border-black'
                    }`}
                  >
                    US {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Filter (Visual Only) */}
          <div className="space-y-6">
            <h5 className="font-black uppercase tracking-widest text-[11px] text-neutral-400">Colors</h5>
            <div className="flex flex-wrap gap-4">
              {[
                { name: 'Orange', bg: 'bg-[#FF5E1F]' },
                { name: 'Red', bg: 'bg-[#EF4444]' },
                { name: 'Blue', bg: 'bg-[#3B82F6]' },
                { name: 'Black', bg: 'bg-[#111111]' },
                { name: 'Green', bg: 'bg-[#10B981]' },
                { name: 'White', bg: 'bg-white border border-neutral-200' },
              ].map((color) => (
                <div key={color.name} className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className={`w-8 h-8 rounded-full ${color.bg} ring-2 ring-offset-2 ring-transparent group-hover:ring-[#FF5E1F] transition-all`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="space-y-6">
            <h5 className="font-black uppercase tracking-widest text-[11px] text-neutral-400">Brand</h5>
            <div className="space-y-3">
              {['Nike', 'Adidas', 'ASICS'].map((brand) => {
                const isSelected = selectedBrands.some(b => b.toUpperCase() === brand.toUpperCase());
                return (
                  <label 
                    key={brand} 
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => toggleBrand(brand)}
                  >
                    <div className={`w-5 h-5 border-2 rounded-md transition-colors flex items-center justify-center ${isSelected ? 'border-[#FF5E1F] bg-[#FF5E1F]' : 'border-neutral-200 group-hover:border-[#FF5E1F]'}`}>
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                    <span className={`text-[14px] font-bold transition-colors ${isSelected ? 'text-[#1A2E35]' : 'text-neutral-400 group-hover:text-neutral-600'}`}>
                      {brand}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-6">
            <h5 className="font-black uppercase tracking-widest text-[11px] text-neutral-400">Category</h5>
            <div className="space-y-3">
              {['Road Running', 'Trail Running', 'Track & Field', 'Sportswear'].map((cat) => {
                const isSelected = selectedCategories.includes(cat.toUpperCase());
                return (
                  <label 
                    key={cat} 
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => toggleCategory(cat)}
                  >
                    <div className={`w-5 h-5 border-2 rounded-md transition-colors flex items-center justify-center ${isSelected ? 'border-[#FF5E1F] bg-[#FF5E1F]' : 'border-neutral-200 group-hover:border-[#FF5E1F]'}`}>
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                    <span className={`text-[14px] font-bold transition-colors uppercase italic tracking-tighter ${isSelected ? 'text-[#1A2E35]' : 'text-neutral-400 group-hover:text-neutral-600'}`}>
                      {cat}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-grow">
          {loading ? (
            <div className="py-32 text-neutral-400 font-bold">Loading products...</div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16 animate-in fade-in duration-500">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-300">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-neutral-400 font-bold italic">No matching models found in this selection.</p>
              <button 
                onClick={() => { setSelectedBrands([]); setSelectedCategories([]); setSelectedSizes([]); setMaxPrice(300); }}
                className="text-[#FF5E1F] font-black uppercase tracking-widest text-[11px] border-b-2 border-[#FF5E1F] pb-0.5"
              >
                Clear all filters
              </button>
            </div>
          )}
          
          {filteredProducts.length > 0 && (
            <div className="mt-24 flex justify-center">
              <button className="px-12 py-5 bg-[#1A2E35] text-white rounded-full font-black uppercase tracking-widest text-[13px] hover:bg-[#FF5E1F] transition-all shadow-2xl shadow-neutral-200 active:scale-95">
                Load More Models
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
