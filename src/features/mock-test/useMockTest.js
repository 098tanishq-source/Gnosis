import { useCallback, useEffect, useRef, useState } from 'react';
import { QUESTIONS } from './questions';
import { createClock, flush, pause } from './model';
export function useMockTest(active) {
 const [index, setIndex] = useState(0);
 const [answers, setAnswers] = useState(() => QUESTIONS.map(() => null));
 const [times, setTimes] = useState(() => QUESTIONS.map(() => 0));
 const [submitted, setSubmitted] = useState(false);
 const clock = useRef(createClock(QUESTIONS.length));
 const stop = useCallback(() => setTimes(pause(clock.current, performance.now())), []);
 useEffect(() => {
  if (!active || submitted) return;
  const start = () => { clock.current.index = index; if (!document.hidden) clock.current.started = performance.now(); };
  const visibility = () => document.hidden ? stop() : start();
  start();
  // One render per second, only inside this feature. No whole-app ticking.
  const interval = setInterval(() => { if (clock.current.started !== null) setTimes(flush(clock.current, performance.now())); }, 1000);
  document.addEventListener('visibilitychange', visibility);
  window.addEventListener('pagehide', stop);
  return () => { clearInterval(interval); document.removeEventListener('visibilitychange', visibility); window.removeEventListener('pagehide', stop); stop(); };
 }, [active, index, submitted, stop]);
 const goToQuestion = (next) => { if (next === index || next < 0 || next >= QUESTIONS.length) return; stop(); setIndex(next); };
 const submitTest = () => { stop(); setSubmitted(true); };
 const restart = () => { clock.current = createClock(QUESTIONS.length); setTimes(QUESTIONS.map(() => 0)); setAnswers(QUESTIONS.map(() => null)); setIndex(0); setSubmitted(false); };
 return { index, answers, times, submitted, setAnswers, goToQuestion, submitTest, restart };
}
