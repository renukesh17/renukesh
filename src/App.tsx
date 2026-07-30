/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { Landing } from '@/src/views/Landing';
import { Dashboard } from '@/src/views/Dashboard';
import { Scanner } from '@/src/components/scanner/Scanner';
import { RecyclingMap } from '@/src/components/map/RecyclingMap';
import { LearningHub } from '@/src/components/learning/LearningHub';
import { Profile } from '@/src/views/Profile';
import { Admin } from '@/src/views/Admin';
import { CategoryCard } from '@/src/components/guide/CategoryCard';
import { WasteCategory } from '@/src/types';
import { Leaf, Apple, Droplets, Newspaper, Box, Battery, AlertTriangle, Trash2, ArrowRight, CheckCircle2, User, Mail, Lock } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = [
  { 
    category: WasteCategory.ORGANIC, 
    icon: Apple, 
    color: 'bg-amber-600',
    description: 'Biodegradable waste from plants and animals. Perfect for composting.',
    examples: ['Fruit peels', 'Vegetable scraps', 'Eggshells', 'Coffee grounds']
  },
  { 
    category: WasteCategory.PLASTIC, 
    icon: Droplets, 
    color: 'bg-blue-600',
    description: 'Synthetic polymers that should be cleaned and sorted by resin code.',
    examples: ['Water bottles', 'Milk jugs', 'Food containers', 'Plastic bags']
  },
  { 
    category: WasteCategory.PAPER, 
    icon: Newspaper, 
    color: 'bg-emerald-600',
    description: 'Dry, clean paper products that can be pulped and reused.',
    examples: ['Newspapers', 'Office paper', 'Magazines', 'Envelopes']
  },
  { 
    category: WasteCategory.GLASS, 
    icon: Droplets, 
    color: 'bg-teal-600',
    description: 'Glass containers that can be recycled infinitely without losing quality.',
    examples: ['Glass jars', 'Beverage bottles', 'Cosmetic containers']
  },
  { 
    category: WasteCategory.METAL, 
    icon: Box, 
    color: 'bg-indigo-600',
    description: 'Steel and aluminum products. Highly recyclable and energy-efficient.',
    examples: ['Aluminum cans', 'Tin foil', 'Steel food tins', 'Metal lids']
  },
  { 
    category: WasteCategory.E_WASTE, 
    icon: Battery, 
    color: 'bg-purple-600',
    description: 'Electronic products that contain valuable metals and hazardous materials.',
    examples: ['Old phones', 'Laptops', 'Batteries', 'Charging cables']
  },
  { 
    category: WasteCategory.HAZARDOUS, 
    icon: AlertTriangle, 
    color: 'bg-rose-600',
    description: 'Materials that are toxic, flammable, or reactive. Require special handling.',
    examples: ['Paint', 'Chemicals', 'Light bulbs', 'Medical waste']
  },
  { 
    category: WasteCategory.GENERAL, 
    icon: Trash2, 
    color: 'bg-slate-600',
    description: 'Non-recyclable waste that usually ends up in landfills.',
    examples: ['Used tissues', 'Sanitary products', 'Broken ceramics']
  },
];

import { Onboarding } from '@/src/components/onboarding/Onboarding';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    if (authMode === 'signup') {
      setShowOnboarding(true);
    } else {
      setActiveTab('dashboard');
    }
  };

  const renderContent = () => {
    if (showOnboarding) {
      return <Onboarding onComplete={() => { setShowOnboarding(false); setActiveTab('dashboard'); }} />;
    }

    if (activeTab === 'landing') {
      return (
        <Landing 
          onStart={() => {
            if (isLoggedIn) setActiveTab('scan');
            else {
              setAuthMode('signup');
              setShowAuthModal(true);
            }
          }} 
          onExplore={() => setActiveTab('guide')}
        />
      );
    }

    if (!isLoggedIn && activeTab !== 'landing' && activeTab !== 'guide') {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-6">
          <div className="h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Lock className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-bold text-emerald-900">Sign in to EcoSort</h2>
          <p className="text-emerald-600/70 max-w-sm">Access your personalized dashboard, track your impact, and earn rewards for recycling.</p>
          <div className="flex gap-4">
            <Button onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}>Log In</Button>
            <Button variant="outline" onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}>Create Account</Button>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard': return <Dashboard userName="Alex" onScan={() => setActiveTab('scan')} />;
      case 'scan': return <Scanner />;
      case 'map': return <RecyclingMap />;
      case 'guide': return (
        <div className="space-y-12 animate-in fade-in duration-500">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-emerald-900">Smart Disposal Guide</h2>
            <p className="text-emerald-600/70 max-w-2xl mx-auto text-lg">
              Not sure where it goes? Browse our comprehensive guide to learn how to prepare and dispose of every type of waste.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat, i) => (
              <CategoryCard key={cat.category} {...cat} delay={i * 0.1} />
            ))}
          </div>
        </div>
      );
      case 'challenges': return <LearningHub />;
      case 'profile': return <Profile onLogout={() => { setIsLoggedIn(false); setActiveTab('landing'); }} />;
      case 'admin': return <Admin />;
      default: return <Dashboard userName="Alex" onScan={() => setActiveTab('scan')} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-emerald-950 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isLoggedIn={isLoggedIn}
        onLogin={() => { setAuthMode('login'); setShowAuthModal(true); }}
        onLogout={() => { setIsLoggedIn(false); setActiveTab('landing'); }}
      />
      
      <main className={`mx-auto w-full ${activeTab === 'landing' ? '' : 'max-w-7xl px-4 py-12 sm:px-6 lg:px-8'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm"
              onClick={() => setShowAuthModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden border border-emerald-100"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-6 w-6 text-emerald-600" />
                    <span className="text-xl font-bold">EcoSort</span>
                  </div>
                  <button onClick={() => setShowAuthModal(false)} className="text-emerald-300 hover:text-emerald-600">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-emerald-900">
                      {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-emerald-600/70">
                      {authMode === 'login' ? 'Continue your sustainability journey.' : 'Join the movement for a greener planet.'}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {authMode === 'signup' && (
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-300" />
                        <input 
                          type="text" 
                          placeholder="Full Name" 
                          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-emerald-50 border-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>
                    )}
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-300" />
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-emerald-50 border-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-300" />
                      <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-emerald-50 border-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>
                  </div>

                  <Button className="w-full h-14 text-lg" onClick={handleLogin}>
                    {authMode === 'login' ? 'Log In' : 'Get Started'}
                  </Button>

                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-emerald-100" />
                    <span className="flex-shrink mx-4 text-xs font-bold text-emerald-300 uppercase tracking-widest">Or continue with</span>
                    <div className="flex-grow border-t border-emerald-100" />
                  </div>

                  <Button variant="outline" className="w-full h-14 border-emerald-100 hover:bg-emerald-50" onClick={handleLogin}>
                    <img src="https://www.google.com/favicon.ico" className="h-5 w-5 mr-3" alt="Google" />
                    Continue with Google
                  </Button>

                  <p className="text-center text-sm text-emerald-600/70">
                    {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button 
                      className="font-bold text-emerald-600 hover:underline"
                      onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                    >
                      {authMode === 'login' ? 'Sign up' : 'Log in'}
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
