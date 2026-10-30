/**
 * GauriKit - research.js
 * Pure helper functions that put the research findings into code.
 * No DOM access here, so it is easy to test.
 *
 *  1. Test forms: counterbalanced A/B order, quick (6) or full (12) length, shuffled question order
 *  2. Statistics: mean change with 95% confidence interval, effect size, group comparison (Welch)
 *  3. Reliable-change threshold: how big must ONE child's change be before it is not just noise
 *  4. Behaviour-observation scripts (role-play) scored as NO - GO - TELL
 *  5. Booster suggestions: which stories to revisit for a child's weakest skills
 */
const GauriResearch = (function () {
  const QUICK_PAIRS = [1, 3, 6, 7, 9, 12];            // 6 pairs, every skill tested 3+ times
  const ALL_PAIRS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /**
   * Build the Pre and Post question lists for one child.
   * Form A = the "pre_" items, Form B = the "post_" items. They are matched pairs.
   * order "AB": Pre uses Form A, Post uses Form B.   order "BA": the reverse.
   * Alternating the order across children stops "Form B is easier" from looking like learning.
   */
  function buildForms(length, order) {
    const pairs = length === "quick" ? QUICK_PAIRS : ALL_PAIRS;
    const pick = (list) => shuffle(list.filter(q => pairs.includes(q.pair)));
    const A = pick(GAURI_DATA.preAssessment);
    const B = pick(GAURI_DATA.postAssessment);
    return order === "BA" ? { pre: B, post: A } : { pre: A, post: B };
  }

  // ---------------- statistics ----------------
  const T95 = [NaN, 12.706, 4.303, 3.182, 2.776, 2.571, 2.447, 2.365, 2.306, 2.262, 2.228, 2.201, 2.179, 2.160,
    2.145, 2.131, 2.120, 2.110, 2.101, 2.093, 2.086, 2.080, 2.074, 2.069, 2.064, 2.060, 2.056, 2.052, 2.048, 2.045, 2.042];
  function tCrit(df) {
    if (!(df >= 1)) return NaN;
    df = Math.floor(df);
    if (df <= 30) return T95[df];
    if (df <= 60) return 2.0;
    return 1.98;
  }

  function mean(v) { return v.reduce((a, b) => a + b, 0) / v.length; }
  function sd(v) {
    if (v.length < 2) return NaN;
    const m = mean(v);
    return Math.sqrt(v.reduce((a, b) => a + (b - m) * (b - m), 0) / (v.length - 1));
  }

  /** Mean, SD, 95% CI of a list of numbers (e.g. each child's change in percentage points). */
  function summarise(values) {
    const n = values.length;
    if (n === 0) return { n: 0 };
    const m = mean(values);
    if (n < 2) return { n, mean: m, sd: NaN, se: NaN, lo: NaN, hi: NaN, dz: NaN };
    const s = sd(values);
    const se = s / Math.sqrt(n);
    const t = tCrit(n - 1);
    return { n, mean: m, sd: s, se, lo: m - t * se, hi: m + t * se, dz: s > 0 ? m / s : NaN };
  }

  /** Difference between two groups' mean change, with a Welch 95% CI. */
  function compareGroups(a, b) {
    if (a.length < 2 || b.length < 2) return null;
    const ma = mean(a), mb = mean(b), va = Math.pow(sd(a), 2), vb = Math.pow(sd(b), 2);
    const se2 = va / a.length + vb / b.length;
    const se = Math.sqrt(se2);
    const df = se2 === 0 ? a.length + b.length - 2 :
      (se2 * se2) / ((Math.pow(va / a.length, 2) / (a.length - 1)) + (Math.pow(vb / b.length, 2) / (b.length - 1)));
    const t = tCrit(df);
    const diff = ma - mb;
    return { diff, se, df, lo: diff - t * se, hi: diff + t * se };
  }

  /**
   * How large must ONE child's change be to be more than guessing noise?
   * A child's score on n questions is a proportion; the difference of two proportions has
   * SD <= sqrt(2 * 0.25 / n) (worst case p = .5). Two-sided 95% => 1.96 * that, in percentage points.
   */
  function reliableChange(n) {
    if (!n) return null;
    return Math.round(1.96 * Math.sqrt(0.5 / n) * 100);
  }

  // ---------------- learning stories <-> skills ----------------
  function storySkills(storyId) {
    const n = parseInt(String(storyId).split("_")[1], 10);
    return (GAURI_DATA.assessmentTests && GAURI_DATA.assessmentTests[n]) || [];
  }

  /** Stories to revisit: those that train the child's weakest skills (below 75%), most overlap first. */
  function boosterStories(skillAnalysis, max) {
    const weak = Object.keys(skillAnalysis || {})
      .filter(k => (skillAnalysis[k].post_pct || 0) < 75)
      .sort((a, b) => skillAnalysis[a].post_pct - skillAnalysis[b].post_pct);
    if (!weak.length) return { weak: [], stories: [] };
    const scored = GAURI_DATA.learningScenarios.map(s => {
      const sk = storySkills(s.id);
      const overlap = sk.filter(k => weak.includes(k)).length;
      return { story: s, overlap };
    }).filter(x => x.overlap > 0).sort((a, b) => b.overlap - a.overlap);
    return { weak, stories: scored.slice(0, max || 3).map(x => x.story) };
  }

  // ---------------- behaviour observation (in situ / role-play) ----------------
  // Research: what children SAY does not predict what they DO. Only watching behaviour in a
  // realistic (simulated) situation does. A trained adult plays the situation; the facilitator ticks
  // what the child did ON THEIR OWN. Same script each time = same test every time.
  const OBS_SITUATIONS = [
    { id: "ride_offer", en: "Ride offer (authority lure)", script_en: "Adult (not known to the child, school staff present nearby): 'Your mum asked me to pick you up. Hop in the car!'",
      no_en: "Refused / said they must check first", go_en: "Walked away towards school or a safe adult", tell_en: "Told the teacher / trusted adult" },
    { id: "puppy", en: "Lost puppy (assistance lure)", script_en: "Adult: 'My puppy ran away behind the shop. Come help me find her, it'll only take a minute!'",
      no_en: "Said they can't / must ask a grown-up", go_en: "Stayed in view of / moved to a trusted adult", tell_en: "Told a trusted adult what happened" },
    { id: "door", en: "Knock at the door", script_en: "Facilitator knocks on a classroom door: 'Open up, I have a delivery for your family!'",
      no_en: "Did not open the door", go_en: "Went to a trusted adult", tell_en: "Told the adult someone is at the door" },
    { id: "pickup", en: "Different pick-up", script_en: "Adult: 'Your uncle is busy today, I'll take you home instead.'",
      no_en: "Refused to go", go_en: "Stayed with / went to the teacher", tell_en: "Told the teacher so parents could be called" },
    { id: "online", en: "Online personal-info request", script_en: "On a practice tablet or paper chat, a message says: 'You're so good! What's your full name and address?'",
      no_en: "Did not give personal details", go_en: "Stopped replying / closed the chat", tell_en: "Told a trusted adult" },
    { id: "body_secret", en: "'It's our secret' (body-safety)", script_en: "Use a puppet or picture card only. Never act this out with a real adult touching a child. Puppet says: 'Let's play a special game. Don't tell anyone.'",
      no_en: "Said 'No, I don't like that'", go_en: "Moved away to a trusted adult", tell_en: "Told a trusted adult" }
  ];

  const OBS_TIMEPOINTS = [
    { id: "before", en: "Before the stories (baseline)" },
    { id: "after", en: "Right after the stories" },
    { id: "followup", en: "Follow-up (weeks later)" }
  ];

  const OBS_PROMPT_LEVELS = [
    { id: "independent", en: "On their own (no prompt)" },
    { id: "one_prompt", en: "After one prompt" },
    { id: "many_prompts", en: "Needed several prompts / help" }
  ];

  return {
    QUICK_PAIRS, ALL_PAIRS, buildForms, shuffle,
    summarise, compareGroups, reliableChange, tCrit,
    storySkills, boosterStories,
    OBS_SITUATIONS, OBS_TIMEPOINTS, OBS_PROMPT_LEVELS
  };
})();
