import { BarChart3, Users, Scan, ArrowUp, ArrowDown, Search, Filter, MoreHorizontal, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const CATEGORY_DATA = [
  { name: 'Plastic', value: 45, color: '#10b981' },
  { name: 'Paper', value: 25, color: '#3b82f6' },
  { name: 'Organic', value: 15, color: '#f59e0b' },
  { name: 'Metal', value: 10, color: '#6366f1' },
  { name: 'Other', value: 5, color: '#94a3b8' },
];

const SCAN_DATA = [
  { date: 'Jul 21', count: 450 },
  { date: 'Jul 22', count: 520 },
  { date: 'Jul 23', count: 480 },
  { date: 'Jul 24', count: 610 },
  { date: 'Jul 25', count: 590 },
  { date: 'Jul 26', count: 720 },
  { date: 'Jul 27', count: 840 },
];

export function Admin() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-emerald-950">System Overview</h1>
          <p className="text-emerald-600/70">Admin Control Panel • EcoSort Platform Stats</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export Report
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: '12,482', icon: Users, trend: '14.2%', up: true },
          { label: 'Active Scans', value: '84,920', icon: Scan, trend: '8.4%', up: true },
          { label: 'AI Accuracy', value: '98.2%', icon: BarChart3, trend: '0.4%', up: true },
          { label: 'Growth Rate', value: '24.5%', icon: ArrowUp, trend: '2.1%', up: true },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${stat.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {stat.trend}
                </div>
              </div>
              <p className="text-sm font-medium text-emerald-600/60 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-bold text-emerald-950 mt-1">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Daily Scanning Activity</CardTitle>
            <CardDescription>System-wide waste scans over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SCAN_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0fdf4" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Waste Categories Distribution</CardTitle>
            <CardDescription>Most common types of waste scanned by users</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-1/3 space-y-4 pr-6">
              {CATEGORY_DATA.map((cat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-xs font-medium text-emerald-900">{cat.name}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">{cat.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent User Reports</CardTitle>
              <CardDescription>Monitor high-impact recycling activities</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" />
              <input 
                type="text" 
                placeholder="Search logs..." 
                className="pl-10 pr-4 py-2 rounded-xl border border-emerald-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-emerald-50 text-[10px] font-bold uppercase tracking-widest text-emerald-500">
                  <th className="px-4 py-4">User</th>
                  <th className="px-4 py-4">Item</th>
                  <th className="px-4 py-4">Category</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Points</th>
                  <th className="px-4 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { user: 'Sarah Miller', email: 's.miller@gmail.com', item: 'Dell Latitude Laptop', cat: 'E-Waste', status: 'Verified', pts: '+250' },
                  { user: 'John Doe', email: 'j.doe@outlook.com', item: 'Mixed Plastics', cat: 'Plastic', status: 'Pending', pts: '+45' },
                  { user: 'Emily Chen', email: 'em.chen@tech.co', item: 'Car Battery', cat: 'Hazardous', status: 'Verified', pts: '+180' },
                  { user: 'Marcus Wright', email: 'm.wright@me.com', item: 'Cardboard Bulk', cat: 'Paper', status: 'Verified', pts: '+60' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-emerald-50 hover:bg-emerald-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                          {row.user.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-emerald-950">{row.user}</p>
                          <p className="text-xs text-emerald-500">{row.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-medium text-emerald-800">{row.item}</td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold">
                        {row.cat}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`h-1.5 w-1.5 rounded-full ${row.status === 'Verified' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <span className="font-medium text-emerald-900">{row.status}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-bold text-emerald-600">{row.pts}</td>
                    <td className="px-4 py-4 text-right">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
