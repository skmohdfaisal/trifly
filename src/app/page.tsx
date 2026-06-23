import { UploadZone } from "@/components/UploadZone";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full pt-32 pb-32 px-4 md:px-6 flex flex-col items-center text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-accent mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          TRIFLY Engine v1.0 Live
        </div>
        
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl">
          Separate Vocals From <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Any Song With AI</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-12">
          Upload any audio file and instantly extract vocals or instrumentals using advanced AI-powered audio separation. Fast, secure, and studio quality.
        </p>

        <UploadZone />
      </section>

      {/* Trust Bar */}
      <section className="w-full border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl font-display font-bold mb-2">2M+</span>
              <span className="text-white/50 text-sm font-medium">Files Processed</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl font-display font-bold mb-2">99.9%</span>
              <span className="text-white/50 text-sm font-medium">Accuracy</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl font-display font-bold mb-2">{"<"}10s</span>
              <span className="text-white/50 text-sm font-medium">Average Time</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl font-display font-bold mb-2">150+</span>
              <span className="text-white/50 text-sm font-medium">Countries Served</span>
            </div>
          </div>
        </div>
      </section>

      {/* Scaffolding for the rest of the page */}
      <section id="how-it-works" className="w-full py-32 px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">How it works</h2>
            <p className="text-white/50 text-lg">Three simple steps to perfect audio separation.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="glass p-8 rounded-3xl relative overflow-hidden">
              <div className="text-primary text-5xl font-display font-bold opacity-20 absolute -top-4 -right-4">1</div>
              <h3 className="text-xl font-medium mb-3">Upload Audio</h3>
              <p className="text-white/50 text-sm">Drag and drop your file. We support MP3, WAV, FLAC, and more.</p>
            </div>
            {/* Step 2 */}
            <div className="glass p-8 rounded-3xl relative overflow-hidden">
              <div className="text-accent text-5xl font-display font-bold opacity-20 absolute -top-4 -right-4">2</div>
              <h3 className="text-xl font-medium mb-3">AI Processing</h3>
              <p className="text-white/50 text-sm">Our neural networks instantly isolate vocals and instrumentals.</p>
            </div>
            {/* Step 3 */}
            <div className="glass p-8 rounded-3xl relative overflow-hidden">
              <div className="text-success text-5xl font-display font-bold opacity-20 absolute -top-4 -right-4">3</div>
              <h3 className="text-xl font-medium mb-3">Download</h3>
              <p className="text-white/50 text-sm">Get studio-quality stems ready for your next project.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="w-full py-32 px-4 md:px-6 bg-white/[0.02] border-t border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Studio quality, without the studio</h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">Everything you need to perfectly isolate vocals and instruments.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Fast Processing", desc: "Get results in seconds, not minutes. Our optimized AI architecture ensures blazing fast extraction." },
              { title: "Studio Quality Output", desc: "No artifacting, no bleeding. Crystal clear vocals and pristine instrumentals." },
              { title: "Secure Uploads", desc: "Your files are encrypted and automatically deleted after processing. 100% private." },
              { title: "Multiple Formats", desc: "Upload MP3, WAV, FLAC, M4A, or OGG. Download uncompressed or compressed audio." },
              { title: "AI-Powered Accuracy", desc: "Trained on millions of tracks. Our neural networks understand complex mixes better than humans." },
              { title: "Mobile Friendly", desc: "Extract vocals right from your phone. Our platform works flawlessly on any device." }
            ].map((feature, i) => (
              <div key={i} className="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <h4 className="text-lg font-medium mb-2">{feature.title}</h4>
                <p className="text-sm text-white/50">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="w-full py-32 px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">Start for free, upgrade when you need more power.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Free */}
            <div className="glass p-8 rounded-3xl border border-white/5">
              <h3 className="text-xl font-medium mb-2">Free</h3>
              <div className="text-4xl font-display font-bold mb-6">$0<span className="text-lg text-white/50 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 text-sm text-white/70">
                <li className="flex gap-2">✓ 5 files per day</li>
                <li className="flex gap-2">✓ MP3 download</li>
                <li className="flex gap-2">✓ Standard processing queue</li>
              </ul>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-full font-medium transition-colors">Get Started</button>
            </div>
            
            {/* Pro */}
            <div className="glass p-8 rounded-3xl border border-primary relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(124,58,237,0.2)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>
              <h3 className="text-xl font-medium mb-2">Pro</h3>
              <div className="text-4xl font-display font-bold mb-6">$9<span className="text-lg text-white/50 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 text-sm text-white/90">
                <li className="flex gap-2">✓ Unlimited files</li>
                <li className="flex gap-2">✓ High quality WAV exports</li>
                <li className="flex gap-2">✓ Faster processing queue</li>
                <li className="flex gap-2">✓ Priority support</li>
              </ul>
              <button className="w-full bg-primary hover:bg-primary-hover text-white px-4 py-3 rounded-full font-medium transition-colors">Upgrade to Pro</button>
            </div>

            {/* Business */}
            <div className="glass p-8 rounded-3xl border border-white/5">
              <h3 className="text-xl font-medium mb-2">Business</h3>
              <div className="text-4xl font-display font-bold mb-6">$29<span className="text-lg text-white/50 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 text-sm text-white/70">
                <li className="flex gap-2">✓ Everything in Pro</li>
                <li className="flex gap-2">✓ Team access (up to 5)</li>
                <li className="flex gap-2">✓ API access</li>
                <li className="flex gap-2">✓ Commercial usage rights</li>
              </ul>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-full font-medium transition-colors">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="w-full py-32 px-4 md:px-6 bg-white/[0.02] border-t border-white/5">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "What audio formats do you support?", a: "We support all major audio formats including MP3, WAV, FLAC, M4A, OGG, and AAC up to 50MB per file for free users." },
              { q: "How long does processing take?", a: "Most files under 5 minutes are processed in less than 10 seconds. Pro users get access to our priority queue for even faster processing." },
              { q: "Are my files kept private?", a: "Yes. All uploaded files are encrypted in transit and at rest. They are automatically deleted from our servers shortly after processing is complete." },
              { q: "Can I use the extracted stems commercially?", a: "Free and Pro users can use stems for personal projects. For commercial usage rights, you need our Business plan." }
            ].map((faq, i) => (
              <div key={i} className="glass p-6 rounded-2xl border border-white/5">
                <h4 className="text-lg font-medium mb-2">{faq.q}</h4>
                <p className="text-white/50">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>

  );
}
