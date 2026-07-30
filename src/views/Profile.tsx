import { User, Settings, Award, History, Bell, Shield, LogOut, ChevronRight, Share2, Edit3, Heart, MapPin } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { motion } from 'motion/react';

interface ProfileProps {
  onLogout: () => void;
}

export function Profile({ onLogout }: ProfileProps) {
  const stats = [
    { label: 'Eco Score', value: '840', color: 'text-emerald-600' },
    { label: 'Total Scans', value: '124', color: 'text-emerald-600' },
    { label: 'Points', value: '2,450', color: 'text-amber-500' },
  ];

  const badges = [
    { name: 'Green Starter', icon: '🌱', level: 1 },
    { name: 'Recycling Rookie', icon: '♻️', level: 2 },
    { name: 'Eco Champion', icon: '🏆', level: 5 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="relative py-12 px-8 rounded-[32px] bg-emerald-900 overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-800/20 skew-x-[-15deg] translate-x-1/4" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <div className="h-32 w-32 rounded-[40px] bg-white border-4 border-emerald-800/50 flex items-center justify-center overflow-hidden">
              <User className="h-16 w-16 text-emerald-900" />
            </div>
            <button className="absolute -bottom-2 -right-2 h-10 w-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center border-4 border-emerald-900 hover:scale-110 transition-transform">
              <Edit3 className="h-5 w-5" />
            </button>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold">Alex Green</h1>
            <p className="text-emerald-200/60 mt-1 flex items-center justify-center md:justify-start gap-2">
              <Heart className="h-4 w-4 fill-emerald-500 text-emerald-500" />
              Sustainability Hero since June 2026
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-emerald-800/40 backdrop-blur-sm px-6 py-2 rounded-2xl border border-emerald-700/50">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-200/50">{stat.label}</p>
                  <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="border-emerald-700 text-white hover:bg-emerald-800">
              <Share2 className="h-4 w-4 mr-2" /> Share Profile
            </Button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Achievements */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  Achievements
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-emerald-600">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {badges.map((badge, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col items-center text-center">
                    <span className="text-4xl mb-3">{badge.icon}</span>
                    <h4 className="font-bold text-emerald-900 text-sm">{badge.name}</h4>
                    <p className="text-[10px] text-emerald-600/50 uppercase font-bold mt-1">Level {badge.level}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Logs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-indigo-500" />
                Recent History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-emerald-50 transition-colors cursor-pointer border border-transparent hover:border-emerald-100">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <History className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-emerald-900">Plastic Container Scan</p>
                      <p className="text-xs text-emerald-600/50">San Francisco Recycling Center • 2 days ago</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-emerald-200" />
                </div>
              ))}
              <Button variant="outline" className="w-full">Load More History</Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col">
                {[
                  { icon: Bell, label: 'Notifications', color: 'text-amber-500' },
                  { icon: MapPin, label: 'Location Permissions', color: 'text-rose-500' },
                  { icon: Shield, label: 'Privacy & Security', color: 'text-indigo-500' },
                  { icon: Settings, label: 'General Preferences', color: 'text-emerald-500' },
                ].map((item, i) => (
                  <button key={i} className="flex items-center justify-between px-6 py-4 hover:bg-emerald-50 transition-colors group">
                    <div className="flex items-center gap-3">
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                      <span className="text-sm font-medium text-emerald-900">{item.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-emerald-200 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
                <button 
                  onClick={onLogout}
                  className="flex items-center justify-between px-6 py-4 hover:bg-rose-50 transition-colors group border-t border-emerald-50 mt-4"
                >
                  <div className="flex items-center gap-3">
                    <LogOut className="h-5 w-5 text-rose-500" />
                    <span className="text-sm font-medium text-rose-900">Log Out</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-rose-200 group-hover:text-rose-400" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
