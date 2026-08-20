import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  HelpCircle,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Trophy,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { QuizQuestion } from '../types';

export const QuizPage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { userSession } = useAuth();
  const { getQuizByModuleId, getModuleById, submitQuizResult, settings } = useApp();

  const quizData = moduleId ? getQuizByModuleId(moduleId) : undefined;
  const moduleData = moduleId ? getModuleById(moduleId) : undefined;

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(300); // 5 minutes timer
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [passed, setPassed] = useState<boolean>(false);

  useEffect(() => {
    if (quizData) {
      // Shuffle questions slightly
      const shuffled = [...quizData.questions].sort(() => 0.5 - Math.random());
      setQuestions(shuffled);
      // Give 60 seconds per question (30 minutes for 30 questions)
      setTimeLeftSeconds(Math.max(300, shuffled.length * 60));
      setIsFinished(false);
      setSelectedAnswers({});
      setCurrentIndex(0);
    }
  }, [moduleId, quizData]);

  // Countdown timer
  useEffect(() => {
    if (isFinished || timeLeftSeconds <= 0) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeftSeconds, isFinished]);

  if (!quizData || questions.length === 0) {
    return (
      <div className="p-12 text-center text-slate-400">
        <p className="mb-4">Kuis tidak ditemukan untuk modul ini.</p>
        <Link to="/modules" className="text-cyan-400 font-bold underline">
          Kembali ke Modul
        </Link>
      </div>
    );
  }

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (isFinished) return;
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: optionIndex });
  };

  const finishQuiz = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct += 1;
      }
    });

    const calculatedScore = Math.round((correct / questions.length) * 100);
    setScore(calculatedScore);

    if (moduleId) {
      const isPass = submitQuizResult(moduleId, calculatedScore, questions.length, correct);
      setPassed(isPass);
    }
    setIsFinished(true);
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-slate-800 text-amber-300 border border-slate-700">
            KUIS {moduleId}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">{quizData.moduleTitle}</h2>
          <p className="text-xs text-slate-400 mt-1">
            {questions.length} Soal Pilihan Ganda • Passing Grade: {settings.passingScoreThreshold}%
          </p>
        </div>

        {!isFinished && (
          <div className="flex items-center gap-2 bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800 font-mono text-sm font-bold text-amber-400">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{formatTime(timeLeftSeconds)}</span>
          </div>
        )}
      </div>

      {!isFinished ? (
        /* Quiz Active In-Progress View */
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-8 backdrop-blur-md space-y-6">
          {/* Question Index Grid */}
          <div className="border-b border-slate-800/80 pb-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">
                Soal <span className="text-cyan-400 font-mono font-bold text-sm">#{currentIndex + 1}</span> dari {questions.length}
              </span>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                Dijawab: <strong className="text-cyan-400">{Object.keys(selectedAnswers).length}</strong> / {questions.length}
              </span>
            </div>

            {/* Responsive Scrollable/Wrapped Number Palette */}
            <div className="flex flex-wrap gap-1.5 max-h-36 sm:max-h-28 overflow-y-auto p-2 bg-slate-950/60 rounded-2xl border border-slate-800/80 custom-scrollbar">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-mono text-[11px] sm:text-xs font-bold border transition cursor-pointer flex items-center justify-center ${
                    currentIndex === idx
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                      : selectedAnswers[idx] !== undefined
                      ? 'bg-slate-800 text-cyan-300 border-slate-700'
                      : 'bg-slate-950 text-slate-500 border-slate-800/80 hover:border-slate-700'
                  }`}
                  title={`Nomor ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Question Text */}
          <div className="text-base sm:text-lg font-bold text-white leading-relaxed">
            {currentQ.question}
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {currentQ.options.map((optionText, optIdx) => {
              const isSelected = selectedAnswers[currentIndex] === optIdx;
              const optionLetters = ['A', 'B', 'C', 'D'];
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(currentIndex, optIdx)}
                  className={`w-full min-h-[52px] flex items-center gap-3 p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs border shrink-0 ${
                      isSelected ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    {optionLetters[optIdx]}
                  </span>
                  <span className="flex-1 leading-relaxed">{optionText}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 gap-3">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 text-slate-300 disabled:opacity-40 cursor-pointer hover:bg-slate-700 transition"
            >
              Sebelumnya
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                className="min-h-[44px] px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-700 text-white cursor-pointer transition"
              >
                Selanjutnya
              </button>
            ) : (
              <button
                onClick={finishQuiz}
                className="min-h-[44px] px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 cursor-pointer transition"
              >
                Kirim Jawaban ({Object.keys(selectedAnswers).length}/{questions.length})
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Results & Automated Discussion View */
        <div className="space-y-6">
          <div
            className={`p-8 rounded-3xl border text-center space-y-4 backdrop-blur-md ${
              passed ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-rose-950/20 border-rose-500/40'
            }`}
          >
            <div className="inline-flex p-4 rounded-full bg-slate-900 border border-slate-800 shadow-xl">
              {passed ? <Trophy className="w-12 h-12 text-amber-400" /> : <AlertTriangle className="w-12 h-12 text-rose-400" />}
            </div>

            <div>
              <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white mb-1">{score} / 100</div>
              <h3 className={`text-xl sm:text-2xl font-bold ${passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                {passed ? 'SELAMAT, ANDA LULUS KUIS! 🎉' : 'BELUM MENCAPAI PASSING GRADE 75'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                {passed
                  ? `Modul ${moduleId} berhasil diselesaikan. Skor: ${score}% dari total ${questions.length} soal.`
                  : `Nilai minimal kelulusan adalah ${settings.passingScoreThreshold}%. Silakan baca kembali materi modul dan pelajari pembahasan lengkap di bawah.`}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {!passed && (
                <button
                  onClick={() => {
                    setIsFinished(false);
                    setSelectedAnswers({});
                    setTimeLeftSeconds(Math.max(300, questions.length * 60));
                  }}
                  className="flex items-center gap-2 bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-rose-500/20 cursor-pointer min-h-[44px]"
                >
                  <RotateCcw className="w-4 h-4" />
                  Coba Ulang Kuis
                </button>
              )}

              <Link
                to="/modules"
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-cyan-500/20 cursor-pointer min-h-[44px]"
              >
                <span>Lanjut ke Modul Lain</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Automated Solution Discussion */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Pembahasan Otomatis Kuis {moduleId}
            </h3>

            <div className="space-y-4">
              {questions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-2">
                    <div className="flex items-start gap-2 text-xs font-bold text-white">
                      <span className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">#{idx + 1}</span>
                      <span>{q.question}</span>
                    </div>

                    <div className="text-xs space-y-1 pl-6">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Jawaban Anda:</span>
                        <span className={`font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {userAns !== undefined ? q.options[userAns] : 'Tidak dijawab'}
                        </span>
                        {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-rose-400" />}
                      </div>

                      {!isCorrect && (
                        <div className="text-emerald-400 font-semibold">
                          Jawaban Benar: {q.options[q.correctAnswer]}
                        </div>
                      )}

                      <div className="p-2.5 bg-slate-900/80 rounded-xl text-slate-300 text-[11px] border border-slate-800/60 mt-2 italic">
                        💡 <strong>Pembahasan:</strong> {q.explanation}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
