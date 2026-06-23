import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0B1020] mt-24">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-display font-bold text-lg tracking-tight">TRIFLY</span>
            </Link>
            <p className="text-white/50 text-sm max-w-xs mb-6">
              Separate vocals and instrumentals from any audio file in seconds using advanced AI.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-sm text-white/90">Product</h3>
            <ul className="space-y-3 text-sm text-white/50">
              <li><Link href="/vocal-remover" className="hover:text-white transition-colors">Vocal Remover</Link></li>
              <li><Link href="/stem-splitter" className="hover:text-white transition-colors">Stem Splitter</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/api" className="hover:text-white transition-colors">API</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4 text-sm text-white/90">Company</h3>
            <ul className="space-y-3 text-sm text-white/50">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} TRIFLY. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-white/40 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">GitHub</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
