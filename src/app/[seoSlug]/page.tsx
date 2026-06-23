import { notFound } from "next/navigation";
import { UploadZone } from "@/components/UploadZone";

const SEO_PAGES = {
  "vocal-remover": {
    title: "AI Vocal Remover - Extract Vocals from Any Song",
    description: "Remove vocals from any audio file instantly. Create high-quality instrumental tracks and acapellas for free.",
    h1: "AI Vocal Remover",
  },
  "remove-vocals-from-song": {
    title: "Remove Vocals From Song Online - Fast & Free",
    description: "The easiest way to remove vocals from a song. Upload your track and let our AI isolate the vocals in seconds.",
    h1: "Remove Vocals From Any Song",
  },
  "extract-vocals": {
    title: "Extract Vocals With AI - High Quality Stem Separation",
    description: "Extract pristine vocals from mixed audio files. Perfect for remixing, sampling, and karaoke.",
    h1: "Extract Vocals Instantly",
  },
  "remove-background-music": {
    title: "Remove Background Music from Audio Online",
    description: "Clean up your voice recordings by removing background music and noise using our advanced AI.",
    h1: "Remove Background Music",
  },
  "karaoke-maker": {
    title: "Online Karaoke Maker - Create Backing Tracks",
    description: "Turn any song into a karaoke track by removing the original vocals. Fast, secure, and free.",
    h1: "AI Karaoke Maker",
  },
  "stem-splitter": {
    title: "AI Stem Splitter - Separate Audio into Stems",
    description: "Split your audio into individual stems (Vocals, Drums, Bass, Instruments) for advanced remixing.",
    h1: "AI Stem Splitter",
  },
  "drum-separator": {
    title: "Extract Drums from Song - AI Drum Separator",
    description: "Isolate and extract drum tracks from any song. Perfect for sampling and beatmaking.",
    h1: "AI Drum Separator",
  },
  "bass-separator": {
    title: "Extract Bass from Song - AI Bass Separator",
    description: "Isolate and extract basslines from mixed audio files instantly.",
    h1: "AI Bass Separator",
  },
  "audio-cleaner": {
    title: "AI Audio Cleaner - Enhance Voice & Remove Noise",
    description: "Clean up dialogue, remove background noise, and enhance vocal clarity with AI.",
    h1: "AI Audio Cleaner",
  },
  "voice-isolator": {
    title: "Voice Isolator - Isolate Dialogue from Video & Audio",
    description: "Isolate human voices from noisy backgrounds. Ideal for podcasts, interviews, and video editing.",
    h1: "Voice Isolator",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ seoSlug: string }> }) {
  const { seoSlug } = await params;
  const pageData = SEO_PAGES[seoSlug as keyof typeof SEO_PAGES];
  
  if (!pageData) {
    return {};
  }

  return {
    title: `${pageData.title} | TRIFLY`,
    description: pageData.description,
  };
}

export default async function SeoPage({ params }: { params: Promise<{ seoSlug: string }> }) {
  const { seoSlug } = await params;
  const pageData = SEO_PAGES[seoSlug as keyof typeof SEO_PAGES];

  if (!pageData) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full pt-20 pb-32 px-4 md:px-6 flex flex-col items-center text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl">
          {pageData.h1}
        </h1>
        
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-12">
          {pageData.description}
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
    </div>
  );
}
