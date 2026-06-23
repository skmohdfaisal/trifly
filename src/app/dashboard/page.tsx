import { Music, Clock, Download, Settings, LogOut, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Dashboard | TRIFLY",
  description: "Manage your audio processing history and account settings.",
};

const mockHistory = [
  { id: 1, name: "vocals_track_final.mp3", date: "Today, 2:30 PM", type: "Vocal Extraction", status: "completed" },
  { id: 2, name: "interview_raw.wav", date: "Yesterday", type: "Audio Clean", status: "completed" },
  { id: 3, name: "beat_04.mp3", date: "Jun 20, 2026", type: "Stem Split", status: "failed" },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-8 sticky top-24">
            <div>
              <p className="text-white/50 text-sm font-medium mb-4">Menu</p>
              <nav className="space-y-2">
                <Link href="/dashboard" className="flex items-center gap-3 bg-white/10 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
                  <Clock className="w-4 h-4" /> History
                </Link>
                <Link href="/dashboard/settings" className="flex items-center gap-3 text-white/50 hover:bg-white/5 hover:text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
                  <Settings className="w-4 h-4" /> Settings
                </Link>
              </nav>
            </div>
            
            <div>
              <p className="text-white/50 text-sm font-medium mb-4">Subscription</p>
              <div className="bg-[#0B1020] rounded-xl p-4 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Free Plan</span>
                  <span className="text-xs px-2 py-1 bg-white/10 rounded-md">3/5 files</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-primary w-[60%]"></div>
                </div>
                <button className="w-full text-xs font-medium bg-primary hover:bg-primary-hover text-white py-2 rounded-lg transition-colors">
                  Upgrade to Pro
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <button className="flex items-center gap-3 text-white/50 hover:text-red-400 px-4 py-2 w-full text-left text-sm font-medium transition-colors">
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <h1 className="text-3xl font-display font-bold mb-8">Processing History</h1>
          
          <div className="glass rounded-3xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="px-6 py-4 text-sm font-medium text-white/50">File Name</th>
                    <th className="px-6 py-4 text-sm font-medium text-white/50">Type</th>
                    <th className="px-6 py-4 text-sm font-medium text-white/50">Date</th>
                    <th className="px-6 py-4 text-sm font-medium text-white/50">Status</th>
                    <th className="px-6 py-4 text-sm font-medium text-white/50 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {mockHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-primary">
                            <Music className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-sm">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/70">{item.type}</td>
                      <td className="px-6 py-4 text-sm text-white/50">{item.date}</td>
                      <td className="px-6 py-4">
                        {item.status === "completed" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium">
                            Failed
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {item.status === "completed" && (
                          <button className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                            <Download className="w-3.5 h-3.5" /> Download
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
