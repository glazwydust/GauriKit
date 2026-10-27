# GauriKit 2.0 — Child Safety & Critical Decision Telemetry Tool

**GauriKit 2.0** is an empirical, low-cortisol educational platform designed to empower children with critical thinking and situational safety decision-making skills. It rigorously measures children's decision-making across **6 cognitive dimensions** using an isomorphic Pre/Post experimental design with full support for **Individual Student Mode** and **Whole-Classroom Poll & Discussion Mode**.

---

## 🛡️ Core Highlights

- **Zero Fake Metrics (Empirical Integrity)**: Every score, progress bar, radar chart polygon, and cohort metric originates directly from actual recorded user choices. If no data has been collected yet, clean empty states are displayed instead of artificial placeholders.
- **True Mode Separation**:
  - **🧑‍🎓 Single Student Mode**: Individualized telemetry tracking Pre %, Post %, and Net Observed Change ($\Delta = \text{Post } \% - \text{Pre } \%$ percentage points).
  - **🏫 Whole-Classroom Discussion & Poll Mode**: Teacher-facilitated show-of-hands polling measuring whole-class safe consensus and collective decision shifts without fabricating individual student records.
- **Data-Driven Age Group Cohorts**: Calculates baseline and post-transfer averages strictly from stored participant records across `6-8 yrs`, `9-11 yrs`, and `12+ yrs`. Unrepresented age groups display an honest *"No participants recorded in this age group yet"* status.
- **Situation-Responsive SVG Environments**:
  - 🏫 *School Gate & Road* (Vehicle & Ride Verification)
  - 💻 *Digital Study Room & Tablet* (Online Gaming & Privacy Defense)
  - 🏬 *Shopping Mall Atrium* (Public Separation & Help Seeking)
  - 🛋️ *Home Living Room* (Secrets vs. Surprises)
- **Low-Cortisol Aesthetics**: Calming Marigold & Deep Pine palette, expressive SVG characters with dynamic emotions, and gentle procedural audio feedback via the **Web Audio API** (zero fear triggers or punitive buzzers).
- **Bilingual (English & Hindi / हिन्दी)**: Instant one-click toggle with native Devanagari typography.
- **5-Tab Educator & Researcher Analytics Hub**:
  1. 📊 **Overview & Stats**: Total participants, completed sessions, individual runs, classroom discussions, and average observed growth.
  2. 🧑‍🎓 **Individual Student Explorer**: Detailed single-participant breakdown with 6-skill meters, Strongest / Weakest skill classification, and Canvas Radar Chart.
  3. 🏫 **Classroom Discussion Analytics**: Class poll tallies, pre vs. post collective shift, and class session history.
  4. 👥 **Data-Driven Age Cohorts**: Real cohort aggregations computed from local records.
  5. 📁 **Master Session Records**: Confidential LocalStorage log with session deletion, history reset, and clean CSV / JSON exports.

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

```
gaurikit2.0/
├── index.html        # Semantic viewports (Welcome, Pre-Test, Hub, Animated Stage, Post-Test, 5-Tab Dashboard)
├── styles.css        # Low-cortisol design system, SVG stage styling, tab system, responsive grid
├── scenarios.js     # Bilingual pedagogical dataset, 4 learning scenarios, isomorphic transfer questions, qualitative age focus
├── engine.js         # Empirical telemetry engine, session manager, Web Audio synthesizer, Canvas radar chart, CSV/JSON exports
├── student_brain.py  # Standalone Python Bayesian Knowledge Tracing (BKT) engine & export file analyzer
└── README.md         # Documentation, research methodology, and mathematical definitions
```
