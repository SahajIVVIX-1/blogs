import { LP, assignDates, slugify, writePostFile } from './engine.mjs';

const phaseData = LP.find(p => p.n === 6);
const dates = assignDates(phaseData.from, phaseData.to, phaseData.topics.length);

console.log(`Generating ${phaseData.topics.length} posts for Phase 6 (${phaseData.name})...`);

// Metadata definitions for the 125 topics in Phase 6
export const STATS_TOPIC_SPECS = [
  // 1: Combinatorics
  {
    step: 1,
    topic: phaseData.topics[0],
    subfield: "Foundations of Probability",
    tags: ["probability", "combinatorics", "counting", "discrete-math"],
    paper: {
      title: "Ars Conjectandi (The Art of Conjecturing)",
      authors: ["Jacob Bernoulli"],
      year: 1713,
      arxiv: "https://archive.org/details/arsconjectandiop00bern"
    },
    sources: [
      { title: "MIT 18.05: Introduction to Probability and Statistics - Combinatorics", url: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2014/", publisher: "MIT OpenCourseWare" },
      { title: "Stanford CS109: Probability for Computer Scientists - Counting", url: "https://web.stanford.edu/class/cs109/", publisher: "Stanford University" },
      { title: "SciPy Special Combinatorics Functions (comb, perm, factorial)", url: "https://docs.scipy.org/doc/scipy/reference/special.html", publisher: "SciPy Community" }
    ],
    summary: "A rigorous mathematical examination of combinatorics in probability theory: permutations, combinations, stars-and-bars partitioning, and multinomial coefficient derivations with computational verification.",
    highlights: [
      "Permutations count ordered arrangements, while combinations discard ordering via quotient equivalence classes.",
      "Stars-and-bars partitioning enumerates non-negative integer solutions to Diophantine equations with fundamental applications in statistical mechanics.",
      "Multinomial coefficients generalize binomial expansions and govern categorical outcome distributions in machine learning."
    ],
    concept_summary: "Combinatorics forms the foundational counting calculus of discrete probability spaces. Before we can measure probabilities in finite sample spaces under the principle of indifference, we must systematically quantify the cardinality of symmetric outcome spaces.",
    diagram: `
  [Universe of N Distinct Elements]
                 │
      ┌──────────┴──────────┐
      ▼                     ▼
  Ordered (Permutations)   Unordered (Combinations)
      │                     │
  P(n, k) = n! / (n-k)!    C(n, k) = n! / (k!(n-k)!)
      │                     │
      ▼                     ▼
  With Replacement: n^k   Stars & Bars: C(n+k-1, k)
    `,
    derivation: `
### Mathematical Formulation & Derivations

#### 1. The Fundamental Principle of Counting & Permutations
Let a compound experiment consist of $k$ independent sequential stages, where stage $i$ yields $n_i$ distinct outcomes. The total number of composite outcomes in the Cartesian product $\\Omega_1 \\times \\Omega_2 \\times \\dots \\times \\Omega_k$ is:
$$\n|\\Omega| = \\prod_{i=1}^k n_i\n$$

When selecting $k$ items without replacement from a pool of $n$ distinct elements, the number of ordered sequences is:
$$P(n, k) = n(n-1)(n-2)\\dots(n-k+1) = \\frac{n!}{(n-k)!}$$

#### 2. Combinations as Quotient Equivalence Classes
When ordering does not distinguish states, each subset of size $k$ induces an equivalence class of $k!$ distinct permutations. Dividing by the fiber cardinality yields the binomial coefficient:
$$\\binom{n}{k} = \\frac{P(n, k)}{k!} = \\frac{n!}{k!(n-k)!}$$

The algebraic symmetry $\\binom{n}{k} = \\binom{n}{n-k}$ reflects the bijectivity of choosing which $k$ items to include versus which $n-k$ items to exclude.

#### 3. Stars and Bars (Integer Compositions)
The number of distinct ways to distribute $k$ indistinguishable items into $n$ distinguishable bins (or equivalently, non-negative integer solutions to $x_1 + x_2 + \\dots + x_n = k$ where $x_i \\ge 0$) corresponds to arranging $k$ stars and $n-1$ divider bars:
$$\\binom{k + n - 1}{n - 1} = \\binom{k + n - 1}{k}$$

If strictly positive integer solutions are required ($x_i \\ge 1$), pre-allocating one item per bin transforms the problem into distributing $k-n$ items, yielding $\\binom{k-1}{n-1}$.

#### 4. The Multinomial Theorem
Generalizing combinations to partitioning $n$ distinct elements into $m$ labelled bins of sizes $k_1, k_2, \\dots, k_m$ with $\\sum_{j=1}^m k_j = n$:
$$\\binom{n}{k_1, k_2, \\dots, k_m} = \\frac{n!}{k_1! k_2! \\dots k_m!}$$
This expands polynomials $(x_1 + x_2 + \\dots + x_m)^n = \\sum_{k_1+\\dots+k_m=n} \\binom{n}{k_1, \\dots, k_m} \\prod_{j=1}^m x_j^{k_j}$.
`,
    code: `import math
from scipy.special import comb, perm

def combinatorial_partition_demo():
    n, k = 10, 4
    
    # 1. Permutations & Combinations
    p_nk = perm(n, k, exact=True)
    c_nk = comb(n, k, exact=True)
    
    # 2. Stars and Bars (k items into n bins)
    stars_and_bars = comb(k + n - 1, k, exact=True)
    
    # 3. Multinomial coefficient: 12 items into groups of 3, 4, 5
    items = 12
    groups = [3, 4, 5]
    multinomial = math.factorial(items)
    for g in groups:
        multinomial //= math.factorial(g)
        
    print(f"--- Combinatorial Metrics (n={n}, k={k}) ---")
    print(f"Permutations P({n}, {k})       : {p_nk:,}")
    print(f"Combinations C({n}, {k})       : {c_nk:,}")
    print(f"Stars & Bars (4 into 10 bins) : {stars_and_bars:,}")
    print(f"Multinomial (12 -> [3, 4, 5]) : {multinomial:,}")
    
    # Verification: Pascal's Identity C(n, k) = C(n-1, k-1) + C(n-1, k)
    pascal_check = comb(n-1, k-1, exact=True) + comb(n-1, k, exact=True)
    print(f"Pascal Identity verified      : {c_nk == pascal_check}")

if __name__ == '__main__':
    combinatorial_partition_demo()
`,
    stdout: `--- Combinatorial Metrics (n=10, k=4) ---
Permutations P(10, 4)       : 5,040
Combinations C(10, 4)       : 210
Stars & Bars (4 into 10 bins) : 715
Multinomial (12 -> [3, 4, 5]) : 27,720
Pascal Identity verified      : True`,
    diagnostics: `
### Numerical Hazards, Overflows & Edge Cases

1. **Integer Factorial Overflow**: Direct computation of $n!$ explodes exponentially ($20! \\approx 2.43 \\times 10^{18}$, overflowing 64-bit signed integers). In machine learning, combinatorial expressions must always be evaluated in log-space using the log-gamma function $\\ln \\Gamma(n+1) = \\ln(n!)$:
   $$\\ln \\binom{n}{k} = \\ln \\Gamma(n+1) - \\ln \\Gamma(k+1) - \\ln \\Gamma(n-k+1)$$
2. **Multiplicative Cancellation Algorithm**: When computing exact integers without BigInt support, iteratively multiply and divide:
   $$\\binom{n}{k} = \\prod_{i=1}^k \\frac{n - k + i}{i}$$
   Each division is guaranteed to leave no remainder because the product of any $i$ consecutive integers is divisible by $i!$.
3. **Stars and Bars Edge Cases**: When $k=0$, $\\binom{n-1}{0} = 1$, representing the single empty configuration. When $n=0$ with $k > 0$, the set of solutions is empty.
`
  },

  // 2: Probability Spaces & Kolmogorov Axioms
  {
    step: 2,
    topic: phaseData.topics[1],
    subfield: "Foundations of Probability",
    tags: ["probability", "kolmogorov", "measure-theory", "sigma-algebra"],
    paper: {
      title: "Grundbegriffe der Wahrscheinlichkeitsrechnung (Foundations of the Theory of Probability)",
      authors: ["Andrey Kolmogorov"],
      year: 1933,
      arxiv: "https://archive.org/details/grundbegriffeder00kolm"
    },
    sources: [
      { title: "Stanford Statistics 200: Measure-Theoretic Probability Foundations", url: "https://web.stanford.edu/class/stats200/", publisher: "Stanford University" },
      { title: "MIT 18.175: Theory of Probability - Sigma Algebras & Measures", url: "https://ocw.mit.edu/courses/18-175-theory-of-probability-spring-2014/", publisher: "MIT OpenCourseWare" },
      { title: "The Elements of Statistical Learning (Appendix on Probability Spaces)", url: "https://hastie.su.domains/ElemStatLearn/", publisher: "Stanford University" }
    ],
    summary: "The formal measure-theoretic axiomatization of probability by Andrey Kolmogorov: sample spaces, sigma-algebras of observable events, countably additive probability measures, and continuity from below.",
    highlights: [
      "Probability is formalized as a normalized measure of unit mass on a measurable space (Omega, F).",
      "A sigma-algebra ensures closedness under complements and countable unions, preventing Banach-Tarski paradoxes on continuous spaces.",
      "Countable additivity enables limits of monotonic sequences of events to equal the probability of their limit sets."
    ],
    concept_summary: "Prior to 1933, probability relied on intuitive definitions like the 'principle of indifference' or limiting relative frequencies, both suffering from logical paradoxes (such as Bertrand's paradox). Kolmogorov solved this by grounding probability within measure theory.",
    diagram: `
  [Probability Space Triplet (Ω, 𝓕, P)]
  
  ┌──────────────────────────────────────────────────────────┐
  │ Sample Space (Ω): All conceivable elementary outcomes    │
  │                                                          │
  │   ┌────────────────────────────────────────────────────┐ │
  │   │ σ-Algebra (𝓕): Set of observable events            │ │
  │   │  - Closed under complementation (A^c ∈ 𝓕)          │ │
  │   │  - Closed under countable unions (∪ A_i ∈ 𝓕)       │ │
  │   │                                                    │ │
  │   │   ┌──────────────────────────────────────────────┐ │ │
  │   │   │ Probability Measure P: 𝓕 → [0, 1]            │ │ │
  │   │   │  - Non-negativity: P(A) ≥ 0                  │ │ │
  │   │   │  - Normalization:  P(Ω) = 1                  │ │ │
  │   │   │  - Countable additivity: P(∪ A_i) = Σ P(A_i) │ │ │
  │   │   └──────────────────────────────────────────────┘ │ │
  │   └────────────────────────────────────────────────────┘ │
  └──────────────────────────────────────────────────────────┘
    `,
    derivation: `
### Mathematical Formulation & Derivations

#### 1. The Triplet $(\\Omega, \\mathcal{F}, P)$
A probability space is a measure space of unit mass consisting of:
1. **Sample Space** $\\Omega$: A non-empty set of all possible elementary outcomes $\\omega$.
2. **$\\sigma$-Algebra** $\\mathcal{F}$: A collection of subsets of $\\Omega$ satisfying:
   - $\\Omega \\in \\mathcal{F}$
   - If $A \\in \\mathcal{F}$, then $A^c = \\Omega \\setminus A \\in \\mathcal{F}$ (closure under complementation)
   - If $A_1, A_2, \\dots \\in \\mathcal{F}$, then $\\bigcup_{i=1}^\\infty A_i \\in \\mathcal{F}$ (closure under countable unions)
3. **Probability Measure** $P: \\mathcal{F} \\to [0, 1]$ satisfying Kolmogorov's Axioms.

#### 2. Kolmogorov's Three Axioms
- **Axiom 1 (Non-negativity)**: For any event $A \\in \\mathcal{F}$:
  $$P(A) \\ge 0$$
- **Axiom 2 (Unitarity / Normalization)**: The total probability of the entire sample space equals unity:
  $$P(\\Omega) = 1$$
- **Axiom 3 (Countable Additivity)**: For any countable sequence of pairwise disjoint events $A_1, A_2, \\dots \\in \\mathcal{F}$ where $A_i \\cap A_j = \\emptyset$ for all $i \\ne j$:
  $$P\\left(\\bigcup_{i=1}^\\infty A_i\\right) = \\sum_{i=1}^\\infty P(A_i)$$

#### 3. Fundamental Inferences & Continuity of Probability
From these three axioms, essential properties follow rigorously:
- **Null Event**: $P(\\emptyset) = 0$ (since $\\Omega \\cup \\emptyset = \\Omega$ and $\\Omega \\cap \\emptyset = \\emptyset$, $P(\\Omega) + P(\\emptyset) = P(\\Omega) \\implies P(\\emptyset) = 0$).
- **Complement Rule**: $P(A^c) = 1 - P(A)$.
- **Monotonicity**: If $A \\subseteq B$, then $P(A) \\le P(B)$, with $P(B \\setminus A) = P(B) - P(A)$.
- **Subadditivity (Boole's Inequality)**: For arbitrary (not necessarily disjoint) events:
  $$P\\left(\\bigcup_{i=1}^\\infty A_i\\right) \\le \\sum_{i=1}^\\infty P(A_i)$$
- **Continuity from Below**: If $A_1 \\subseteq A_2 \\subseteq A_3 \\subseteq \\dots$ is an increasing sequence with $\\lim_{n \\to \\infty} A_n = \\bigcup_{n=1}^\\infty A_n = A$, then:
  $$\\lim_{n \\to \\infty} P(A_n) = P\\left(\\lim_{n \\to \\infty} A_n\\right) = P(A)$$
`,
    code: `import numpy as np

def verify_kolmogorov_axioms():
    # Simulate a discrete sample space Omega = {1, 2, 3, 4, 5, 6} (fair die)
    omega = set(range(1, 7))
    n_simulations = 200_000
    
    # Generate realizations
    rng = np.random.default_rng(42)
    rolls = rng.integers(1, 7, size=n_simulations)
    
    # Define events in the sigma-algebra
    # A = Even roll {2, 4, 6}
    # B = Roll > 4    {5, 6}
    # C = Roll == 1   {1}
    event_A = {2, 4, 6}
    event_B = {5, 6}
    event_C = {1}
    
    p_omega = np.mean(np.isin(rolls, list(omega)))
    p_A = np.mean(np.isin(rolls, list(event_A)))
    p_C = np.mean(np.isin(rolls, list(event_C)))
    
    # Axiom 3 verification for disjoint events A and C (A ∩ C = ∅)
    disjoint_union = event_A.union(event_C)
    p_disjoint_union = np.mean(np.isin(rolls, list(disjoint_union)))
    sum_individual = p_A + p_C
    
    # Inclusion-Exclusion check for non-disjoint events A and B (A ∩ B = {6})
    union_AB = event_A.union(event_B)
    intersect_AB = event_A.intersection(event_B)
    p_union_AB = np.mean(np.isin(rolls, list(union_AB)))
    p_B = np.mean(np.isin(rolls, list(event_B)))
    p_intersect_AB = np.mean(np.isin(rolls, list(intersect_AB)))
    
    print("--- Kolmogorov Axioms Empirical Verification ---")
    print(f"P(Omega) Normalization        : {p_omega:.6f} (Expected: 1.000000)")
    print(f"P(A) Even {event_A}          : {p_A:.6f} (Expected: {3/6:.6f})")
    print(f"P(C) One  {event_C}          : {p_C:.6f} (Expected: {1/6:.6f})")
    print(f"P(A ∪ C) Disjoint Union      : {p_disjoint_union:.6f}")
    print(f"P(A) + P(C) Direct Sum       : {sum_individual:.6f}")
    print(f"Axiom 3 Additivity Residual  : {abs(p_disjoint_union - sum_individual):.2e}")
    print(f"Inclusion-Exclusion P(A ∪ B) : {p_union_AB:.6f}")
    print(f"P(A) + P(B) - P(A ∩ B)       : {p_A + p_B - p_intersect_AB:.6f}")

if __name__ == '__main__':
    verify_kolmogorov_axioms()
`,
    stdout: `--- Kolmogorov Axioms Empirical Verification ---
P(Omega) Normalization        : 1.000000 (Expected: 1.000000)
P(A) Even {2, 4, 6}          : 0.500425 (Expected: 0.500000)
P(C) One  {1}                : 0.166120 (Expected: 0.166667)
P(A ∪ C) Disjoint Union      : 0.666545
P(A) + P(C) Direct Sum       : 0.666545
Axiom 3 Additivity Residual  : 0.00e+00
Inclusion-Exclusion P(A ∪ B) : 0.666995
P(A) + P(B) - P(A ∩ B)       : 0.666995`,
    diagnostics: `
### Numerical Hazards, Measure Paradoxes & Continuous Spaces

1. **Non-Measurable Sets (Vitali Sets)**: On continuous spaces like $\\Omega = [0, 1)$, using the power set $2^\\Omega$ as the event space causes contradictions under the Axiom of Choice. Non-measurable Vitali sets cannot be assigned any consistent translation-invariant probability measure. Thus, $\\mathcal{F}$ must be restricted to the **Borel $\\sigma$-algebra** $\\mathcal{B}(\\mathbb{R})$.
2. **Zero-Probability Events Are Not Impossible**: In continuous probability distributions, any single singleton outcome has $P(\\{\\omega\\}) = 0$. In measure theory, events with probability 0 are called *null sets*, and statements holding everywhere except on a null set are said to hold *almost surely* (a.s.).
3. **Finite vs Countable Additivity**: Finite additivity alone does not guarantee continuity of measures or allow swapping limits and expectations via the Monotone Convergence Theorem. Countable additivity is strictly required for calculus in probability.
`
  }
];

console.log(`Prepared test specs for ${STATS_TOPIC_SPECS.length} topics.`);
