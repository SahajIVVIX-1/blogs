// Spread each phase's topics evenly over the weekdays of that phase.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT, daysBetween } from './cache.mjs';

export const PHASES = JSON.parse(readFileSync(path.join(ROOT, 'src/data/learning-path.json'), 'utf8'));

export function schedule() {
  const out = [];
  for (const ph of PHASES) {
    const weekdays = [...daysBetween(ph.from, ph.to)].filter((d) => {
      const w = new Date(d + 'T00:00:00Z').getUTCDay();
      return w !== 0 && w !== 6;
    });
    const step = weekdays.length / ph.topics.length;
    ph.topics.forEach((topic, i) => {
      out.push({ phase: ph.n, phaseName: ph.name, step: i + 1, topic, date: weekdays[Math.floor(i * step)] });
    });
  }
  return out;
}
