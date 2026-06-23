import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 glass border-b border-white/5">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5 text-white"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-display font-bold text-xl tracking-tight">TRIFLY</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <Link href="#how-it-works" className="hover:text-white transition-colors">How it works</Link>
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Log in
          </Link>
          <Link 
            href="/signup" 
            className="text-sm font-medium bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-full transition-all active:scale-95"
          >
            Sign up
          </Link>
        </div>

        <button className="md:hidden text-white/70 hover:text-white">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
