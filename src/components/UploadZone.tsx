"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Music, CheckCircle2, Download, Play, Pause, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "uploading" | "processing" | "done" | "error";

export function UploadZone() {
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [vocalsUrl, setVocalsUrl] = useState<string | null>(null);
  const [instrumentalUrl, setInstrumentalUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      startProcess(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startProcess(e.dataTransfer.files[0]);
    }
  };

  const startProcess = async (selectedFile: File) => {
    setFile(selectedFile);
    setStatus("uploading");
    setProgress(0);
    setErrorMsg(null);
    setVocalsUrl(null);
    setInstrumentalUrl(null);

    try {
      // 1. Upload to Supabase Storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 300);

      const { error: uploadError } = await supabase.storage
        .from('audio-uploads')
        .upload(fileName, selectedFile);

      clearInterval(progressInterval);

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      setProgress(100);
      
      const { data: publicUrlData } = supabase.storage
        .from('audio-uploads')
        .getPublicUrl(fileName);

      // 2. Call Replicate API to separate
      setStatus("processing");
      
      const res = await fetch('/api/separate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioUrl: publicUrlData.publicUrl })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to start AI processing');
      }

      // 3. Poll for status
      const predictionId = data.predictionId;
      
      const pollInterval = setInterval(async () => {
        try {
          const statusRes = await fetch(`/api/status/${predictionId}`);
          const statusData = await statusRes.json();

          if (statusData.status === 'succeeded') {
            clearInterval(pollInterval);
            setVocalsUrl(statusData.output.vocals);
            setInstrumentalUrl(statusData.output.other);
            setStatus("done");
          } else if (statusData.status === 'failed' || statusData.status === 'canceled') {
            clearInterval(pollInterval);
            setStatus("error");
            setErrorMsg("AI processing failed on Replicate.");
          }
        } catch (pollErr) {
          console.error("Polling error", pollErr);
        }
      }, 3000);

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message);
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setFile(null);
    setErrorMsg(null);
    setVocalsUrl(null);
    setInstrumentalUrl(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent opacity-20 blur-xl rounded-3xl"></div>
      <div className="relative glass rounded-3xl p-8 border border-white/10 overflow-hidden bg-[#0B1020]/80">
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center py-12"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-primary/50 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <UploadCloud className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Drop your audio file here</h3>
              <p className="text-white/50 text-sm mb-8 text-center max-w-sm">
                Supports MP3, WAV, FLAC, M4A up to 50MB.
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-white text-black hover:bg-white/90 px-8 py-3 rounded-full font-medium transition-colors active:scale-95"
              >
                Browse Files
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="audio/*"
                className="hidden"
              />
            </motion.div>
          )}

          {(status === "uploading" || status === "processing") && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="relative w-24 h-24 mb-8">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                  <circle
                    cx="48" cy="48" r="45" fill="none" stroke="currentColor" strokeWidth="4"
                    strokeDasharray="283" strokeDashoffset={283 - (283 * progress) / 100}
                    className={cn(
                      "transition-all duration-300 ease-out",
                      status === "uploading" ? "text-primary" : "text-accent"
                    )}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">{Math.round(progress)}%</span>
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2">
                {status === "uploading" ? "Uploading audio securely..." : "AI is separating vocals (can take 1-2 mins)..."}
              </h3>
              <p className="text-white/50 text-sm">{file?.name || "audio_file.mp3"}</p>
              
              {status === "processing" && (
                <div className="mt-8 flex items-center gap-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 bg-accent rounded-full"
                      animate={{ height: ["10px", "40px", "10px"] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {status === "error" && (
            <motion.div key="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 mb-6">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium mb-2 text-red-400">Processing Failed</h3>
              <p className="text-white/50 text-sm mb-8 max-w-md">{errorMsg}</p>
              <button onClick={reset} className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-medium transition-colors">Try Again</button>
            </motion.div>
          )}

          {status === "done" && (
            <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-4">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center text-success">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-success">Extraction Complete</h3>
                  <p className="text-white/50 text-sm">{file?.name}</p>
                </div>
              </div>

              <div className="space-y-4">
                <ResultCard title="Vocals Only" type="vocals" file={file} audioUrl={vocalsUrl} />
                <ResultCard title="Instrumental" type="instrumental" file={file} audioUrl={instrumentalUrl} />
              </div>
              
              <div className="mt-8 text-center">
                <button onClick={reset} className="text-white/50 hover:text-white text-sm transition-colors">
                  Process another file
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ResultCard({ title, type, file, audioUrl }: { title: string; type: "vocals" | "instrumental", file: File | null, audioUrl: string | null }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => setIsPlaying(false);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/10 transition-colors">
      <div className="flex items-center gap-4">
        {audioUrl && <audio ref={audioRef} src={audioUrl} onEnded={handleEnded} />}
        <button 
          onClick={togglePlay}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0",
            type === "vocals" ? "bg-primary text-white" : "bg-accent text-black"
          )}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-1" />}
        </button>
        <div>
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-white/40 text-xs mt-1">Preview MP3</p>
        </div>
      </div>
      {audioUrl ? (
        <a 
          href={audioUrl} 
          target="_blank"
          rel="noopener noreferrer"
          download={`${type}_${file?.name || 'track.mp3'}`}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shrink-0"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Download</span>
        </a>
      ) : (
        <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white/50 px-4 py-2 rounded-xl text-sm font-medium transition-colors shrink-0 cursor-not-allowed">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Download</span>
        </button>
      )}
    </div>
  );
}

