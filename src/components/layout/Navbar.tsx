import { LayoutDashboard, Scan, MapPin, BookOpen, Trophy, Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/src/components/ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { CodeMorphicxLogo } from '@/src/components/ui/CodeMorphicxLogo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  onLogin: () => void;
}

export function Navbar({ activeTab, setActiveTab, isLoggedIn, onLogout, onLogin }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'scan', label: 'Scan Waste', icon: Scan },
    { id: 'guide', label: 'Waste Guide', icon: BookOpen },
    { id: 'map', label: 'Recycling Centers', icon: MapPin },
    { id: 'challenges', label: 'Challenges', icon: Trophy },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-forest-900/10 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('landing')}>
            <div className="flex h-12 w-12 items-center justify-center transition-all duration-300 group-hover:scale-105">
              <CodeMorphicxLogo className="h-12 w-12" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter uppercase text-forest-900 leading-none">
                EcoSort
              </span>
              <span className="text-[9px] font-bold tracking-widest text-emerald-700/80 uppercase mt-0.5">
                Code Morphicx
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center gap-8">
              {isLoggedIn ? (
                <>
                  <div className="flex gap-6">
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all ${
                          activeTab === item.id
                            ? 'text-forest-900 border-b-2 border-forest-900 pb-1'
                            : 'text-forest-900/40 hover:text-forest-900'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className="ml-6 flex items-center gap-4 border-l border-forest-900/10 pl-6">
                    <div className="flex flex-col items-end mr-2">
                      <span className="text-[10px] font-bold opacity-40 uppercase tracking-tighter">Eco Score</span>
                      <span className="text-lg font-black leading-none text-forest-900">2,840</span>
                    </div>
                    <div 
                      className="h-10 w-10 rounded-full border-2 border-forest-800 p-0.5 cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setActiveTab('profile')}
                    >
                      <div className="w-full h-full rounded-full bg-mint-400" />
                    </div>
                    <Button variant="ghost" size="icon" onClick={onLogout} className="text-forest-900/40 hover:text-forest-900">
                      <LogOut className="h-5 w-5" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={onLogin}>Log in</Button>
                  <Button onClick={onLogin}>Sign up</Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-emerald-600 hover:bg-emerald-50 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-emerald-100 bg-white"
          >
            <div className="space-y-1 px-2 pb-3 pt-2">
              {isLoggedIn ? (
                <>
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMenuOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-base font-medium ${
                        activeTab === item.id
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'text-emerald-600 hover:bg-emerald-50/50'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </button>
                  ))}
                  <div className="mt-4 border-t border-emerald-100 pt-4">
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setIsMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-emerald-600 hover:bg-emerald-50"
                    >
                      <User className="h-5 w-5" />
                      Profile
                    </button>
                    <button
                      onClick={onLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-rose-600 hover:bg-rose-50"
                    >
                      <LogOut className="h-5 w-5" />
                      Log out
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2 p-2">
                  <Button variant="outline" className="w-full" onClick={onLogin}>Log in</Button>
                  <Button className="w-full" onClick={onLogin}>Sign up</Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
