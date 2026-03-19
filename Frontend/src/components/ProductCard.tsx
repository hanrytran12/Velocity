import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    category: string;
    price: string;
    oldPrice?: string;
    badge?: string;
    badgeColor?: string;
    categoryColor?: string;
    swatches?: string[];
    image: string;
    rating?: number;
    reviews?: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group cursor-pointer flex flex-col gap-5">
      <div className="relative aspect-square bg-[#F3F4F6] rounded-2xl overflow-hidden flex items-center justify-center transition-all group-hover:bg-neutral-200">
        <Image 
          src={product.image} 
          alt={product.name}
          width={500}
          height={500}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        
        {/* Heart Icon */}
        <button className="absolute top-4 right-4 bg-white text-[#1A2E35] w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all group-hover:scale-110 active:scale-95 z-10">
          <svg width="20" height="20" fill={product.id === 1 ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Badge (HOT DEAL / NEW) */}
        {product.badge && (
          <div className={`absolute top-4 left-4 ${product.badgeColor || 'bg-[#FF5E1F]'} text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider`}>
            {product.badge}
          </div>
        )}
      </div>

      <div className="relative flex justify-between items-end pr-2">
        <div className="space-y-1">
          <p className="text-[11px] font-black uppercase tracking-widest text-[#FF5E1F]">
            {product.category}
          </p>
          <h3 className="font-bold text-[19px] text-[#1A2E35] leading-tight tracking-tight">{product.name}</h3>
          <div className="flex flex-col gap-0.5 pt-1">
            <span className="font-black text-[18px] text-[#1A2E35]">{product.price}</span>
            {product.oldPrice && (
              <span className="text-neutral-300 text-[14px] line-through font-medium tracking-tight leading-none">{product.oldPrice}</span>
            )}
          </div>
        </div>

        {/* Swatches */}
        <div className="flex gap-2 pb-1.5">
          {product.swatches?.slice(0, 3).map((color, idx) => (
            <div key={idx} className={`w-3.5 h-3.5 rounded-full ring-offset-2 transition-all ${idx === 0 ? 'ring-2 ring-orange-500' : 'ring-1 ring-neutral-200'}`} style={{ backgroundColor: color }}></div>
          ))}
          {!product.swatches && (
             <div className="flex gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#FF5E1F] ring-2 ring-[#FF5E1F] ring-offset-2"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#3B82F6] ring-1 ring-neutral-200"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-black ring-1 ring-neutral-200"></div>
             </div>
          )}
        </div>
      </div>
    </Link>
  );
}
