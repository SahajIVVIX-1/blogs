import { LP, assignDates } from './engine.mjs';
import { renderPostMarkdown } from './render-helper.mjs';
import { STATS_TOPIC_SPECS } from './phase-06-stats.mjs';

const phaseData = LP.find(p => p.n === 6);
const dates = assignDates(phaseData.from, phaseData.to, phaseData.topics.length);

for (const spec of STATS_TOPIC_SPECS) {
  const post = renderPostMarkdown(spec, dates[spec.step - 1], 6, phaseData.name);
  const words = post.body.trim().split(/\s+/).length;
  console.log(`Step ${spec.step}: "${spec.topic.slice(0, 40)}..." -> ${words} words`);
}
