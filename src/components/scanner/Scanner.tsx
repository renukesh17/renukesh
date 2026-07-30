import { useState, useRef } from 'react';
import { Camera, Upload, RefreshCcw, CheckCircle2, AlertCircle, Loader2, Save, ArrowRight, Trash2, Leaf } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { motion, AnimatePresence } from 'motion/react';
import { WasteAnalysis, WasteCategory } from '@/src/types';

export function Scanner() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<WasteAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        analyzeWaste(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeWaste = async (base64Image: string) => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze-waste', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image }),
      });

      if (!response.ok) throw new Error('Failed to analyze image');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('Something went wrong during analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-12">
      <div className="text-center space-y-4">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] bg-mint-200 px-3 py-1 rounded-sm text-forest-900">
          AI Sorting Assistant
        </span>
        <h2 className="text-5xl font-black tracking-tighter uppercase text-forest-900">Waste Scanner</h2>
        <p className="text-forest-900/60 font-medium max-w-lg mx-auto leading-relaxed">Identify your items instantly and find the optimal recycling path.</p>
      </div>

      {!image ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="bg-sage-200/50 border-2 border-dashed border-forest-900/10">
            <CardContent className="flex flex-col items-center justify-center py-24 text-center">
              <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-white text-forest-900 shadow-xl">
                <Camera className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-forest-900">Ready to Scan</h3>
              <p className="mt-3 text-forest-900/40 font-bold uppercase tracking-widest text-[11px] max-w-xs leading-relaxed">
                Point your camera or upload a clear photo for high-confidence identification.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button className="h-14 px-8 rounded-xl" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
                <Button variant="outline" className="h-14 px-8 rounded-xl">
                  <Camera className="h-4 w-4 mr-2" />
                  Use Camera
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Image Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <Card className="overflow-hidden bg-white border border-forest-900/10 shadow-2xl rounded-[40px]">
              <div className="aspect-[4/5] relative group bg-sage-100">
                <img src={image} alt="Waste" className="h-full w-full object-cover" />
                {/* Scanner Accents */}
                <div className="absolute inset-8 pointer-events-none z-10 opacity-60">
                  <div className="absolute -top-1 -left-1 w-10 h-10 border-t-4 border-l-4 border-forest-900" />
                  <div className="absolute -top-1 -right-1 w-10 h-10 border-t-4 border-r-4 border-forest-900" />
                  <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-4 border-l-4 border-forest-900" />
                  <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-4 border-r-4 border-forest-900" />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button variant="outline" className="bg-white border-none" onClick={reset}>
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    Retake
                  </Button>
                </div>
              </div>
              <CardContent className="p-8 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-mint-400 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-forest-900">
                    Image Captured
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="text-rose-600 hover:bg-rose-50" onClick={reset}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Analysis Result */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5"
          >
            {isAnalyzing ? (
              <Card className="h-full flex flex-col items-center justify-center p-12 text-center rounded-[40px] bg-white border border-forest-900/10 shadow-2xl">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mb-6 h-16 w-16 border-4 border-mint-400 border-t-transparent rounded-full"
                />
                <h3 className="text-2xl font-black uppercase tracking-tight text-forest-900">Analyzing Item...</h3>
                <p className="mt-3 text-forest-900/40 font-bold uppercase tracking-widest text-[11px] max-w-xs leading-relaxed">
                  Our neural networks are identifying materials and disposal protocols.
                </p>
              </Card>
            ) : error ? (
              <Card className="h-full border-rose-100 bg-rose-50/30 p-12 text-center flex flex-col items-center justify-center rounded-[40px]">
                <AlertCircle className="h-16 w-16 text-rose-500 mb-6" />
                <h3 className="text-2xl font-black uppercase text-rose-900">Analysis Failed</h3>
                <p className="mt-3 text-rose-700/70 mb-8 font-medium">{error}</p>
                <Button variant="danger" className="w-full h-14 rounded-xl" onClick={() => analyzeWaste(image)}>Try Again</Button>
              </Card>
            ) : result ? (
              <div className="space-y-8">
                <Card className="rounded-[40px] bg-white border border-forest-900/10 shadow-2xl overflow-hidden">
                  <CardHeader className="p-8 pb-4 border-b border-forest-900/5">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] text-white ${
                        result.category === WasteCategory.HAZARDOUS ? 'bg-rose-500' : 
                        result.category === WasteCategory.ORGANIC ? 'bg-amber-600' : 'bg-forest-900'
                      }`}>
                        {result.category}
                      </span>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-forest-900/40">
                        {result.confidence}% Confidence
                      </div>
                    </div>
                    <CardTitle className="text-4xl">{result.item}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    <div className="space-y-4">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-forest-900/40">
                        Disposal Protocol
                      </h4>
                      <ul className="space-y-4">
                        {result.instructions.map((step, i) => (
                          <li key={i} className="flex gap-4 text-sm text-forest-900 font-medium leading-relaxed">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-900 text-[10px] font-bold text-white">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-2xl bg-sage-100 p-5 border border-forest-900/5">
                        <p className="text-[10px] uppercase font-black tracking-widest text-forest-900/30 mb-2">Recyclable</p>
                        <p className="text-lg font-black text-forest-900 uppercase">{result.recyclable ? 'Yes' : 'No'}</p>
                      </div>
                      <div className="rounded-2xl bg-sage-100 p-5 border border-forest-900/5">
                        <p className="text-[10px] uppercase font-black tracking-widest text-forest-900/30 mb-2">Reusable</p>
                        <p className="text-lg font-black text-forest-900 uppercase">{result.reusable ? 'Yes' : 'No'}</p>
                      </div>
                    </div>

                    <div className="pt-6 flex flex-col gap-3">
                      <Button className="h-14 rounded-xl">
                        <Save className="h-4 w-4 mr-2" />
                        Log Result
                      </Button>
                      <Button variant="outline" className="h-14 rounded-xl" onClick={reset}>Scan New Item</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-forest-900 text-white border-none rounded-[40px] p-8 relative overflow-hidden shadow-2xl">
                  <div className="relative z-10 flex gap-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-mint-400 text-forest-900 shadow-lg">
                      <Leaf className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black uppercase tracking-tight">Eco Impact</h4>
                      <p className="text-sm text-mint-200/80 mt-2 italic leading-relaxed font-medium">"{result.environmentalImpact}"</p>
                    </div>
                  </div>
                  {/* Decorative accent */}
                  <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-mint-400/10 rounded-full blur-3xl" />
                </Card>
              </div>
            ) : null}
          </motion.div>
        </div>
      )}
    </div>
  );
}
