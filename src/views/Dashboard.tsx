import { Scan, Recycle, Trophy, Leaf, History, ArrowRight, Zap, TrendingUp, Calendar } from 'lucide-react';
import { StatCard } from '@/src/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const MOCK_CHART_DATA = [
  { name: 'Mon', items: 4 },
  { name: 'Tue', items: 7 },
  { name: 'Wed', items: 5 },
  { name: 'Thu', items: 12 },
  { name: 'Fri', items: 8 },
  { name: 'Sat', items: 15 },
  { name: 'Sun', items: 10 },
];

interface DashboardProps {
  userName: string;
  onScan: () => void;
}

export function Dashboard({ userName, onScan }: DashboardProps) {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-7xl mx-auto px-6 lg:px-10 py-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] bg-mint-200 px-2 py-1 rounded-sm text-forest-900">
            User Dashboard
          </span>
          <h1 className="mt-4 text-4xl lg:text-5xl font-black text-forest-900 tracking-tighter uppercase">Welcome, {userName}</h1>
          <p className="text-forest-900/60 font-medium mt-1">Track your ecological footprint and sorting accuracy.</p>
        </div>
        <div className="flex gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-bold opacity-40 uppercase tracking-tighter">Current Date</span>
            <span className="text-lg font-black text-forest-900 leading-none">July 28, 2026</span>
          </div>
          <Button className="h-14 px-8 rounded-xl shadow-2xl" onClick={onScan}>
            <Scan className="h-4 w-4 mr-2" />
            Scan Waste
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Scanned"
          value={1240}
          icon={Scan}
          trend={{ value: '12%', isUp: true }}
          color="bg-forest-900"
          delay={0.1}
        />
        <StatCard
          title="Eco Score"
          value={2840}
          icon={Trophy}
          trend={{ value: '8%', isUp: true }}
          color="bg-forest-800"
          delay={0.2}
        />
        <StatCard
          title="Impact Saved"
          value="42.8 kg"
          icon={Leaf}
          color="bg-forest-700"
          delay={0.3}
        />
        <StatCard
          title="Monthly Streak"
          value="12 Days"
          icon={TrendingUp}
          trend={{ value: '5%', isUp: true }}
          color="bg-mint-400"
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Chart */}
        <Card className="lg:col-span-8 rounded-[40px] shadow-sm">
          <CardHeader className="p-8">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Impact History</CardTitle>
                <CardDescription>Estimated CO2 savings over the last 7 days</CardDescription>
              </div>
              <div className="flex gap-1 bg-sage-100 p-1 rounded-xl">
                <button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-white text-forest-900 rounded-lg shadow-sm">Week</button>
                <button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-forest-900/40 hover:text-forest-900 transition-all">Month</button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-80 p-8 pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_DATA}>
                <defs>
                  <linearGradient id="colorItems" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#74C69D" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#74C69D" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1B433210" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#1B4332', fontSize: 10, fontWeight: 900, textAnchor: 'middle' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#1B4332', fontSize: 10, fontWeight: 900 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '24px', 
                    border: '1px solid #1B433210', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    padding: '16px',
                    backgroundColor: 'white'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="items" 
                  stroke="#2D6A4F" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorItems)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Action Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="bg-forest-900 text-white border-none rounded-[40px] p-8 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
              <div className="flex justify-between items-start">
                <h4 className="text-2xl font-black uppercase leading-tight tracking-tighter">Level Up Your<br/>Impact Game</h4>
                <div className="w-12 h-12 rounded-full bg-mint-400 flex items-center justify-center text-xl font-bold border-2 border-white shadow-lg">🌱</div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="opacity-60">Eco Champion Progress</span>
                  <span>75%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[75%] h-full bg-mint-400" />
                </div>
                <p className="text-[11px] opacity-70 italic leading-relaxed font-medium">You're only 250 points away from the 'Eco Champion' badge. Keep up the great work!</p>
              </div>
              <Button className="w-full py-4 bg-white text-forest-900 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-sage-100" onClick={onScan}>
                Start New Session
              </Button>
            </div>
            {/* Decorative accent */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-mint-400/10 rounded-full blur-3xl" />
          </Card>

          <Card className="rounded-[40px] shadow-sm">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-base flex items-center justify-between">
                Recent Logs
                <History className="h-4 w-4 text-forest-900/40" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              {[
                { item: 'Plastic Bottle', time: '2h ago', category: 'Recyclable', points: '+20' },
                { item: 'Cardboard Box', time: '5h ago', category: 'Recyclable', points: '+15' },
                { item: 'Apple Core', time: 'Yesterday', category: 'Organic', points: '+10' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-sage-100 flex items-center justify-center text-forest-900 group-hover:bg-forest-900 group-hover:text-white transition-all">
                      <Recycle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-forest-900 uppercase tracking-tight leading-none mb-1">{activity.item}</p>
                      <p className="text-[10px] font-bold text-forest-900/40 uppercase tracking-tighter">{activity.time} • {activity.category}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-black text-emerald-600">{activity.points}</span>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full mt-2 text-forest-900/40 hover:text-forest-900 font-black uppercase text-[10px] tracking-widest">
                Full History <ArrowRight className="h-3 w-3 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
