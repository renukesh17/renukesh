import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { motion } from 'motion/react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isUp: boolean;
  };
  color: string;
  delay?: number;
}

export function StatCard({ title, value, icon: Icon, trend, color, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="bg-white border border-forest-900/5 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-forest-900/40">{title}</p>
            <div className="flex items-center justify-between mt-1">
              <h3 className="text-3xl font-black tracking-tight text-forest-900">{value}</h3>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-sage-100 text-forest-900`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
            {trend && (
              <div className="mt-2 flex items-center gap-1">
                <span className={`text-[10px] font-black ${trend.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {trend.isUp ? '↑' : '↓'} {trend.value}
                </span>
                <span className="text-[10px] font-bold text-forest-900/30 uppercase tracking-tighter">this week</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
