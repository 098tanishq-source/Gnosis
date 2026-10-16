import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, Lightbulb, Target } from 'lucide-react';
import { primary, secondary } from '../../components/styles';
import { QUESTIONS } from './questions';
import { formatTime, analyse } from './model';
import { useMockTest } from './useMockTest';
import TestResults from './TestResults';
export default function MockTest({ active }) {
 const { index, answers, times, submitted, setAnswers, goToQuestion, submitTest, restart } = useMockTest(active);
 const question = QUESTIONS[index];
 const { answered, totalTime } = analyse(answers, times, QUESTIONS);
 return (<div hidden={!active}>        {!submitted && (
          <div className="grid gap-5 md:grid-cols-[1fr_240px]">
            <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8" aria-label="Physics mock test">
              <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-800">NTA-STYLE PRACTICE</span>
                <span className="flex items-center gap-2 text-sm tabular-nums text-slate-500"><Clock3 size={16} aria-hidden="true" />{formatTime(times[index])} on this question</span>
              </div>
              <div className="mb-5 flex items-center justify-between text-xs text-slate-500"><span>Question {index + 1} of {QUESTIONS.length}</span><span>+4 correct / −1 incorrect</span></div>
              <fieldset key={index}>
                <legend className="mb-6 text-lg font-semibold leading-8 sm:text-xl">{question.text}</legend>
                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => (
                    <label key={option} className={`flex min-h-16 cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${answers[index] === optionIndex ? 'border-sky-600 bg-sky-50' : 'border-slate-200 hover:border-sky-300 hover:bg-slate-50'}`}>
                      <input className="h-4 w-4 shrink-0 accent-sky-700" type="radio" name={`question-${index}`} value={optionIndex} checked={answers[index] === optionIndex} onChange={() => setAnswers((previous) => previous.map((value, i) => i === index ? optionIndex : value))} />
                      <span className="text-sm"><span className="mr-3 font-semibold text-slate-400">{String.fromCharCode(65 + optionIndex)}.</span>{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <button type="button" disabled={answers[index] === null} className="mt-3 min-h-11 text-xs font-medium text-slate-500 hover:text-sky-800 disabled:opacity-40" onClick={() => setAnswers((previous) => previous.map((value, i) => i === index ? null : value))}>Clear response</button>
              <div className="mt-5 flex justify-between gap-3 border-t border-slate-100 pt-6">
                <button type="button" className={secondary} disabled={index === 0} onClick={() => goToQuestion(index - 1)}><ArrowLeft size={16} />Previous</button>
                <button type="button" className={primary} disabled={index === QUESTIONS.length - 1} onClick={() => goToQuestion(index + 1)}>Next<ArrowRight size={16} /></button>
              </div>
            </section>
            <aside className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-5 flex items-center gap-2 font-semibold"><Target size={18} className="text-cyan-600" />Your progress</div>
                <p className="text-3xl font-bold">{answered}<span className="text-base font-normal text-slate-400"> / 3 answered</span></p>
                <progress className="mt-4 h-2 w-full accent-sky-700" value={answered} max={3} aria-label="Questions answered" />
                <div className="my-5 flex gap-2" aria-label="Question navigation">
                  {QUESTIONS.map((_, i) => <button type="button" key={i} aria-label={`Question ${i + 1}, ${answers[i] === null ? 'unanswered' : 'answered'}`} aria-current={index === i ? 'step' : undefined} onClick={() => goToQuestion(i)} className={`h-11 w-11 rounded-xl border text-sm font-bold ${index === i ? 'border-primary bg-primary text-white' : answers[i] !== null ? 'border-cyan-200 bg-cyan-50 text-cyan-800' : 'border-slate-200 text-slate-500'}`}>{i + 1}</button>)}
                </div>
                <p className="mb-5 text-xs text-slate-500">Active time: <span className="tabular-nums">{formatTime(totalTime)}</span></p>
                <button type="button" className={`${primary} w-full`} onClick={submitTest}>Submit Test<CheckCircle2 size={16} /></button>
                <p className="mt-3 text-xs leading-5 text-slate-400">Unanswered questions score 0. Submit whenever you’re ready.</p>
              </div>
              <div className="rounded-2xl bg-well p-5 text-sm leading-6 text-muted"><Lightbulb className="mb-3 text-cyan-700" size={22} />Accuracy first. If you feel stuck, move ahead and return with fresh eyes.</div>
            </aside>
          </div>
        )}

        {submitted && <TestResults answers={answers} times={times} restart={restart} />}</div>);
}
