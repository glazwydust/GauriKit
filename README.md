# GauriKit 2.0 — Child Safety & Critical Decision Telemetry Tool

**GauriKit 2.0** is an empirical, low-cortisol educational platform designed to empower children with critical thinking and situational safety decision-making skills. It rigorously measures children's decision-making across **6 cognitive dimensions** using an isomorphic Pre/Post experimental design with full support for **Individual Student Mode** and **Whole-Classroom Poll & Discussion Mode**.

---

## 🛡️ Core Highlights

- **Zero Fake Metrics (Empirical Integrity)**: Every score, progress bar, radar chart polygon, and cohort metric originates directly from actual recorded user choices. If no data has been collected yet, clean empty states are displayed instead of artificial placeholders.
- **True Mode Separation**:
  - **🧑‍🎓 Single Student Mode**: Individualized telemetry tracking Pre %, Post %, and Net Observed Change ($\Delta = \text{Post } \% - \text{Pre } \%$ percentage points).
  - **🏫 Whole-Classroom Discussion & Poll Mode**: Teacher-facilitated show-of-hands polling measuring whole-class safe consensus and collective decision shifts without fabricating individual student records.
- **Data-Driven Age Group Cohorts**: Calculates baseline and post-transfer averages strictly from stored participant records across `6-8 yrs`, `9-11 yrs`, and `12+ yrs`. Unrepresented age groups display an honest *"No participants recorded in this age group yet"* status.
- **12 Stories in a Slide-and-Pick Carousel**: children (or the teacher) slide, swipe, drag, use the arrow keys or the dots to choose *any* story first. No fixed order.
  1. Unexpected ride offer (authority lure) · 2. Online game friend · 3. Lost in the mall · 4. Secrets vs. surprises
  5. Puppy in the park (assistance lure) · 6. A knock at the door · 7. Crossing the busy road (look **right**-left-right, as traffic keeps left in India) · 8. The beeping alarm (fire/exit plan)
  9. The playground dare (Refuse / Explain / Avoid / Leave) · 10. Group-chat unkindness · 11. My Body, My Rules · 12. Who can pick you up (discriminating safe vs. unsafe adults)
- **Situation-Responsive SVG Environments**: school gate, digital study room, mall, living room, park, street with zebra crossing, home doorway.
- **Low-Cortisol Aesthetics**: Calming Marigold & Deep Pine palette, expressive SVG characters with dynamic emotions, and gentle procedural audio feedback via the **Web Audio API** (zero fear triggers or punitive buzzers).
- **Bilingual (English & Hindi / हिन्दी)**: Instant one-click toggle with native Devanagari typography.
- **5-Tab Educator & Researcher Analytics Hub**:
  1. 📊 **Overview & Stats**: Total participants, completed sessions, individual runs, classroom discussions, and average observed growth.
  2. 🧑‍🎓 **Individual Student Explorer**: Detailed single-participant breakdown with 6-skill meters, Strongest / Weakest skill classification, and Canvas Radar Chart.
  3. 🏫 **Classroom Discussion Analytics**: Class poll tallies, pre vs. post collective shift, and class session history.
  4. 👥 **Data-Driven Age Cohorts**: Real cohort aggregations computed from local records.
  5. 📁 **Master Session Records**: Confidential LocalStorage log with session deletion, history reset, and clean CSV / JSON exports.

---

## 🔬 Research Basis (what the wording and structure follow)

- **Active learning beats passive information** (Miltenberger et al., 2020; Seckinger-Bancroft; Wurtele). Every story makes the child *choose*, gives immediate feedback, and ends with a *"Practise saying it out loud"* line and a teacher role-play prompt (behavioural skills training: instruction, modelling, rehearsal, feedback).
- **NO – GO – TELL**: refuse or recognise the threat, move away, tell a trusted adult. Used as the key rule wherever it fits.
- **Three lure types** (authority, incentive, assistance) are all covered; stories also teach that *not every adult is tricky* (discrimination training).
- **Reporting is the hardest skill**: safe options always end with telling, and the guidance says to keep telling until someone listens and that it is never the child's fault.
- **Calm framing**: no scary outcomes, no blaming, no testing the stranger; the child's safe move is simple and rehearsable.
- **Multiple safe answers** for peer pressure (Refuse, Explain, Avoid, Leave) instead of one scripted phrase.


## 🧪 v2.1 Research Upgrades (what was added and why)

| Problem found | What the code now does | Research behind it |
| :--- | :--- | :--- |
| Scores only show what children *say* | **Behaviour Observation tab**: a trained adult runs a scripted role-play and ticks NO / GO / TELL and how much prompting was needed, at three time points | Verbal reports do not predict behaviour; only in situ assessment does |
| No control group | **Comparison group** option (Pre → Post with no stories) and a group-vs-group result with a 95% interval | Without a control, a rise may just be practice |
| Form B might be easier than Form A | **Counterbalanced forms**: Pre/Post form order alternates between children; question order shuffled; **item analysis** table flags unequal or too-easy items | Standard test design |
| A single child's Δ is noise | Dashboard shows the **reliable-change threshold** (about 40 points at 12 questions, 57 at 6) and uses **group means with 95% CI, effect size and % improved** | Small number of items = large measurement error |
| Uneven skill coverage | Every skill is tested by 4+ pairs (full) or 3+ (quick) | |
| Test too long for young children | **Quick (6) or Full (12)** length chosen at setup | Keep sessions short |
| Skills fade | **Follow-up check** (same child ID, weeks later) and a retention table; **Booster plan** for weakest skills | Booster sessions maintain skills |
| Telling is not practice | **“✅ I said it out loud”** rehearsal tick after each safe choice, plus first-try-safe rate per child | Behavioural skills training: rehearsal + feedback |
| Parents not involved | **Printable bilingual Family Safety Plan** (safe-word, meeting place, 3 trusted adults, talking points) | Parent involvement improves maintenance |

New files: `research.js` (statistics, form builder, observation scripts, booster logic), `scenarios_assess.js` (12 matched Pre/Post pairs).
CSV/JSON exports now include group, form order, length, first-try %, rehearsal count, follow-ups and observations.

## 🎨 v2.3 Design Refresh

| What | Where to edit |
|---|---|
| Colours, fonts, borders, shadows (the whole look) | `theme.css` (loads after `styles.css`; change the `--ink`, `--coral`, `--sun`, `--leaf`, `--sky`, `--pink`, `--lav` variables at the top) |
| Pastel background scene (rainbow, sun, hills) | `doodles.svg` |
| Welcome-form label ("School / Institution") | `index.html` and the `institutionLabel` key in `scenarios.js` |
| Short answer options | `scenarios.js`, `scenarios_more.js`, `scenarios_assess.js` |
| Results layout | `index.html` plus the `render...` functions in `engine.js` |

Fonts (Baloo 2 + Nunito) load from Google Fonts, so they need an internet connection.
The item-analysis table and the competencies grid were removed from the Results page. All research features (A/B forms, comparison group, follow-up, observations, confidence intervals, booster plan) are unchanged.

## ⚠️ Honest Limitations

- **The Pre/Post score measures what children *say* they would do (stated choices), not what they *would* do.** The research is clear that verbal or role-play answers do not reliably predict real behaviour; only in situ observation does. Report results as "change in stated safe choices".
- Pre and Post have **12 matched questions each** (one per story). A **Quick (6)** option exists for younger children but is noisier.
- With only 12 questions, one child's Δ moves in steps of about 8 points and is noisy. Use it for groups, not to judge one child.
- You still need to **run** a comparison group (set Group = Comparison) and the Observation checks; the software supports them but cannot do the fieldwork for you. 20+ children per group is a sensible minimum.
- Hindi text for stories 5–12 needs review by a native speaker; the *My Body, My Rules* story needs review by a teacher or child-protection professional; confirm the CHILDLINE 1098 helpline text for your region.
- Safety skills fade: plan booster sessions and involve parents.

---

## 🎯 6 Cognitive Safety Dimensions

| Skill Dimension | Description |
| :--- | :--- |
| **Risk Recognition** | Identifying incongruent requests, stranger red flags, and digital/physical hazards. |
| **Verification** | Validating unexpected claims with family safe-words or trusted school personnel. |
| **Help Seeking** | Identifying and approaching designated, in-uniform safe adults (cashiers, teachers, police). |
| **Boundary Setting** | Confidently asserting "No" and protecting bodily privacy, home details, and photos. |
| **Impulse Control** | Pausing to think rather than rushing into tempting offers (free toys, game pets, rides). |
| **Problem Solving** | Formulating calm, logical next steps under uncertain or separated conditions. |

---

## 📊 Mathematical Telemetry & Empirical Integrity

### 1. Observed Performance Calculations (Browser Engine)
- **Pre-Assessment Baseline**:
  $$\text{Pre } \% = \left(\frac{\text{Appropriate Pre Decisions}}{\text{Total Pre Questions}}\right) \times 100$$
- **Post-Assessment Transfer**:
  $$\text{Post } \% = \left(\frac{\text{Appropriate Post Decisions}}{\text{Total Post Questions}}\right) \times 100$$
- **Observed Net Change ($\Delta$)**:
  $$\Delta = \text{Post } \% - \text{Pre } \% \quad (\text{expressed in percentage points})$$
  *(Example: Pre = 50%, Post = 75% $\rightarrow$ Net Change = $+25$ percentage points).*

**How the assessment is built (v2.1)**
- **12 matched pairs.** `pre_N` and `post_N` test the same skill in a different story (e.g. pre: puppy in the park → post: phone dropped in an alley), so the child cannot just remember the answer.
- **One safe, two unsafe answers per question.** One unsafe answer is tempting; the other is *almost safe* (says no but never tells), so the TELL step is really tested.
- **Choices are shuffled** every session, so "the safe one is always B / the longest" cannot be learnt.
- **Each question tests 3 skills** (`tests` field). A safe answer earns only those skills.

**Skill meters:** for a skill *k*, `skill % = safe answers on questions that test k ÷ questions that test k`, computed separately for pre and post. Skill Δ = post − pre.

### 2. Classroom Show-of-Hands Poll Metrics
- **Classroom Pre Safe Ratio**:
  $$\text{Class Pre } \% = \frac{\sum \text{Safe Votes in Pre}}{\sum \text{Total Votes in Pre}} \times 100$$
- **Classroom Post Safe Ratio**:
  $$\text{Class Post } \% = \frac{\sum \text{Safe Votes in Post}}{\sum \text{Total Votes in Post}} \times 100$$
- **Classroom Consensus Shift ($\Delta$)**:
  $$\Delta_{\text{class}} = \text{Class Post } \% - \text{Class Pre } \% \quad (\text{expressed in percentage points})$$

### 3. Cognitive Modeling (Python `student_brain.py`)
- Implements standalone **Bayesian Knowledge Tracing (BKT)**:
  $$P(L_{t+1}) = P(L_t \mid \text{Evidence}) + (1 - P(L_t \mid \text{Evidence})) \times P(T) \times \text{Latency Modifier}$$
- Clear pedagogical distinction between **Raw Observed Scores** and **Model-Estimated Latent Mastery $P(L)$**.

---

## 🚀 How to Run Locally

### Method 1: Double-Click
Simply open `index.html` directly in Chrome, Edge, Firefox, or Safari.

### Method 2: Local Web Server
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

### Method 3: Run the Python Cognitive Simulator
```bash
python student_brain.py
```

---

## 📁 Project Structure

(New in v2.3: `theme.css`, `doodles.svg`)

```
gaurikit2.0/
├── index.html        # Semantic viewports (Welcome, Pre-Test, story carousel Hub, Animated Stage, Post-Test, 5-Tab Dashboard)
├── styles.css        # Low-cortisol design system, SVG stage styling, tab system, responsive grid
├── scenarios.js     # Bilingual pedagogical dataset, first 4 learning scenarios, isomorphic transfer questions, qualitative age focus
├── scenarios_more.js # Stories 5-12 (loaded after scenarios.js)
├── scenarios_assess.js # 12 matched Pre/Post pairs (covers all 12 stories)
├── research.js       # Stats, counterbalanced forms, observation scripts, booster logic
├── engine.js         # Empirical telemetry engine, session manager, Web Audio synthesizer, Canvas radar chart, CSV/JSON exports
├── student_brain.py  # Standalone Python Bayesian Knowledge Tracing (BKT) engine & export file analyzer
└── README.md         # Documentation, research methodology, and mathematical definitions
```
