import { ArrowRight, Shield, MapPin, Zap, Users, BarChart3, Star } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { motion } from 'motion/react';
import { CodeMorphicxLogo } from '@/src/components/ui/CodeMorphicxLogo';

interface LandingProps {
  onStart: () => void;
  onExplore: () => void;
}

export function Landing({ onStart, onExplore }: LandingProps) {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-3 bg-white/90 border border-forest-900/10 shadow-sm px-4 py-2 rounded-2xl">
                  <CodeMorphicxLogo className="h-8 w-8" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-black uppercase tracking-widest text-forest-900">
                      Code Morphicx
                    </span>
                    <span className="text-[9px] font-medium text-emerald-600 tracking-wider">
                      Transforming Ideas Into Innovation
                    </span>
                  </div>
                </div>
                <h1 className="mt-8 text-6xl lg:text-[100px] font-black leading-[0.85] tracking-tighter uppercase text-forest-900">
                  Sort Smarter.<br />
                  <span className="text-mint-400">Recycle Better.</span>
                </h1>
                <p className="mt-8 text-xl text-forest-900/70 leading-relaxed max-w-xl font-medium">
                  Identify your waste instantly with AI and discover the path to a greener future. Join thousands of eco-warriors making an impact.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="h-16 px-10 rounded-2xl text-xs" onClick={onStart}>
                    Scan Your Waste <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                  <Button variant="outline" size="lg" className="h-16 px-10 rounded-2xl text-xs" onClick={onExplore}>
                    View Waste Guide
                  </Button>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10 bg-white rounded-[40px] border border-forest-900/10 shadow-2xl overflow-hidden p-8"
              >
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> LIVE CAMERA FEED
                  </span>
                </div>
                <div className="aspect-[4/5] bg-sage-200 rounded-[32px] flex items-center justify-center relative group">
                  <div className="w-64 h-64 border-[3px] border-mint-400/30 rounded-3xl relative">
                    <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-forest-900" />
                    <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-forest-900" />
                    <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-forest-900" />
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-forest-900" />
                    <motion.div 
                      animate={{ y: [0, 256, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="w-full h-1 bg-mint-400 absolute top-0 left-0" 
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold opacity-40">Detected Item</p>
                    <p className="text-2xl font-black uppercase text-forest-900 tracking-tight">Plastic Bottle</p>
                  </div>
                  <div className="bg-forest-900 text-white px-3 py-1 rounded-full text-[10px] font-bold">
                    96% CONFIDENCE
                  </div>
                </div>
              </motion.div>
              {/* Background accent */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-mint-400/20 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-emerald-50/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">Platform Features</h2>
            <p className="text-4xl font-bold text-emerald-950">Everything you need for zero-waste living.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'AI Waste Scanner', icon: Zap, desc: 'Instantly identify any item and its material using advanced computer vision.' },
              { title: 'Smart Disposal', icon: Shield, desc: 'Get step-by-step instructions on how to clean and sort your waste correctly.' },
              { title: 'Recycling Map', icon: MapPin, desc: 'Find specialized centers for electronics, hazardous waste, and more near you.' },
              { title: 'Gamified Impact', icon: BarChart3, desc: 'Track your CO2 savings and earn rewards as you build a recycling streak.' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group"
              >
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-3">{feature.title}</h3>
                <p className="text-emerald-600/70 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[40px] bg-emerald-900 p-12 lg:p-24 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-800/30 skew-x-[-20deg] translate-x-1/2" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  Ready to start your green journey?
                </h2>
                <p className="text-emerald-100/70 text-lg max-w-md">
                  Join thousands of households making a real difference. Download our app or use the web platform today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 h-14 px-8" onClick={onStart}>
                    Get Started Now
                  </Button>
                  <Button size="lg" variant="outline" className="border-emerald-700 text-white hover:bg-emerald-800 h-14 px-8">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="hidden lg:flex justify-end">
                <Users className="h-64 w-64 text-emerald-800 opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
