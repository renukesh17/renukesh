import { useState } from 'react';
import { BookOpen, Trophy, Play, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { motion, AnimatePresence } from 'motion/react';
import { QuizQuestion, LearningModule } from '@/src/types';

const MOCK_MODULES: LearningModule[] = [
  {
    id: '1',
    title: 'Waste Segregation 101',
    description: 'Learn the fundamentals of sorting household waste.',
    category: 'Basics',
    progress: 100,
    content: '...',
  },
  {
    id: '2',
    title: 'Plastic Pollution',
    description: 'Understand the impact of microplastics on our oceans.',
    category: 'Environment',
    progress: 45,
    content: '...',
  },
  {
    id: '3',
    title: 'Composting at Home',
    description: 'Turn your organic waste into nutrient-rich soil.',
    category: 'Sustainability',
    progress: 0,
    content: '...',
  },
];

const MOCK_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Where should a used aluminum can go?',
    options: ['Organic Waste', 'Recyclable Waste', 'Hazardous Waste', 'General Waste'],
    correctAnswer: 1,
    explanation: 'Aluminum is 100% recyclable. Most cans can be recycled indefinitely if sorted correctly.',
  },
];

export function LearningHub() {
  const [activeView, setActiveView] = useState<'modules' | 'quiz'>('modules');
  const [quizState, setQuizState] = useState<{
    currentQuestion: number;
    selectedOption: number | null;
    isCorrect: boolean | null;
    showExplanation: boolean;
    score: number;
  }>({
    currentQuestion: 0,
    selectedOption: null,
    isCorrect: null,
    showExplanation: false,
    score: 0,
  });

  const handleQuizAnswer = (optionIndex: number) => {
    const isCorrect = optionIndex === MOCK_QUIZ[quizState.currentQuestion].correctAnswer;
    setQuizState({
      ...quizState,
      selectedOption: optionIndex,
      isCorrect,
      showExplanation: true,
      score: isCorrect ? quizState.score + 10 : quizState.score,
    });
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-emerald-900">Learning Hub</h2>
          <p className="text-emerald-600/70">Master the art of sustainability with courses and quizzes.</p>
        </div>
        <div className="flex bg-emerald-50 p-1 rounded-xl border border-emerald-100">
          <button
            onClick={() => setActiveView('modules')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeView === 'modules' ? 'bg-white text-emerald-700 shadow-sm' : 'text-emerald-600 hover:text-emerald-700'
            }`}
          >
            Courses
          </button>
          <button
            onClick={() => setActiveView('quiz')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeView === 'quiz' ? 'bg-white text-emerald-700 shadow-sm' : 'text-emerald-600 hover:text-emerald-700'
            }`}
          >
            Quizzes
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeView === 'modules' ? (
          <motion.div
            key="modules"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {MOCK_MODULES.map((module, i) => (
              <Card key={module.id} className="group hover:border-emerald-400 transition-all">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-50 px-2 py-1 rounded">
                      {module.category}
                    </span>
                  </div>
                  <CardTitle className="mt-4">{module.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-emerald-900/40 uppercase">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-emerald-50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${module.progress}%` }}
                          className="h-full bg-emerald-500"
                        />
                      </div>
                    </div>
                    <Button variant="outline" className="w-full group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      {module.progress === 100 ? (
                        <><CheckCircle2 className="h-4 w-4 mr-2" /> Review</>
                      ) : (
                        <><Play className="h-4 w-4 mr-2" /> {module.progress > 0 ? 'Continue' : 'Start Course'}</>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="border-dashed border-2 border-emerald-200 bg-emerald-50/20 flex flex-col items-center justify-center p-8 text-center">
              <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <ChevronRight className="h-6 w-6" />
              </div>
              <p className="text-emerald-900 font-bold">More Coming Soon</p>
              <p className="text-xs text-emerald-600/70 mt-1">New modules added every week by sustainability experts.</p>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 bg-emerald-100 w-full">
                <motion.div
                  className="h-full bg-emerald-500"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((quizState.currentQuestion + 1) / MOCK_QUIZ.length) * 100}%` }}
                />
              </div>
              
              <CardHeader className="pt-10">
                <div className="flex items-center gap-2 text-emerald-500 mb-2">
                  <Trophy className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Eco Quiz • {quizState.score} Points</span>
                </div>
                <CardTitle className="text-2xl leading-tight">
                  {MOCK_QUIZ[quizState.currentQuestion].question}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-3">
                  {MOCK_QUIZ[quizState.currentQuestion].options.map((option, i) => (
                    <button
                      key={i}
                      disabled={quizState.showExplanation}
                      onClick={() => handleQuizAnswer(i)}
                      className={`w-full p-4 rounded-xl text-left font-medium border-2 transition-all ${
                        quizState.selectedOption === i
                          ? quizState.isCorrect
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                            : 'border-rose-500 bg-rose-50 text-rose-900'
                          : quizState.showExplanation && i === MOCK_QUIZ[quizState.currentQuestion].correctAnswer
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                            : 'border-emerald-50 hover:border-emerald-200 bg-white text-emerald-700'
                      } ${quizState.showExplanation ? 'cursor-default' : 'cursor-pointer active:scale-98'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {quizState.showExplanation && i === MOCK_QUIZ[quizState.currentQuestion].correctAnswer && (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        )}
                        {quizState.showExplanation && quizState.selectedOption === i && !quizState.isCorrect && (
                          <HelpCircle className="h-5 w-5 text-rose-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <AnimatePresence>
                  {quizState.showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="rounded-xl bg-emerald-900 text-emerald-50 p-6 space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-emerald-400" />
                        <h4 className="font-bold">Did you know?</h4>
                      </div>
                      <p className="text-sm text-emerald-100/80 leading-relaxed">
                        {MOCK_QUIZ[quizState.currentQuestion].explanation}
                      </p>
                      <Button 
                        variant="success" 
                        className="w-full mt-2"
                        onClick={() => {
                          // Reset for demo or move to next
                          setQuizState({
                            currentQuestion: 0,
                            selectedOption: null,
                            isCorrect: null,
                            showExplanation: false,
                            score: quizState.score,
                          });
                        }}
                      >
                        Finish Quiz
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
