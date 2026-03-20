export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  badgeColor?: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  details: string;
  technologyContent: string;
  specs: { label: string; value: string }[];
  colors: { name: string; hex: string }[];
  sizes: string[];
}

export const products: Product[] = [



  {
    id: 4,
    name: "Adidas Supernova Glide M",
    brand: "Adidas",
    category: "ROAD RUNNING",
    price: "$130.00",
    rating: 4.7,
    reviews: 112,
    image: "/images/products/SUPERNOVA GLIDE M.jpg",
    description: "An incredibly versatile and durable daily trainer delivering a balanced and smooth ride.",
    details: "The Adidas Supernova Glide M is engineered for runners seeking a perfect balance between comfort and responsiveness. The breathable engineered mesh upper adapts to your foot for a personalized fit, while the supportive heel counter locks you in. This shoe is built to handle your everyday miles with reliable durability and a consistent feel from step-in to cool down.",
    technologyContent: "The midsole combines Adidas's premium cushioning technologies to provide exceptional shock absorption and energy return. It delivers a bouncy feel underfoot without sacrificing stability. The durable rubber outsole offers excellent traction on both wet and dry road surfaces, ensuring a confident stride in various conditions.",
    specs: [
      { label: "Heel Drop", value: "10mm" },
      { label: "Weight", value: "295g" },
      { label: "Midsole", value: "Boost Layer" },
      { label: "Material", value: "Engineered Mesh" }
    ],
    colors: [
      { name: "Core Black", hex: "#111111" },
      { name: "Cloud White", hex: "#FFFFFF" }
    ],
    sizes: ["7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"]
  },
  {
    id: 5,
    name: "Adidas Terrex Agravic Speed Ultra",
    brand: "Adidas",
    category: "TRAIL RUNNING",
    price: "$220.00",
    badge: "ELITE",
    badgeColor: "bg-[#111111]",
    rating: 4.8,
    reviews: 56,
    image: "/images/products/Ultra Trail Terrex Agravic Speed.jpg",
    description: "The ultimate race-day trail shoe built for speed over long distances with LIGHTSTRIKE PRO cushioning.",
    details: "Built for speed on the trails, the Terrex Agravic Speed Ultra combines race-winning technologies with rugged outdoor durability. The upper is exceptionally breathable and features a snug, sock-like fit that keeps debris out. EnergyRods provide a propulsive feel, guiding you efficiently through every stride over unpredictable terrain.",
    technologyContent: "The midsole features dual layers of LIGHTSTRIKE PRO foam for maximum energy return and shock absorption on long ultra races. Integrated EnergyRods limit energy loss at toe-off. The Continental™ Rubber outsole features an aggressive lug pattern optimized for confident grip on both wet and dry technical trails.",
    specs: [
      { label: "Weight", value: "270g" },
      { label: "Drop", value: "8mm" },
      { label: "Midsole", value: "LIGHTSTRIKE PRO" },
      { label: "Outsole", value: "Continental™ Rubber" }
    ],
    colors: [
      { name: "Impact Orange", hex: "#FF5E1F" },
      { name: "Core Black", hex: "#111111" }
    ],
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11"]
  },

  {
    id: 6,
    name: "Adidas Adizero Prime X 2.0 STRUNG",
    brand: "Adidas",
    category: "TRACK & FIELD",
    price: "$299.99",
    badge: "ELITE",
    badgeColor: "bg-[#111111]",
    rating: 4.9,
    reviews: 82,
    image: "/images/products/Adizero Prime X 2.0 STRUNG.jpg",
    description: "Rule-breaking distance running shoe with double carbon plates and max cushion LIGHTSTRIKE PRO.",
    details: "Built without the constraints of world race regulations, the Adizero Prime X 2.0 STRUNG pushes the boundaries of speed. The innovative STRUNG upper is seamlessly coded to provide a lightweight cocoon around the foot, offering targeted support precisely where you need it. Designed for personal bests and training runs where you want to experience maximum propulsion.",
    technologyContent: "This shoe features a massive stack height with three layers of LIGHTSTRIKE PRO foam for unparalleled cushioning and energy return. Between these layers sit two carbon-infused plates, creating a stiff, remarkably springy platform that maximizes forward momentum. The Continental™ Rubber outsole ensures reliable grip at high speeds.",
    specs: [
      { label: "Weight", value: "295g" },
      { label: "Drop", value: "6.5mm" },
      { label: "Midsole", value: "3x LIGHTSTRIKE PRO" },
      { label: "Plates", value: "2x Carbon Plates" }
    ],
    colors: [
      { name: "Lucid Lemon", hex: "#E8F04B" },
      { name: "Core Black", hex: "#111111" }
    ],
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11"]
  },

  {
    id: 7,
    name: "Nike Air Zoom Pegasus 40",
    brand: "Nike",
    category: "ROAD RUNNING",
    price: "$86.99",
    oldPrice: "$159.00",
    badge: "SALE",
    rating: 4.8,
    reviews: 245,
    image: "/images/products/Nike Air Zoom Pegasus 40.jpg",
    description: "The trusted daily trainer with React foam and dual Zoom Air units for a springy, responsive ride.",
    details: "The Pegasus 40 delivers familiar comfort with an upgraded midfoot feel, designed for everything from marathon training to casual runs. The single-layer mesh upper ensures breathability and support, while the larger heel counter provides a more comfortable landing and reduces impact on knees and hips. Flex grooves at the toe allow natural forward push-off for a smooth stride.",
    technologyContent: "Nike React technology provides a lightweight, durable foam for a smooth and responsive ride that maintains its shape run after run. Combined with two Zoom Air units (one in the forefoot and one in the heel), it delivers an energized, springy feel at toe-off with superior impact protection. The classic waffle-inspired outsole provides reliable road traction.",
    specs: [
      { label: "Weight", value: "262g" },
      { label: "Drop", value: "10mm" },
      { label: "Technology", value: "React + 2x Zoom Air" }
    ],
    colors: [
      { name: "White/Chrome", hex: "#FFFFFF" },
      { name: "Phantom", hex: "#F5F5DC" }
    ],
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9"]
  },

  {
    id: 11,
    name: "Nike Juniper Trail 2 NN",
    brand: "Nike",
    category: "TRAIL RUNNING",
    price: "$67.99",
    oldPrice: "$85.00",
    badge: "SALE",
    rating: 4.6,
    reviews: 58,
    image: "https://sneakerdaily.vn/wp-content/uploads/2024/05/Giay-WMNS-Nike-Juniper-Trail-2-Next-Nature-Summit-White-Thunder-Blue-DM0821-103.jpg",
    description: "Rugged trail-running shoe made with Nike Grind materials for a sustainable, grippy ride.",
    details: "The Nike Juniper Trail 2 Next Nature is a rugged trail-running shoe designed for the female explorer. Built with a durable woven mesh upper and synthetic leather overlays, it ensures your feet stay protected from trail debris while maintaining breathability. The flexible midfoot system connects the upper and midsole for increased stability on uneven paths.",
    technologyContent: "Featuring Nike Grind—a material recycled from manufacturing scraps—in the outsole, this shoe combines performance with sustainability. The tapered lugs and multi-directional traction pattern provide exceptional grip on both climbing and descending technical paths, while the full-length foam midsole absorbs impact.",
    specs: [
      { label: "Weight", value: "225g" },
      { label: "Drop", value: "9.5mm" },
      { label: "Material", value: "Nike Grind / Mesh" }
    ],
    colors: [
      { name: "Summit White", hex: "#F5F5DC" }
    ],
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11"]
  },
  {
    id: 12,
    name: "Nike Dragonfly 2",
    brand: "Nike",
    category: "TRACK & FIELD",
    price: "$143.99",
    oldPrice: "$179.00",
    badge: "ELITE",
    rating: 5.0,
    reviews: 24,
    image: "https://sneakerdaily.vn/wp-content/uploads/2025/04/Giay-Nike-Dragonfly-2-White-Black-Vapor-Green-Volt-FD8413-102.jpg",
    description: "The ultimate track spike for distance runners, featuring ZoomX foam and a carbon fiber plate.",
    details: "Dominate the track with the Nike Dragonfly 2. Engineered for elite distance runners, this lightweight spike offers an unparalleled combination of speed and comfort. The engineered mesh upper is ultra-light and breathable, while the internal supports ensure a locked-in feel for every lap during 1500m to 10k races.",
    technologyContent: "Combining a full-length ZoomX foam midsole—Nike's lightest and most responsive foam—with an integrated Carbon Fiber plate, the Dragonfly 2 delivers maximum energy return and snap. The redesigned spike plate provides aggressive traction on the track, allowing for a more efficient and powerful stride.",
    specs: [
      { label: "Type", value: "Track Spike" },
      { label: "Midsole", value: "ZoomX Foam" },
      { label: "Plate", value: "Carbon Fiber" }
    ],
    colors: [
      { name: "White/Volt", hex: "#FFFFFF" }
    ],
    sizes: ["7.5", "8", "8.5", "9", "9.5", "10", "10.5"]
  },
  {
    id: 13,
    name: "ASICS Gel-Nimbus 26",
    brand: "ASICS",
    category: "ROAD RUNNING",
    price: "$171.99",
    rating: 4.9,
    reviews: 156,
    image: "/images/products/nimbus26.jpg",
    description: "Maximum cushioning and plush comfort for long-distance daily training.",
    details: "The ASICS Gel-Nimbus 26 is a premium cushioned daily trainer designed for maximum comfort on long, easy runs. Featuring a soft engineered knit upper and an updated knit collar, it provides a plush, adaptive fit with superior ventilation to keep your feet cool across high mileage.",
    technologyContent: "Equipped with PureGEL™ technology in the heel—65% softer than conventional gel—for smoother landings. The midsole features FF BLAST™ PLUS ECO cushioning, made with 24% bio-based content, delivering a lightweight and energized ride while reducing environmental impact.",
    specs: [
      { label: "Weight", value: "304g" },
      { label: "Drop", value: "8mm" },
      { label: "Technology", value: "PureGEL™" },
      { label: "Midsole", value: "FF BLAST™ PLUS ECO" }
    ],
    colors: [
      { name: "Black/Graphite", hex: "#111111" }
    ],
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11"]
  },
  {
    id: 14,
    name: "ASICS Gel-Kayano 31",
    brand: "ASICS",
    category: "ROAD RUNNING",
    price: "$171.99",
    oldPrice: "$185.00",
    badge: "STABILITY",
    rating: 4.8,
    reviews: 112,
    image: "/images/products/Gel-Kayano 31.jpg",
    description: "Maximum stability with revolutionary 4D GUIDANCE SYSTEM™ for a smooth, supported stride.",
    details: "The GEL-KAYANO™ 31 combines maximum support with outstanding comfort for absolute peace of mind. As our most advanced stability shoe, it is designed to help you run further for longer. With flexible stability and superior comfort, you'll wish the road would never end. The technical mesh upper enhances breathability, with 64% of the upper made from recycled materials.",
    technologyContent: "The revolutionary 4D GUIDANCE SYSTEM™ includes four separate components supporting the foot at every landing, delivering maximum stability. PureGEL™ technology improves softness and shock absorption to reduce impact. FF BLAST™ PLUS ECO foam provides optimal comfort with an energized ride. The Hybrid ASICSGRIP™ outsole delivers enhanced grip and high durability, while the OrthoLite™ X-55 insole manages moisture for a cool, comfortable run.",
    specs: [
      { label: "Weight", value: "275g" },
      { label: "Drop", value: "10mm" },
      { label: "Support", value: "4D GUIDANCE SYSTEM™" },
      { label: "Technology", value: "PureGEL™ + FF BLAST™ PLUS ECO" }
    ],
    colors: [
      { name: "Pale Mint", hex: "#98D8C8" },
      { name: "Light Blue", hex: "#87CEEB" }
    ],
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9"]
  },
  {
    id: 15,
    name: "ASICS Metaspeed Sky Paris",
    brand: "ASICS",
    category: "ROAD RUNNING",
    price: "$259.99",
    badge: "ELITE",
    badgeColor: "bg-[#FF5E1F]",
    rating: 5.0,
    reviews: 42,
    image: "/images/products/metaspeedskyparis.jpg",
    description: "Ultra-lightweight carbon-plated racer designed for maximum stride length.",
    details: "Built for elite 'stride-style' runners, the Metaspeed Sky Paris is designed to increase speed by extending stride length. The ultra-lightweight MOTIONWRAP™ 2.0 upper provides a secure, zero-distraction fit, allowing you to focus entirely on the finish line of your next marathon.",
    technologyContent: "The midsole features the revolutionary FF BLAST™ TURBO PLUS foam, providing explosive energy return and a softer underfoot feel. A strategically placed full-length carbon plate works with the high-stack foam to propel you forward with every kickoff, optimizing your most powerful strides.",
    specs: [
      { label: "Category", value: "Elite Racing" },
      { label: "Midsole", value: "FF BLAST™ TURBO PLUS" },
      { label: "Plate", value: "Carbon Fiber" },
      { label: "Upper", value: "MOTIONWRAP™ 2.0" }
    ],
    colors: [
      { name: "Sunrise Red", hex: "#FF4500" }
    ],
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5"]
  },
  {
    id: 16,
    name: "ASICS Trabuco Max 5",
    brand: "ASICS",
    category: "TRAIL RUNNING",
    price: "$172.99",
    oldPrice: "$199.99",
    badge: "TRAIL ELITE",
    rating: 4.9,
    reviews: 28,
    image: "/images/products/trabucomax5.jpg",
    description: "Advanced grip and cloud-like comfort for superior confidence on technical trail routes.",
    details: "The TRABUCO MAX™ 5 trail shoe offers advanced grip and comfort to help you tackle trail routes with maximum confidence. ASICSGRIP™ technology is strategically placed in the outsole to enhance traction on off-road terrain. FF BLAST™ PLUS technology in the midsole provides cloud-like cushioning and responsive energy return for a smooth ride.",
    technologyContent: "Featuring FF BLAST™ PLUS cushioning for exceptional impact absorption and GUIDESOLE™ technology to promote an efficient forward roll. The ASICSGRIP™ outsole rubber provides elite-level traction on rocky, wet, or muddy paths, giving you total confidence in every step.",
    specs: [
      { label: "Tech", value: "GUIDESOLE™" },
      { label: "Outsole", value: "ASICSGRIP™" },
      { label: "Midsole", value: "FF BLAST™ PLUS" },
      { label: "Weight", value: "302g" }
    ],
    colors: [
      { name: "Cobalt Burst", hex: "#4B5563" }
    ],
    sizes: ["8", "8.5", "9", "9.5", "10", "11"]
  },
  {
    id: 17,
    name: "ASICS Metaspeed LD 2",
    brand: "ASICS",
    category: "TRACK & FIELD",
    price: "$227.99",
    badge: "PRO",
    rating: 4.9,
    reviews: 18,
    image: "/images/products/metaspeedld2.jpg",
    description: "High-energy track spike designed for sustained performance in long-distance racing.",
    details: "The Metaspeed LD 2 is the ultimate weapon for long-distance track events. Developed for 3,000m to 10,000m races, it features an optimized spike configuration and a MOTIONWRAP™ 2.0 upper for the lightest possible racing experience on the oval.",
    technologyContent: "Utilizing full-length FF BLAST™ TURBO foam and an integrated carbon fiber plate, it delivers sustained energy return for every lap. This 'super-spike' is designed to maintain your pace and efficiency when fatigue sets in during the final stages of the race.",
    specs: [
      { label: "Weight", value: "159g" },
      { label: "Midsole", value: "FF BLAST™ TURBO" },
      { label: "Plate", value: "Carbon Fiber" },
      { label: "Events", value: "3k - 10k" }
    ],
    colors: [
      { name: "Pink/Volt", hex: "#FF69B4" }
    ],
    sizes: ["7.5", "8", "8.5", "9", "9.5", "10"]
  }
];
