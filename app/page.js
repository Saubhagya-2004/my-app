import Link from "next/link";

export default function HomePage() {
  return (
    <div className="page-bg min-h-screen flex flex-col items-center justify-center text-center px-4 py-12">
      {/* Background orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-brand/[0.12] blur-[80px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-eco/[0.10] blur-[60px]" />
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 mb-7 rounded-full bg-eco/10 border border-eco/25 text-eco text-sm font-semibold">
          🌿 Sustainable Shopping Platform
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up delay-100 text-[clamp(2.4rem,6vw,4rem)] font-black leading-[1.1] tracking-[-0.03em] mb-5">
          <span className="bg-gradient-to-br from-slate-100 via-slate-400 to-brand bg-clip-text text-transparent">
            EcoMart
          </span>
          <br />
          <span className="bg-gradient-to-r from-brand to-eco bg-clip-text text-transparent">
            Shop Sustainably
          </span>
        </h1>

        <p className="animate-fade-up delay-200 text-slate-400 text-lg leading-relaxed mb-10 max-w-md mx-auto">
          Discover curated eco-friendly products that are kind to you and the planet.
          Free shipping on orders over ₹500.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-300 flex gap-3 justify-center flex-wrap mb-14">
          <Link
            href="/checkout"
            className="px-9 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-brand to-brand-dark
                       shadow-[0_4px_16px_rgba(99,102,241,0.4)] hover:-translate-y-0.5
                       hover:shadow-[0_8px_24px_rgba(99,102,241,0.55)] transition-all duration-200"
          >
            🛒 View Cart &amp; Checkout
          </Link>
          <Link
            href="/products"
            className="px-6 py-4 rounded-xl font-semibold text-slate-400 border border-white/10
                       hover:border-white/20 hover:text-slate-200 hover:bg-white/[0.04] transition-all duration-200"
          >
            Browse Products →
          </Link>
        </div>

        {/* Stats */}
        <div className="animate-fade-up delay-400 flex gap-10 justify-center p-6 rounded-2xl bg-white/[0.02] border border-white/8">
          {[
            { val: "10K+", label: "Happy Customers" },
            { val: "500+", label: "Eco Products" },
            { val: "100%", label: "Sustainable" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-black text-brand tracking-tight">{s.val}</p>
              <p className="text-xs text-slate-600 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
