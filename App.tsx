
import React, { useState, useEffect } from 'react';
import { Sparkles, History, Timer, Hourglass, ChevronRight, PartyPopper, Cpu, Quote } from 'lucide-react';
import { calculateProgressStats, getSeason } from './utils/dateUtils';
import { getDailyYearInsight } from './services/geminiService';
import { TimeStats, YearInsight } from './types';
import { StatBox } from './components/StatBox';

const App: React.FC = () => {
  const [stats, setStats] = useState<TimeStats>(calculateProgressStats());
  const [insight, setInsight] = useState<YearInsight | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setStats(calculateProgressStats());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoadingInsight(true);
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      const data = await getDailyYearInsight(stats.currentYear, dateStr);
      setInsight(data);
      setLoadingInsight(false);
    };
    fetchInsight();
  }, [stats.currentYear]);

  const isYearComplete = stats.percentage >= 100;
  const progressPercentage = stats.percentage.toFixed(2);
  const season = getSeason(new Date().getMonth());

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center max-w-5xl mx-auto selection:bg-sky-500/30">
      <header className="w-full text-center mb-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-sky-400 uppercase tracking-widest mb-4">
          <Timer size={12} /> Temporal Precision Engine
        </div>
        <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white via-sky-300 to-indigo-500 mb-2">
          {isYearComplete ? `Happy ${stats.currentYear}!` : stats.currentYear}
        </h1>
        <p className="text-slate-500 text-sm md:text-base font-medium">
          {isYearComplete ? "The threshold has been crossed." : "Measuring the current of time."}
        </p>
      </header>

      <main className="w-full space-y-6">
        <div className="glass p-8 md:p-14 rounded-[3rem] relative overflow-hidden group border border-white/10 shadow-2xl shadow-sky-900/20">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-sky-500/10 rounded-full blur-[100px] group-hover:bg-sky-500/20 transition-all duration-700"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            {isYearComplete ? (
              <div className="text-center space-y-8 animate-in fade-in zoom-in duration-1000">
                <div className="p-6 bg-sky-500/10 rounded-full border border-sky-500/20 inline-block">
                  <PartyPopper className="text-sky-400" size={64} />
                </div>
                <div>
                  <h2 className="text-5xl font-black text-white mb-2">100% COMPLETE</h2>
                  <p className="text-slate-400 font-mono tracking-widest text-sm uppercase">Welcome to the New Era</p>
                </div>
                <div className="flex gap-4 justify-center">
                   <div className="px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-sm uppercase tracking-tighter">
                      Exploring {stats.currentYear}
                   </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-8">
                   <div className="px-4 py-1.5 bg-sky-500/10 text-sky-400 rounded-full text-[10px] font-black uppercase tracking-tighter border border-sky-500/20">
                    {season}
                   </div>
                   <div className="px-4 py-1.5 bg-white/5 text-slate-300 rounded-full text-[10px] font-black uppercase tracking-tighter border border-white/10">
                    Day {stats.daysPassed + 1} of {stats.totalDays}
                   </div>
                </div>

                <div className="text-8xl md:text-[10rem] font-black text-white tabular-nums mb-10 tracking-tighter flex items-baseline gap-1 select-none">
                  {progressPercentage}
                  <span className="text-2xl md:text-4xl text-sky-500/40 font-bold">%</span>
                </div>

                <div className="w-full h-4 bg-slate-900/80 rounded-full p-0.5 border border-white/5 overflow-hidden relative">
                  <div 
                    className={`h-full bg-gradient-to-r from-sky-600 via-sky-400 to-indigo-500 rounded-full transition-all duration-1000 ease-out ${stats.percentage > 0 ? 'progress-glow' : ''}`}
                    style={{ width: `${Math.min(100, stats.percentage)}%` }}
                  />
                </div>

                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-3xl">
                  <div className="flex flex-col items-center group/stat">
                    <span className="text-white font-black text-2xl md:text-3xl tabular-nums">{stats.daysRemaining}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 group-hover/stat:text-sky-500 transition-colors mt-1">Days Left</span>
                  </div>
                  <div className="flex flex-col items-center group/stat">
                    <span className="text-white font-black text-2xl md:text-3xl tabular-nums">{stats.hoursRemaining}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 group-hover/stat:text-sky-500 transition-colors mt-1">Hours</span>
                  </div>
                  <div className="flex flex-col items-center group/stat">
                    <span className="text-white font-black text-2xl md:text-3xl tabular-nums">{stats.minutesRemaining}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 group-hover/stat:text-sky-500 transition-colors mt-1">Minutes</span>
                  </div>
                  <div className="flex flex-col items-center group/stat">
                    <span className="text-white font-black text-2xl md:text-3xl tabular-nums">{stats.secondsRemaining}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 group-hover/stat:text-sky-500 transition-colors mt-1">Seconds</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBox 
            label="Year Accomplished" 
            value={stats.daysPassed} 
            subtext="Days completed" 
            iconName="trophy"
          />
          <StatBox 
            label="Year Countdown" 
            value={stats.daysRemaining} 
            subtext="Days remaining" 
            iconName="calendar"
          />
          <StatBox 
            label={`${stats.currentMonthName}`}
            value={`${stats.monthPercentage.toFixed(1)}%`}
            progress={stats.monthPercentage}
            progressColor="bg-indigo-500"
            subtext="Monthly Momentum"
            iconName="layout"
          />
          <StatBox 
            label="Daily Passage" 
            value={`${stats.dayPercentage.toFixed(1)}%`}
            progress={stats.dayPercentage}
            progressColor="bg-emerald-500"
            subtext="Today's Flight"
            iconName="clock"
          />
        </div>

        <section className="w-full glass p-8 rounded-[2.5rem] border border-white/5 relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent rounded-[2.5rem] pointer-events-none"></div>
          <div className="flex items-center gap-3 mb-8 relative">
            <div className="p-2 bg-yellow-400/10 rounded-xl">
              <Sparkles className="text-yellow-400" size={20} />
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">AI Temporal Insights</h2>
          </div>

          {loadingInsight ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-3 bg-slate-800 rounded w-full"></div>
              <div className="h-3 bg-slate-800 rounded w-5/6"></div>
              <div className="h-3 bg-slate-800 rounded w-2/3"></div>
            </div>
          ) : insight && (
            <div className="grid md:grid-cols-3 gap-10 relative">
              <div className="space-y-3 group/item">
                <div className="text-[10px] font-black text-sky-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Cpu size={12} /> AI Tools Suggestions
                </div>
                <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-sky-500/20 pl-4 py-1 group-hover/item:border-sky-500 transition-colors font-medium">
                  {insight.aiTool}
                </p>
              </div>
              <div className="space-y-3 group/item">
                <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-2">
                   <Quote size={12} /> African Proverbs and Wise Sayings
                </div>
                <p className="text-slate-100 text-sm leading-relaxed font-semibold pl-4 py-1 group-hover/item:text-white transition-colors italic">
                  "{insight.proverb}"
                </p>
              </div>
              <div className="space-y-3 group/item">
                <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] flex items-center gap-2">
                   <History size={12} /> On This Day
                </div>
                <div className="flex gap-3 items-start pl-4">
                   <p className="text-slate-400 text-xs leading-relaxed font-medium">{insight.historicalEvent}</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="mt-16 pb-12 w-full max-w-2xl border-t border-white/5 pt-8 text-slate-500 text-[10px] text-center uppercase tracking-widest font-bold">
        <div className="flex justify-center gap-6 mb-4 opacity-50">
          <span>{stats.currentYear} Epoch</span>
          <span>•</span>
          <span>Precision {stats.percentage.toFixed(5)}%</span>
        </div>
        <p className="opacity-30">Synchronized with ISO-8601 UTC Standards</p>
      </footer>
    </div>
  );
};

export default App;
