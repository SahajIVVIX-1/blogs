import { LP, assignDates } from './engine.mjs';
import { renderPostMarkdown } from './render-helper.mjs';

const phaseData = LP.find(p => p.n === 6);
const dates = assignDates(phaseData.from, phaseData.to, phaseData.topics.length);

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// import spec from phase-06-stats.mjs
// let's run a test on step 1 and 2
const spec1 = {
  step: 1,
  topic: phaseData.topics[0],
  tags: ["probability", "combinatorics"],
  paper: { title: "Ars Conjectandi", authors: ["Jacob Bernoulli"], year: 1713, arxiv: "https://archive.org/details/arsconjectandiop00bern" },
  sources: [
    { title: "MIT 18.05: Probability and Statistics", url: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2014/", publisher: "MIT" },
    { title: "Stanford CS109: Counting", url: "https://web.stanford.edu/class/cs109/", publisher: "Stanford" }
  ],
  summary: "A rigorous mathematical examination of combinatorics in probability theory: permutations, combinations, and partitioning.",
  highlights: ["Permutations count ordered arrangements.", "Stars-and-bars partitioning.", "Multinomial coefficients."],
  concept_summary: "Combinatorics forms the foundational counting calculus of discrete probability spaces.",
  diagram: "[Universe of N Elements]\n   --> Permutations\n   --> Combinations",
  derivation: "### Mathematical Formulation & Derivations\n\nFull KaTeX formulas...",
  code: "import math\nprint('demo')",
  stdout: "--- Demo Output ---",
  diagnostics: "### Numerical Hazards\n\nFactorial overflow..."
};

const post = renderPostMarkdown(spec1, dates[0], 6, phaseData.name);
const words = post.body.trim().split(/\s+/).length;
console.log(`Word count for step 1 test post: ${words} words`);

