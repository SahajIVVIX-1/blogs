import fs from 'node:fs';
import path from 'node:path';
import { LP, assignDates, slugify, writePostFile } from './engine.mjs';

const phase = LP.find(p => p.n === 6);
const dates = assignDates(phase.from, phase.to, phase.topics.length);

console.log(`Building comprehensive curriculum generator for Phase 6: ${phase.name} (125 topics)...`);

// Seminal papers database for Phase 6
const PAPERS = {
  bernoulli: { title: "Ars Conjectandi (The Art of Conjecturing)", authors: ["Jacob Bernoulli"], year: 1713, arxiv: "https://archive.org/details/arsconjectandiop00bern" },
  bayes: { title: "An Essay towards solving a Problem in the Doctrine of Chances", authors: ["Thomas Bayes"], year: 1763, arxiv: "https://doi.org/10.1098/rstl.1763.0053" },
  laplace: { title: "Théorie analytique des probabilités", authors: ["Pierre-Simon Laplace"], year: 1812, arxiv: "https://archive.org/details/thorieanalytiqu00laplgoog" },
  poisson: { title: "Recherches sur la probabilité des jugements en matière criminelle", authors: ["Siméon Denis Poisson"], year: 1837, arxiv: "https://archive.org/details/recherchessurlap00pois" },
  kolmogorov: { title: "Grundbegriffe der Wahrscheinlichkeitsrechnung", authors: ["Andrey Kolmogorov"], year: 1933, arxiv: "https://archive.org/details/grundbegriffeder00kolm" },
  student: { title: "The Probable Error of a Mean", authors: ["William Sealy Gosset (Student)"], year: 1908, arxiv: "https://doi.org/10.2307/2331554" },
  fisher_mle: { title: "On the Mathematical Foundations of Theoretical Statistics", authors: ["Ronald A. Fisher"], year: 1922, arxiv: "https://doi.org/10.1098/rsta.1922.0009" },
  fisher_anova: { title: "Statistical Methods for Research Workers", authors: ["Ronald A. Fisher"], year: 1925, arxiv: "https://archive.org/details/statisticalmetho00fish" },
  neyman_pearson: { title: "On the Problem of the Most Efficient Tests of Statistical Hypotheses", authors: ["Jerzy Neyman", "Egon Pearson"], year: 1933, arxiv: "https://doi.org/10.1098/rsta.1933.0009" },
  rao: { title: "Information and the Accuracy Attainable in the Estimation of Statistical Parameters", authors: ["C. R. Rao"], year: 1945, arxiv: "https://doi.org/10.1007/978-1-4612-0919-5_16" },
  blackwell: { title: "Conditional Expectation and Unbiased Sequential Estimation", authors: ["David Blackwell"], year: 1947, arxiv: "https://doi.org/10.1214/aoms/1177730387" },
  shannon: { title: "A Mathematical Theory of Communication", authors: ["Claude E. Shannon"], year: 1948, arxiv: "https://doi.org/10.1002/j.1538-7305.1948.tb01338.x" },
  metropolis: { title: "Equation of State Calculations by Fast Computing Machines", authors: ["Nicholas Metropolis", "Arianna Rosenbluth", "Marshall Rosenbluth", "Augusta Teller", "Edward Teller"], year: 1953, arxiv: "https://doi.org/10.1063/1.1699114" },
  cox: { title: "Regression Models and Life-Tables", authors: ["David R. Cox"], year: 1972, arxiv: "https://doi.org/10.1111/j.2517-6161.1972.tb00899.x" },
  akaike: { title: "A New Look at the Statistical Model Identification", authors: ["Hirotugu Akaike"], year: 1974, arxiv: "https://doi.org/10.1109/TAC.1974.1100705" },
  schwarz: { title: "Estimating the Dimension of a Model", authors: ["Gideon Schwarz"], year: 1978, arxiv: "https://doi.org/10.1214/aos/1176344136" },
  efron: { title: "Bootstrap Methods: Another Look at the Jackknife", authors: ["Bradley Efron"], year: 1979, arxiv: "https://doi.org/10.1214/aos/1176344552" },
  benjamini: { title: "Controlling the False Discovery Rate: A Practical and Powerful Approach to Multiple Testing", authors: ["Yoav Benjamini", "Yosef Hochberg"], year: 1995, arxiv: "https://doi.org/10.1111/j.2517-6161.1995.tb02031.x" }
};

// Common authoritative sources
const SOURCES_COMMON = [
  { title: "MIT 18.05: Introduction to Probability and Statistics", url: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2014/", publisher: "MIT OpenCourseWare" },
  { title: "Stanford Statistics 200: Introduction to Statistical Inference", url: "https://web.stanford.edu/class/stats200/", publisher: "Stanford University" },
  { title: "SciPy Statistical Functions (scipy.stats)", url: "https://docs.scipy.org/doc/scipy/reference/stats.html", publisher: "SciPy Community" },
  { title: "All of Statistics: A Concise Course in Statistical Inference", url: "https://link.springer.com/book/10.1007/978-0-387-21736-9", publisher: "Larry Wasserman (Carnegie Mellon)" }
];

export function getStatsTopicDetails(topicIndex, topicTitle) {
  const step = topicIndex + 1;
  const tLower = topicTitle.toLowerCase();

  // Determine subfield & theme
  let subfield = "Probability Theory";
  let paper = PAPERS.kolmogorov;
  let tags = ["probability", "statistics", "data-science", "mathematics"];

  if (step <= 15) {
    subfield = "Combinatorics & Foundational Probability";
    tags.push("combinatorics", "foundations");
    if (tLower.includes("bayes")) paper = PAPERS.bayes;
    else if (tLower.includes("combinator")) paper = PAPERS.bernoulli;
    else if (tLower.includes("entropy")) paper = PAPERS.shannon;
    else paper = PAPERS.kolmogorov;
  } else if (step <= 35) {
    subfield = "Discrete Random Variables & Distributions";
    tags.push("discrete-distributions", "random-variables");
    if (tLower.includes("poisson")) paper = PAPERS.poisson;
    else if (tLower.includes("binomial") || tLower.includes("bernoulli")) paper = PAPERS.bernoulli;
    else paper = PAPERS.kolmogorov;
  } else if (step <= 55) {
    subfield = "Continuous Random Variables & Distributions";
    tags.push("continuous-distributions", "gaussian", "multivariate");
    if (tLower.includes("student") || tLower.includes("t-distribution")) paper = PAPERS.student;
    else if (tLower.includes("normal") || tLower.includes("gaussian")) paper = PAPERS.laplace;
    else if (tLower.includes("chi-square") || tLower.includes("f-distribution")) paper = PAPERS.fisher_anova;
    else paper = PAPERS.laplace;
  } else if (step <= 75) {
    subfield = "Limit Theorems & Concentration Inequalities";
    tags.push("limit-theorems", "asymptotics", "clt");
    paper = PAPERS.laplace;
  } else if (step <= 100) {
    subfield = "Statistical Estimation & Inference";
    tags.push("estimation", "mle", "bayesian-inference");
    if (tLower.includes("mle") || tLower.includes("likelihood") || tLower.includes("fisher information")) paper = PAPERS.fisher_mle;
    else if (tLower.includes("cramer-rao") || tLower.includes("crlb") || tLower.includes("rao-blackwell")) paper = PAPERS.rao;
    else if (tLower.includes("bootstrap")) paper = PAPERS.efron;
    else if (tLower.includes("mcmc") || tLower.includes("metropolis") || tLower.includes("gibbs")) paper = PAPERS.metropolis;
    else if (tLower.includes("survival") || tLower.includes("cox")) paper = PAPERS.cox;
    else paper = PAPERS.fisher_mle;
  } else {
    subfield = "Hypothesis Testing & Statistical Modeling";
    tags.push("hypothesis-testing", "regression", "inference");
    if (tLower.includes("neyman-pearson")) paper = PAPERS.neyman_pearson;
    else if (tLower.includes("anova") || tLower.includes("fisher")) paper = PAPERS.fisher_anova;
    else if (tLower.includes("t-test")) paper = PAPERS.student;
    else if (tLower.includes("benjamini") || tLower.includes("fdr")) paper = PAPERS.benjamini;
    else if (tLower.includes("aic") || tLower.includes("bic")) paper = PAPERS.akaike;
    else paper = PAPERS.fisher_anova;
  }

  return { subfield, paper, tags };
}

