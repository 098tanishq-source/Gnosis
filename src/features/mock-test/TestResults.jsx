import { AlertTriangle, RotateCcw } from 'lucide-react';
import { QUESTIONS } from './questions';
import { formatTime, analyse, isTimeTrap } from './model';
import { secondary } from '../../components/styles';
export default function TestResults({ answers, times, restart }) {
 const { answered, correct, score, totalTime } = analyse(answers, times, QUESTIONS);
 return (          <section aria-label="Test analysis" className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-primary p-7 text-white">
              <div><p className="mb-2 text-sm text-sky-200">Practice complete · Test analysis</p><p className="text-4xl font-bold">{score}<span className="text-lg font-normal text-sky-200"> / 12 points</span></p><p className="mt-3 text-sm text-sky-100">{correct} correct · {answered - correct} incorrect · {3 - answered} unanswered · {formatTime(totalTime)} active</p></div>
              <button type="button" onClick={restart} className={secondary + ' text-primary'}><RotateCcw size={16} />Try again</button>
            </div>
            {QUESTIONS.map((item, i) => (
              <article key={item.text} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap items-center gap-3"><span className="text-sm font-bold">Question {i + 1}</span><span className={`text-xs font-semibold ${answers[i] === item.correct ? 'text-emerald-700' : 'text-slate-500'}`}>{answers[i] === null ? 'Unanswered · 0' : answers[i] === item.correct ? 'Correct · +4' : 'Incorrect · −1'}</span><span className="text-xs tabular-nums text-slate-500">{(times[i] / 1000).toFixed(1)} s</span>
                  {isTimeTrap(times[i]) && <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800"><AlertTriangle size={14} />Time-Trap Detected</span>}
                </div>
                <h2 className="font-semibold leading-7">{item.text}</h2>
                <p className="mt-3 text-sm text-slate-500">Your answer: {answers[i] === null ? 'Not attempted' : item.options[answers[i]]}</p>
                <p className="mt-2 text-sm font-medium text-emerald-800">Correct answer: {item.options[item.correct]}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.explanation}</p>
                {isTimeTrap(times[i]) && <p className="mt-3 text-sm text-amber-800">More than 30 seconds here. Revisit {item.topic.toLowerCase()} and practise a similar question.</p>}
              </article>
            ))}
          </section>
);
}
