import test from 'node:test';
import assert from 'node:assert/strict';
import { createClock, flush, pause, isTimeTrap, analyse } from '../src/features/mock-test/model.js';
import { QUESTIONS } from '../src/features/mock-test/questions.js';
test('time trap is strictly greater than 30 seconds', () => { assert.equal(isTimeTrap(30000), false); assert.equal(isTimeTrap(30001), true); });
test('paused time excluded; return visits accumulate independently', () => {
 const clock = createClock(3); clock.started = 100;
 assert.deepEqual(pause(clock, 10100), [10000,0,0]);
 assert.deepEqual(flush(clock, 99999), [10000,0,0]);
 clock.index = 1; clock.started = 100000; pause(clock, 102000);
 clock.index = 0; clock.started = 110000;
 assert.deepEqual(pause(clock, 115000), [15000,2000,0]);
});
test('score handles correct, wrong, skipped and negative totals', () => {
 assert.equal(analyse([1,2,0], [0,0,0], QUESTIONS).score,12);
 assert.equal(analyse([0,0,1], [0,0,0], QUESTIONS).score,-3);
 assert.deepEqual(analyse([1,0,null], [100,200,300], QUESTIONS), {answered:2, correct:1, score:3, totalTime:600});
});
