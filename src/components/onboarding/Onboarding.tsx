import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { Card, CardContent } from '@/src/components/ui/Card';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { CodeMorphicxLogo } from '@/src/components/ui/CodeMorphicxLogo';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  
  const steps = [
    {
      question: "How often do you recycle?",
      options: ["Every day", "A few times a week", "Rarely", "Never, but I want to start"]
    },
    {
      question: "How confident are you about waste segregation?",
      options: ["Very confident", "Somewhat confident", "Not very confident", "I have no idea"]
    },
    {
      question: "Which type of waste is difficult for you to identify?",
      options: ["Plastics & Resin codes", "E-Waste & Batteries", "Hazardous Chemicals", "Everything seems confusing"]
    }
  ];

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <AnimatePresence mode="wait">
        {step <= 3 ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-lg space-y-8"
          >
            <div className="flex justify-between items-center px-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">Step {step} of 3</span>
              <div className="flex gap-1">
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`h-1.5 w-8 rounded-full transition-all ${s <= step ? 'bg-emerald-500' : 'bg-emerald-100'}`} />
                ))}
              </div>
            </div>

            <Card>
              <CardContent className="p-10 space-y-8">
                <h2 className="text-2xl font-bold text-emerald-900 leading-tight">
                  {steps[step - 1].question}
                </h2>
                
                <div className="grid grid-cols-1 gap-3">
                  {steps[step - 1].options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => setStep(prev => prev + 1)}
                      className="w-full p-4 text-left rounded-2xl border-2 border-emerald-50 hover:border-emerald-500 hover:bg-emerald-50 transition-all font-medium text-emerald-700 active:scale-[0.98]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg text-center space-y-8"
          >
            <div className="mx-auto h-24 w-24 rounded-3xl bg-white border border-emerald-100 p-2 flex items-center justify-center shadow-xl shadow-emerald-100 overflow-hidden">
              <CodeMorphicxLogo className="h-full w-full" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-emerald-900">Welcome to EcoSort!</h2>
              <p className="text-emerald-600/70 text-lg">
                Let's make every piece of waste count. You're now ready to start your sustainability journey.
              </p>
            </div>
            <Button size="lg" className="h-14 px-12 text-lg gap-2" onClick={onComplete}>
              Go to Dashboard <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
