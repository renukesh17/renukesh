import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { motion } from 'motion/react';
import { WasteCategory } from '@/src/types';

interface CategoryCardProps {
  category: WasteCategory;
  icon: LucideIcon;
  description: string;
  examples: string[];
  color: string;
  delay?: number;
}

export function CategoryCard({ category, icon: Icon, description, examples, color, delay = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <Card className="h-full group cursor-pointer hover:border-emerald-400 transition-all">
        <CardHeader>
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color} text-white shadow-lg shadow-current/10 group-hover:scale-110 transition-transform`}>
            <Icon className="h-6 w-6" />
          </div>
          <CardTitle className="mt-4">{category}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-emerald-600/70 leading-relaxed">
            {description}
          </p>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-900/50 mb-2">Examples</p>
            <div className="flex flex-wrap gap-2">
              {examples.map((ex) => (
                <span key={ex} className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium">
                  {ex}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
