export const TRAP_MS = 30000;
export const isTimeTrap = (ms) => ms > TRAP_MS;
export function formatTime(ms) {
 const seconds = Math.floor(ms / 1000);
 return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}
export function analyse(answers, times, questions) {
 const answered = answers.filter(a => a !== null).length;
 const correct = answers.filter((a, i) => a === questions[i].correct).length;
 return { answered, correct, score: correct * 4 - (answered - correct), totalTime: times.reduce((a, b) => a + b, 0) };
}
// Pure clock operations: monotonic times supplied by the browser or tests.
export function createClock(count) { return { index: 0, started: null, totals: Array(count).fill(0) }; }
export function flush(clock, now) {
 if (clock.started !== null) { clock.totals[clock.index] += Math.max(0, now - clock.started); clock.started = now; }
 return [...clock.totals];
}
export function pause(clock, now) { const totals = flush(clock, now); clock.started = null; return totals; }
