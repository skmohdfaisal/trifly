import { Users, FileAudio, CreditCard, Activity } from "lucide-react";

export const metadata = {
  title: "Admin Overview | TRIFLY",
};

const stats = [
  { name: "Total Users", value: "12,345", change: "+12%", icon: Users },
  { name: "Files Processed", value: "2.1M", change: "+24%", icon: FileAudio },
  { name: "MRR", value: "$45,230", change: "+8%", icon: CreditCard },
  { name: "Active Jobs", value: "42", change: "Normal", icon: Activity },
];

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold">Admin Overview</h1>
        <div className="flex items-center gap-2 text-sm text-success bg-success/10 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
          System Healthy
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="glass p-6 rounded-3xl border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-lg">
                  {stat.change}
                </span>
              </div>
              <p className="text-white/50 text-sm mb-1">{stat.name}</p>
              <p className="text-3xl font-display font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass rounded-3xl border border-white/5 p-6 min-h-[400px]">
          <h3 className="font-medium mb-6">Processing Volume (30 Days)</h3>
          <div className="flex items-center justify-center h-[300px] text-white/30 text-sm">
            [Chart Area Placeholder]
          </div>
        </div>

        <div className="glass rounded-3xl border border-white/5 p-6">
          <h3 className="font-medium mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></div>
                <div>
                  <p className="text-sm font-medium">New Pro subscription</p>
                  <p className="text-xs text-white/50">user{i}@example.com • 2m ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
