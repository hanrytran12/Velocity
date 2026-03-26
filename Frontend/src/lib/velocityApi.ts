export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5287";

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    // We want fresh data for demo-like behavior.
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GET ${path} failed (${res.status}): ${text}`);
  }

  return (await res.json()) as T;
}

export type ProductListItemDto = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number | null;
  badge?: string | null;
  badgeColor?: string | null;
  image: string;
  averageRating: number;
  reviews: number;
};

export type PaginatedResponse<T> = {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type ProductImageDto = { url: string; isPrimary: boolean; sortOrder: number };
export type ProductSpecDto = { label: string; value: string; sortOrder: number };
export type ProductVariantDto = {
  id: string;
  size: string;
  color: string;
  colorHex?: string | null;
  stockQuantity: number;
  sku: string;
};

export type ProductDetailDto = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number | null;
  badge?: string | null;
  badgeColor?: string | null;
  description: string;
  details: string;
  technologyContent: string;
  averageRating: number;
  reviews: number;
  images: ProductImageDto[];
  specs: ProductSpecDto[];
  variants: ProductVariantDto[];
};

export type ProductReviewDto = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  customerName: string;
};
