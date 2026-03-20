import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-100 mt-20 pt-24 pb-12 w-full">
      <div className="px-6 md:px-12 max-w-screen-2xl mx-auto flex flex-col gap-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
          {/* Logo & Description */}
          <div className="col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#FF5E1F] rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg shadow-orange-500/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 3L4 14H11L11 21L20 10H13V3Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-black tracking-tighter uppercase text-[#1A2E35]">VELOCITY</span>
            </Link>
            <p className="text-neutral-500 font-medium text-lg leading-relaxed max-w-xs">
               Pushing the limits of human performance with world-class gear since 1998. Experience the speed.
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h5 className="font-black uppercase tracking-widest text-[11px] text-neutral-400">Categories</h5>
            <ul className="space-y-4 font-bold text-sm">
              <li><Link href="/products" className="text-neutral-500 hover:text-[#FF5E1F] transition-colors uppercase italic tracking-tighter">Road Shoes</Link></li>
              <li><Link href="/products" className="text-neutral-500 hover:text-[#FF5E1F] transition-colors uppercase italic tracking-tighter">Trail Shoes</Link></li>
              <li><Link href="/products" className="text-neutral-500 hover:text-[#FF5E1F] transition-colors uppercase italic tracking-tighter">Race Day</Link></li>
            </ul>

          </div>

          {/* Support */}
          <div className="space-y-6">
            <h5 className="font-black uppercase tracking-widest text-[11px] text-neutral-400">Support</h5>
            <ul className="space-y-4 font-bold text-sm">
              <li><Link href="#" className="text-neutral-500 hover:text-[#FF5E1F] transition-colors uppercase italic tracking-tighter">Order Status</Link></li>
              <li><Link href="#" className="text-neutral-500 hover:text-[#FF5E1F] transition-colors uppercase italic tracking-tighter">Shipping</Link></li>
              <li><Link href="#" className="text-neutral-500 hover:text-[#FF5E1F] transition-colors uppercase italic tracking-tighter">Returns</Link></li>
              <li><Link href="#" className="text-neutral-500 hover:text-[#FF5E1F] transition-colors uppercase italic tracking-tighter">Contact Us</Link></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2 space-y-6 lg:pl-10">
            <h5 className="font-black uppercase tracking-widest text-[11px] text-neutral-400">Follow Us</h5>
            <div className="flex gap-4">
              {[
                { id: 'share', path: <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /> },
                { id: 'public', path: <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /> },
                { id: 'alternate_email', path: <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /> }
              ].map((icon) => (
                <a key={icon.id} href="#" className="w-12 h-12 rounded-full bg-[#E8EEF5] flex items-center justify-center text-neutral-900 hover:bg-[#FF5E1F] hover:text-white transition-all shadow-sm active:scale-95">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    {icon.path}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 text-center md:text-left italic">
          <p>© 2024 Velocity Elite Gear. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-[#FF5E1F] transition-colors uppercase">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#FF5E1F] transition-colors uppercase">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
