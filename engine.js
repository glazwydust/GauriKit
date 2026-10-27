/**
 * GAURIKIT CORE ENGINE (v3.0 - Empirical & Polished)
 * -----------------------------------------------------------------------------
 * 1. Strict Empirical Calculations (Zero fake fallback metrics / hardcoded scores).
 * 2. True Separation of Individual Student Mode vs. Classroom Discussion Mode.
 * 3. Data-Driven Age-Group Cohort Aggregation with clean "No Data" empty states.
 * 4. Situation-Responsive Rich SVG Backdrops (School, Digital Room, Mall, Living Room).
 * 5. Robust LocalStorage Session Persistence with Session IDs & Double-Click Protection.
 * 6. Multi-tab Researcher / Educator Analytics Hub with Clean CSV/JSON Export.
 * 7. Low-Cortisol Sound Synthesizer & Animated Expressive SVG Characters.
 */

const GauriEngine = (function () {
  // LocalStorage Key
  const STORAGE_KEY_SESSIONS = "gaurikit_master_sessions_v3";

  // Application State
  const state = {
    lang: "en",
    mode: "individual", // "individual" | "classroom"
    soundEnabled: true,
    institution: "Fellowship Pilot School",
    participantId: "C-101",
    ageGroup: "6-8", // "6-8" | "9-11" | "12+"
    currentScreen: "welcome",
    currentTab: "overview", // "overview" | "individual" | "classroom" | "age_cohorts" | "master_roster"
    
    // Active Session Meta
    sessionId: null,
    startedAt: null,
    isSessionFinalized: false,
    isProcessingClick: false, // Double-click debounce lock
    
    // Raw Recorded Responses
    preIndex: 0,
    preResponses: [], // Array of response objects
    
    completedStories: new Set(),
    activeStory: null,
    activeChoice: null,
    learningResponses: [],
    
    postIndex: 0,
    postResponses: [], // Array of response objects
    
    // Classroom Show-of-Hands Voting State
    currentVotes: {}, // { choiceId: count }
    classroomPreVotes: {}, // { [questionId]: { [choiceId]: count } }
    classroomPostVotes: {}, // { [questionId]: { [choiceId]: count } }

    // Selected Session for Individual Explorer in Dashboard
    selectedSessionId: null
  };

  // Web Audio API Synthesizer (Calming, Low-Cortisol Tones)
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function playTone(freq, duration, type = "sine", gainVal = 0.12) {
    if (!state.soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio feedback notice:", e);
    }
  }

  function playClick() {
    playTone(480, 0.06, "sine", 0.08);
  }

  function playSuccess() {
    playTone(523.25, 0.15, "sine", 0.12);
    setTimeout(() => playTone(659.25, 0.20, "sine", 0.14), 90);
    setTimeout(() => playTone(783.99, 0.30, "sine", 0.15), 180);
  }

  function playReflect() {
    playTone(392.00, 0.22, "sine", 0.10);
    setTimeout(() => playTone(349.23, 0.30, "sine", 0.10), 130);
  }

  function playGentleChime() {
    playTone(329.63, 0.25, "sine", 0.12);
    setTimeout(() => playTone(392.00, 0.25, "sine", 0.12), 110);
    setTimeout(() => playTone(523.25, 0.35, "sine", 0.12), 220);
  }

  function toggleAudio() {
    state.soundEnabled = !state.soundEnabled;
    const icon = document.getElementById("audio-icon");
    if (icon) {
      icon.textContent = state.soundEnabled ? "🔊" : "🔇";
    }
    if (state.soundEnabled) playClick();
  }

  function celebrateMascot(event, el) {
    if (event && event.stopPropagation) event.stopPropagation();
    playGentleChime();
    const target = el || document.querySelector(".mascot-badge") || document.querySelector(".hero-mascot-ring");
    if (target) {
      target.classList.remove("gauri-cheer");
      void target.offsetWidth;
      target.classList.add("gauri-cheer");
      setTimeout(() => {
        target.classList.remove("gauri-cheer");
      }, 700);
    }
  }

  // Navigation Controller
  function navigate(screenName) {
    playClick();
    state.currentScreen = screenName;
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    
    const target = document.getElementById(`screen-${screenName}`);
    if (target) {
      target.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (screenName === "hub") {
      renderHub();
    } else if (screenName === "dashboard") {
      renderDashboard();
    }
  }

  // Language Localization
  function toggleLanguage() {
    state.lang = state.lang === "en" ? "hi" : "en";
    playClick();
    document.body.classList.toggle("lang-hi", state.lang === "hi");
    
    const langLabel = document.getElementById("lang-label");
    if (langLabel) {
      langLabel.textContent = state.lang === "en" ? "हिन्दी" : "English";
    }

    applyI18n();

    // Re-render active view
    if (state.currentScreen === "pre-assessment") renderPreQuestion();
    if (state.currentScreen === "hub") renderHub();
    if (state.currentScreen === "game") renderGameStage();
    if (state.currentScreen === "post-assessment") renderPostQuestion();
    if (state.currentScreen === "dashboard") renderDashboard();
  }

  function applyI18n() {
    const dict = GAURI_DATA.i18n[state.lang];
    if (!dict) return;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });
  }

  // Facilitation Mode Selector (Individual vs Whole Classroom)
  function setMode(mode) {
    state.mode = mode;
    playClick();
    
    const classBtn = document.getElementById("mode-classroom-btn");
    const singleBtn = document.getElementById("mode-single-btn");
    if (classBtn && singleBtn) {
      classBtn.classList.toggle("active", mode === "classroom");
      singleBtn.classList.toggle("active", mode === "individual");
    }

    const input = document.getElementById("participant-id");
    if (input) {
      if (mode === "classroom" && input.value.startsWith("C-")) {
        input.value = "CLASS-4A";
        state.participantId = "CLASS-4A";
      } else if (mode === "individual" && input.value.startsWith("CLASS-")) {
        input.value = "C-101";
        state.participantId = "C-101";
      }
    }
  }

  // Age Group Selector
  function setAgeGroup(group) {
    state.ageGroup = group;
    playClick();
    document.querySelectorAll("#age-pill-group .pill-choice").forEach(btn => {
      const ageVal = btn.getAttribute("data-age");
      btn.classList.toggle("active", ageVal === group);
    });
  }

  function generateRandomId() {
    playClick();
    const randNum = Math.floor(100 + Math.random() * 900);
    const input = document.getElementById("participant-id");
    if (input) {
      input.value = state.mode === "classroom" ? `CLASS-${randNum}` : `C-${randNum}`;
      state.participantId = input.value;
    }
  }

  // Start Assessment Journey
  function startJourney() {
    initAudio();
    
    const idInput = document.getElementById("participant-id");
    if (idInput && idInput.value.trim()) {
      state.participantId = idInput.value.trim();
    }
    
    const instInput = document.getElementById("institution-name");
    if (instInput && instInput.value.trim()) {
      state.institution = instInput.value.trim();
    }

    // Initialize Unique Session ID
    state.sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    state.startedAt = new Date().toISOString();
    state.isSessionFinalized = false;

    // Reset session responses
    state.preIndex = 0;
    state.preResponses = [];
    state.completedStories = new Set();
    state.activeStory = null;
    state.activeChoice = null;
    state.learningResponses = [];
    state.postIndex = 0;
    state.postResponses = [];
    state.classroomPreVotes = {};
    state.classroomPostVotes = {};

    navigate("pre-assessment");
    renderPreQuestion();
  }

  // =========================================================================
  // PRE-ASSESSMENT FLOW
  // =========================================================================
  function renderPreQuestion() {
    const q = GAURI_DATA.preAssessment[state.preIndex];
    if (!q) {
      navigate("hub");
      return;
    }

    const stepEl = document.getElementById("pre-step-num");
    if (stepEl) stepEl.textContent = state.preIndex + 1;
    
    const iconEl = document.getElementById("pre-icon");
    if (iconEl) iconEl.textContent = q.icon;

    const titleEl = document.getElementById("pre-title");
    if (titleEl) titleEl.textContent = state.lang === "en" ? q.title_en : q.title_hi;

    const storyEl = document.getElementById("pre-story");
    if (storyEl) storyEl.textContent = state.lang === "en" ? q.story_en : q.story_hi;

    const pollBanner = document.getElementById("pre-poll-banner");
    const confirmBox = document.getElementById("pre-class-confirm-box");
    if (pollBanner) pollBanner.style.display = state.mode === "classroom" ? "flex" : "none";
    if (confirmBox) confirmBox.classList.toggle("hidden", state.mode !== "classroom");

    // Initialize voting counters for this question
    state.currentVotes = {};
    q.choices.forEach(c => { state.currentVotes[c.id] = 0; });

    const list = document.getElementById("pre-choices-list");
    if (!list) return;
    list.innerHTML = "";

    q.choices.forEach((c, idx) => {
      const row = document.createElement("div");
      row.className = "choice-row-wrapper card-pop";
      row.style.animationDelay = `${idx * 0.08}s`;

      const badgeLetter = String.fromCharCode(65 + idx);
      const text = state.lang === "en" ? c.text_en : c.text_hi;

      if (state.mode === "classroom") {
        row.innerHTML = `
          <button class="choice-content-btn" onclick="GauriEngine.incrementVote('${c.id}')" aria-label="Option ${badgeLetter}">
            <span class="choice-badge">${badgeLetter}</span>
            <span class="choice-text">${escapeHtml(text)}</span>
          </button>
          <div class="vote-counter-box">
            <button class="vote-btn" onclick="GauriEngine.decrementVote('${c.id}')" title="Minus 1 hand" aria-label="Decrease count">-</button>
            <span class="vote-count-num" id="vote-count-${c.id}">0</span>
            <button class="vote-btn" onclick="GauriEngine.incrementVote('${c.id}')" title="Plus 1 hand" aria-label="Increase count">+</button>
          </div>
        `;
      } else {
        row.innerHTML = `
          <button class="choice-content-btn" onclick="GauriEngine.onPreChoiceSelect('${c.id}')" aria-label="Select option ${badgeLetter}">
            <span class="choice-badge">${badgeLetter}</span>
            <span class="choice-text">${escapeHtml(text)}</span>
          </button>
        `;
      }

      list.appendChild(row);
    });
  }

  function incrementVote(choiceId) {
    playClick();
    state.currentVotes[choiceId] = (state.currentVotes[choiceId] || 0) + 1;
    const el = document.getElementById(`vote-count-${choiceId}`);
    if (el) el.textContent = state.currentVotes[choiceId];
  }

  function decrementVote(choiceId) {
    playClick();
    if ((state.currentVotes[choiceId] || 0) > 0) {
      state.currentVotes[choiceId]--;
      const el = document.getElementById(`vote-count-${choiceId}`);
      if (el) el.textContent = state.currentVotes[choiceId];
    }
  }

  function confirmPreClassVote() {
    if (state.isProcessingClick) return;
    state.isProcessingClick = true;
    setTimeout(() => { state.isProcessingClick = false; }, 300);

    const q = GAURI_DATA.preAssessment[state.preIndex];
    if (!q) return;

    // Record classroom poll tally
    state.classroomPreVotes[q.id] = { ...state.currentVotes };

    // Record collective response
    const totalVotes = Object.values(state.currentVotes).reduce((a, b) => a + b, 0);
    const safeChoice = q.choices.find(c => c.isSafe);
    const safeVotes = safeChoice ? (state.currentVotes[safeChoice.id] || 0) : 0;

    state.preResponses.push({
      response_id: `resp_pre_${Date.now()}_${state.preIndex}`,
      question_id: q.id,
      category: q.category,
      mode: "classroom",
      vote_distribution: { ...state.currentVotes },
      total_votes: totalVotes,
      safe_votes: safeVotes,
      safe_ratio: totalVotes > 0 ? (safeVotes / totalVotes) : 0,
      timestamp: new Date().toISOString()
    });

    state.preIndex++;
    if (state.preIndex < GAURI_DATA.preAssessment.length) {
      renderPreQuestion();
    } else {
      playGentleChime();
      navigate("hub");
    }
  }

  function onPreChoiceSelect(choiceId) {
    if (state.isProcessingClick) return;
    state.isProcessingClick = true;
    setTimeout(() => { state.isProcessingClick = false; }, 300);

    playClick();
    const q = GAURI_DATA.preAssessment[state.preIndex];
    if (!q) return;

    const choice = q.choices.find(c => c.id === choiceId) || q.choices[0];

    // Record pure raw response without applying artificial boosts
    state.preResponses.push({
      response_id: `resp_pre_${Date.now()}_${state.preIndex}`,
      question_id: q.id,
      category: q.category,
      mode: "individual",
      selected_choice_id: choice.id,
      selected_text: choice.text_en,
      is_safe: choice.isSafe === true,
      skills_awarded: { ...choice.skills },
      timestamp: new Date().toISOString()
    });

    state.preIndex++;
    if (state.preIndex < GAURI_DATA.preAssessment.length) {
      renderPreQuestion();
    } else {
      playGentleChime();
      navigate("hub");
    }
  }

  // =========================================================================
  // SCENARIO SELECTION HUB
  // =========================================================================
  function renderHub() {
    const grid = document.getElementById("scenario-cards-grid");
    if (!grid) return;
    grid.innerHTML = "";

    GAURI_DATA.learningScenarios.forEach((story, idx) => {
      const isCompleted = state.completedStories.has(story.id);
      const card = document.createElement("div");
      card.className = `story-card card-pop ${isCompleted ? "completed" : ""}`;
      card.style.animationDelay = `${idx * 0.08}s`;

      const tag = state.lang === "en" ? story.tag_en : story.tag_hi;
      const title = state.lang === "en" ? story.title_en : story.title_hi;
      const desc = state.lang === "en" ? story.desc_en : story.desc_hi;
      const statusText = isCompleted 
        ? (state.lang === "en" ? "✓ Completed" : "✓ पूर्ण")
        : (state.lang === "en" ? "Explore Story ➔" : "कहानी शुरू करें ➔");

      card.innerHTML = `
        <div class="story-icon">${story.icon}</div>
        <div class="story-tag">${escapeHtml(tag)}</div>
        <h3 class="story-title">${escapeHtml(title)}</h3>
        <p class="story-desc">${escapeHtml(desc)}</p>
        <div class="story-status-badge">
          <span>${isCompleted ? "⭐" : "👉"}</span>
          <span>${escapeHtml(statusText)}</span>
        </div>
      `;

      card.onclick = () => openStory(story);
      grid.appendChild(card);
    });

    const postBtn = document.getElementById("proceed-post-btn");
    if (postBtn) {
      postBtn.style.display = "inline-flex";
    }
  }

  // =========================================================================
  // INTERACTIVE ANIMATED GAME STAGE
  // =========================================================================
  function openStory(story) {
    state.activeStory = story;
    state.activeChoice = null;
    navigate("game");
    renderGameStage();
  }

  function renderGameStage() {
    const story = state.activeStory;
    if (!story) return;

    const titleEl = document.getElementById("game-scenario-title");
    if (titleEl) titleEl.textContent = state.lang === "en" ? story.title_en : story.title_hi;

    // Location Pill Badge in Scene
    const locIcon = document.getElementById("env-loc-icon");
    const locText = document.getElementById("env-loc-text");
    if (locIcon && locText) {
      const locMap = {
        school: { icon: "🏫", en: "School Safety Zone", hi: "विद्यालय सुरक्षा परिसर" },
        room: { icon: "💻", en: "Digital Space & Home", hi: "डिजिटल कक्ष एवं घर" },
        mall: { icon: "🛍️", en: "Public Atrium & Mall", hi: "सार्वजनिक मॉल" },
        living_room: { icon: "🛋️", en: "Living Room Space", hi: "बैठक कक्ष" }
      };
      const curLoc = locMap[story.env] || { icon: "📍", en: "Story Scene", hi: "घटना स्थल" };
      locIcon.textContent = curLoc.icon;
      locText.textContent = state.lang === "en" ? curLoc.en : curLoc.hi;
    }
    
    // 1. Render rich situation-responsive SVG environment backdrop
    renderEnvironmentBackdrop(story.env);

    // 2. Render Left Character & Child Actor
    renderLeftActorSVG(story.actorLeft);
    renderChildActorSVG("neutral");

    // 3. Nametags & Dialogues
    const nameLeft = document.getElementById("nametag-left");
    if (nameLeft) nameLeft.textContent = state.lang === "en" ? story.nametagLeft_en : story.nametagLeft_hi;

    const speakerTagLeft = document.getElementById("bubble-speaker-left");
    if (speakerTagLeft) speakerTagLeft.textContent = `🗣️ ${state.lang === "en" ? story.nametagLeft_en : story.nametagLeft_hi}`;

    const bubbleLeft = document.getElementById("bubble-left-text");
    if (bubbleLeft) bubbleLeft.textContent = state.lang === "en" ? story.initialDialogue_en : story.initialDialogue_hi;

    const bubbleRight = document.getElementById("bubble-right-text");
    if (bubbleRight) {
      bubbleRight.innerHTML = `<span class="thinking-dots"><span>Thinking...</span> <span class="dot-1">●</span><span class="dot-2">●</span><span class="dot-3">●</span></span>`;
    }

    // 4. Mascot Guide prompt
    const guideBubble = document.getElementById("guide-bubble-text");
    if (guideBubble) guideBubble.textContent = state.lang === "en" ? story.guidePrompt_en : story.guidePrompt_hi;

    // 5. Teacher discussion prompt & key rule
    const teacherPrompt = document.getElementById("teacher-discussion-text");
    if (teacherPrompt) teacherPrompt.textContent = state.lang === "en" ? story.teacherPrompt_en : story.teacherPrompt_hi;

    const teacherRule = document.getElementById("teacher-rule-text");
    if (teacherRule) teacherRule.textContent = state.lang === "en" ? story.keyRule_en : story.keyRule_hi;

    // 6. Reset drawer state
    const choiceDrawer = document.getElementById("drawer-choices-state");
    const guideDrawer = document.getElementById("drawer-guidance-state");
    if (choiceDrawer) choiceDrawer.classList.remove("hidden");
    if (guideDrawer) {
      guideDrawer.classList.add("hidden");
      guideDrawer.classList.remove("guidance-safe", "guidance-unsafe");
    }

    // 7. Render Choices Grid
    const choicesGrid = document.getElementById("game-choices-grid");
    if (!choicesGrid) return;
    choicesGrid.innerHTML = "";

    story.choices.forEach((c, idx) => {
      const btn = document.createElement("button");
      btn.className = "choice-card-btn card-pop";
      btn.style.animationDelay = `${idx * 0.08}s`;

      const badgeLetter = String.fromCharCode(65 + idx);
      const text = state.lang === "en" ? c.text_en : c.text_hi;

      btn.innerHTML = `
        <div class="choice-badge-wrapper">
          <span class="choice-badge">${badgeLetter}</span>
        </div>
        <div class="choice-content-wrapper">
          <span class="choice-text">${escapeHtml(text)}</span>
          <span class="choice-action-hint">${state.lang === "en" ? "Take this step" : "यह कदम उठाएँ"} ➔</span>
        </div>
      `;

      btn.onclick = () => onGameChoiceSelect(story, c);
      choicesGrid.appendChild(btn);
    });
  }

  // High-Fidelity Situation-Responsive SVG Backdrop Generator
  function renderEnvironmentBackdrop(envType) {
    const backdrop = document.getElementById("env-backdrop");
    if (!backdrop) return;

    if (envType === "school") {
      backdrop.innerHTML = `
        <svg viewBox="0 0 800 380" width="100%" height="100%" preserveAspectRatio="none" style="position: absolute; top: 0; left: 0;">
          <!-- Sky Gradient -->
          <defs>
            <linearGradient id="sky_school" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#BAE6FD" />
              <stop offset="65%" stop-color="#E0F2FE" />
              <stop offset="100%" stop-color="#FAF5FF" />
            </linearGradient>
            <linearGradient id="road_grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#475569" />
              <stop offset="100%" stop-color="#334155" />
            </linearGradient>
          </defs>
          <rect width="800" height="240" fill="url(#sky_school)" />
          
          <!-- Distant Trees -->
          <ellipse cx="120" cy="210" rx="90" ry="50" fill="#86EFAC" opacity="0.6" />
          <ellipse cx="680" cy="210" rx="100" ry="55" fill="#86EFAC" opacity="0.6" />
          
          <!-- School Building Facade -->
          <rect x="220" y="80" width="360" height="150" fill="#F87171" rx="4" opacity="0.9" />
          <polygon points="200,80 400,20 600,80" fill="#DC2626" />
          <!-- Clock Tower -->
          <rect x="365" y="30" width="70" height="50" fill="#FEF08A" rx="3" />
          <circle cx="400" cy="55" r="14" fill="#FFFFFF" stroke="#CA8A04" stroke-width="2" />
          <!-- School Windows -->
          <rect x="250" y="110" width="40" height="45" fill="#E0F2FE" rx="2" stroke="#B91C1C" stroke-width="1.5" />
          <rect x="310" y="110" width="40" height="45" fill="#E0F2FE" rx="2" stroke="#B91C1C" stroke-width="1.5" />
          <rect x="450" y="110" width="40" height="45" fill="#E0F2FE" rx="2" stroke="#B91C1C" stroke-width="1.5" />
          <rect x="510" y="110" width="40" height="45" fill="#E0F2FE" rx="2" stroke="#B91C1C" stroke-width="1.5" />
          <!-- Entrance Door -->
          <rect x="375" y="170" width="50" height="60" fill="#78350F" rx="3" />
          
          <!-- School Gate Posts -->
          <rect x="160" y="180" width="16" height="50" fill="#CBD5E1" stroke="#64748B" />
          <rect x="624" y="180" width="16" height="50" fill="#CBD5E1" stroke="#64748B" />
          
          <!-- Sidewalk & Road Ground -->
          <rect y="230" width="800" height="40" fill="#E2E8F0" />
          <rect y="270" width="800" height="110" fill="url(#road_grad)" />
          
          <!-- Crosswalk Zebra Stripes -->
          <rect x="320" y="275" width="25" height="95" fill="#FFFFFF" opacity="0.85" rx="3" />
          <rect x="365" y="275" width="25" height="95" fill="#FFFFFF" opacity="0.85" rx="3" />
          <rect x="410" y="275" width="25" height="95" fill="#FFFFFF" opacity="0.85" rx="3" />
          <rect x="455" y="275" width="25" height="95" fill="#FFFFFF" opacity="0.85" rx="3" />
        </svg>
      `;
    } else if (envType === "room") {
      backdrop.innerHTML = `
        <svg viewBox="0 0 800 380" width="100%" height="100%" preserveAspectRatio="none" style="position: absolute; top: 0; left: 0;">
          <defs>
            <linearGradient id="wall_digital" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#1E1B4B" />
              <stop offset="100%" stop-color="#312E81" />
            </linearGradient>
          </defs>
          <rect width="800" height="260" fill="url(#wall_digital)" />
          
          <!-- Bookshelf on Left -->
          <rect x="40" y="40" width="120" height="180" fill="#4338CA" rx="4" opacity="0.7" />
          <rect x="50" y="80" width="100" height="8" fill="#6366F1" />
          <rect x="50" y="140" width="100" height="8" fill="#6366F1" />
          <rect x="55" y="55" width="14" height="25" fill="#F43F5E" rx="1" />
          <rect x="75" y="50" width="16" height="30" fill="#38BDF8" rx="1" />
          <rect x="95" y="58" width="14" height="22" fill="#FBBF24" rx="1" />
          
          <!-- Big Glowing Computer / Tablet Monitor in Center -->
          <rect x="280" y="45" width="240" height="150" fill="#0F172A" rx="8" stroke="#38BDF8" stroke-width="2" />
          <!-- Inner Chat UI Screen -->
          <rect x="290" y="55" width="220" height="130" fill="#1E293B" rx="4" />
          <rect x="305" y="70" width="120" height="18" fill="#475569" rx="9" />
          <rect x="365" y="96" width="130" height="18" fill="#0D9488" rx="9" />
          <rect x="305" y="122" width="140" height="18" fill="#475569" rx="9" />
          <!-- Monitor Stand -->
          <rect x="385" y="195" width="30" height="35" fill="#64748B" />
          <ellipse cx="400" cy="230" rx="45" ry="10" fill="#94A3B8" />
          
          <!-- Warm Lamp Glow on Right -->
          <polygon points="700,20 640,120 760,120" fill="#FEF08A" opacity="0.25" />
          <rect x="696" y="120" width="8" height="100" fill="#E2E8F0" />
          
          <!-- Desk Floor -->
          <rect y="230" width="800" height="30" fill="#475569" />
          <rect y="260" width="800" height="120" fill="#1E293B" />
        </svg>
      `;
    } else if (envType === "mall") {
      backdrop.innerHTML = `
        <svg viewBox="0 0 800 380" width="100%" height="100%" preserveAspectRatio="none" style="position: absolute; top: 0; left: 0;">
          <defs>
            <linearGradient id="mall_wall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#E2E8F0" />
              <stop offset="100%" stop-color="#F8FAFC" />
            </linearGradient>
          </defs>
          <rect width="800" height="240" fill="url(#mall_wall)" />
          
          <!-- Glass Atrium Ceiling Arches -->
          <path d="M 100 0 Q 400 100 700 0" stroke="#94A3B8" stroke-width="4" fill="none" opacity="0.7" />
          <path d="M 200 0 Q 400 60 600 0" stroke="#94A3B8" stroke-width="3" fill="none" opacity="0.7" />
          
          <!-- Storefront Left (Toy Shop) -->
          <rect x="50" y="80" width="220" height="140" fill="#FEF08A" rx="6" stroke="#EAB308" stroke-width="2" />
          <rect x="70" y="90" width="180" height="30" fill="#CA8A04" rx="4" />
          <text x="160" y="110" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">🧸 TOY STORE</text>
          <rect x="70" y="130" width="80" height="80" fill="#BAE6FD" rx="3" opacity="0.8" />
          <rect x="160" y="130" width="80" height="80" fill="#BAE6FD" rx="3" opacity="0.8" />
          
          <!-- Storefront Right (Book & Cafe) -->
          <rect x="530" y="80" width="220" height="140" fill="#BBF7D0" rx="6" stroke="#22C55E" stroke-width="2" />
          <rect x="550" y="90" width="180" height="30" fill="#15803D" rx="4" />
          <text x="640" y="110" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">📚 BOOKS & CAFE</text>
          <rect x="550" y="130" width="80" height="80" fill="#BAE6FD" rx="3" opacity="0.8" />
          <rect x="640" y="130" width="80" height="80" fill="#BAE6FD" rx="3" opacity="0.8" />
          
          <!-- Escalator in Center Background -->
          <polygon points="340,220 460,80 480,80 360,220" fill="#94A3B8" opacity="0.6" />
          <polygon points="360,220 480,80 470,80 350,220" fill="#CBD5E1" opacity="0.8" />
          
          <!-- Polished Tile Floor with Reflection Lines -->
          <rect y="220" width="800" height="160" fill="#F1F5F9" />
          <line x1="0" y1="280" x2="800" y2="280" stroke="#CBD5E1" stroke-width="1.5" />
          <line x1="0" y1="340" x2="800" y2="340" stroke="#CBD5E1" stroke-width="1.5" />
          <line x1="200" y1="220" x2="100" y2="380" stroke="#CBD5E1" stroke-width="1.5" />
          <line x1="400" y1="220" x2="400" y2="380" stroke="#CBD5E1" stroke-width="1.5" />
          <line x1="600" y1="220" x2="700" y2="380" stroke="#CBD5E1" stroke-width="1.5" />
        </svg>
      `;
    } else {
      // living_room
      backdrop.innerHTML = `
        <svg viewBox="0 0 800 380" width="100%" height="100%" preserveAspectRatio="none" style="position: absolute; top: 0; left: 0;">
          <defs>
            <linearGradient id="living_wall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#FEF3C7" />
              <stop offset="100%" stop-color="#FDE68A" />
            </linearGradient>
          </defs>
          <rect width="800" height="240" fill="url(#living_wall)" />
          
          <!-- Window with Curtains on Left -->
          <rect x="60" y="40" width="120" height="130" fill="#BAE6FD" rx="4" stroke="#D97706" stroke-width="2" />
          <line x1="120" y1="40" x2="120" y2="170" stroke="#D97706" stroke-width="2" />
          <line x1="60" y1="105" x2="180" y2="105" stroke="#D97706" stroke-width="2" />
          <polygon points="50,30 90,30 65,175 50,175" fill="#DC2626" opacity="0.85" />
          <polygon points="190,30 150,30 175,175 190,175" fill="#DC2626" opacity="0.85" />
          
          <!-- Family Photo Frame in Center -->
          <rect x="340" y="50" width="120" height="80" fill="#FFFFFF" stroke="#92400E" stroke-width="4" rx="4" />
          <circle cx="380" cy="85" r="14" fill="#FDE68A" />
          <circle cx="420" cy="85" r="14" fill="#FDE68A" />
          <rect x="360" y="102" width="80" height="20" fill="#93C5FD" rx="3" />
          
          <!-- Sofa in Living Room -->
          <rect x="280" y="150" width="240" height="80" fill="#3B82F6" rx="14" />
          <rect x="300" y="170" width="95" height="55" fill="#60A5FA" rx="8" />
          <rect x="405" y="170" width="95" height="55" fill="#60A5FA" rx="8" />
          
          <!-- Lamp with warm shade on Right -->
          <ellipse cx="680" cy="180" rx="30" ry="12" fill="#F59E0B" />
          <rect x="677" y="90" width="6" height="90" fill="#78350F" />
          <polygon points="650,90 710,90 730,50 630,50" fill="#EF4444" />
          
          <!-- Wooden Floor -->
          <rect y="230" width="800" height="150" fill="#B45309" />
          <line x1="0" y1="270" x2="800" y2="270" stroke="#78350F" stroke-width="1.5" />
          <line x1="0" y1="320" x2="800" y2="320" stroke="#78350F" stroke-width="1.5" />
        </svg>
      `;
    }
  }

  function onGameChoiceSelect(story, choice) {
    state.activeChoice = choice;
    state.completedStories.add(story.id);

    // Record learning response
    state.learningResponses.push({
      response_id: `resp_learn_${Date.now()}`,
      scenario_id: story.id,
      selected_choice_id: choice.id,
      rating: choice.rating,
      is_safe: choice.rating === "safe",
      skills_demonstrated: { ...choice.skills },
      timestamp: new Date().toISOString()
    });

    // Update child dialogue bubble
    const bubbleRight = document.getElementById("bubble-right-text");
    if (bubbleRight) {
      const choiceText = state.lang === "en" ? choice.text_en : choice.text_hi;
      bubbleRight.innerHTML = `"${escapeHtml(choiceText)}"`;
    }

    // Update child actor expression
    if (choice.rating === "safe") {
      playSuccess();
      renderChildActorSVG("happy");
    } else {
      playReflect();
      renderChildActorSVG("thinking");
    }

    // Show Guidance Reflection Modal
    setTimeout(() => {
      const choiceDrawer = document.getElementById("drawer-choices-state");
      const guideDrawer = document.getElementById("drawer-guidance-state");
      if (choiceDrawer) choiceDrawer.classList.add("hidden");
      if (guideDrawer) {
        guideDrawer.classList.remove("hidden");
        guideDrawer.classList.remove("guidance-safe", "guidance-unsafe");
        guideDrawer.classList.add(choice.rating === "safe" ? "guidance-safe" : "guidance-unsafe");
      }

      const headingEl = document.getElementById("guidance-heading");
      if (headingEl) headingEl.textContent = state.lang === "en" ? choice.guidanceTitle_en : choice.guidanceTitle_hi;

      const bodyEl = document.getElementById("guidance-body-text");
      if (bodyEl) bodyEl.textContent = state.lang === "en" ? choice.guidanceBody_en : choice.guidanceBody_hi;

      const iconEl = document.getElementById("guidance-status-icon");
      if (iconEl) iconEl.textContent = choice.rating === "safe" ? "⭐" : "🌱";

      const tagEl = document.getElementById("guidance-status-tag");
      if (tagEl) {
        tagEl.textContent = choice.rating === "safe" 
          ? (state.lang === "en" ? "Safe & Empowered Action" : "सुरक्षित एवं समझदारी भरा निर्णय")
          : (state.lang === "en" ? "Gentle Safety Insight" : "सुरक्षा सीख एवं मार्गदर्शन");
      }

      const continueBtn = document.getElementById("guidance-continue-btn");
      if (continueBtn) {
        if (choice.rating === "safe") {
          continueBtn.innerHTML = `<span>${state.lang === "en" ? "Story Completed! Back to Hub ⭐" : "कहानी पूर्ण! हब पर वापस जाएँ ⭐"}</span>`;
          continueBtn.onclick = () => navigate("hub");
        } else {
          continueBtn.innerHTML = `<span>${state.lang === "en" ? "Try Another Choice ↺" : "दूसरा विकल्प चुनें ↺"}</span>`;
          continueBtn.onclick = () => renderGameStage();
        }
      }
    }, 400);
  }

  // =========================================================================
  // POST-ASSESSMENT FLOW
  // =========================================================================
  function startPostAssessment() {
    initAudio();
    state.postIndex = 0;
    state.postResponses = [];
    state.classroomPostVotes = {};
    navigate("post-assessment");
    renderPostQuestion();
  }

  function renderPostQuestion() {
    const q = GAURI_DATA.postAssessment[state.postIndex];
    if (!q) {
      finalizeSession();
      playGentleChime();
      navigate("dashboard");
      return;
    }

    const stepEl = document.getElementById("post-step-num");
    if (stepEl) stepEl.textContent = state.postIndex + 1;

    const iconEl = document.getElementById("post-icon");
    if (iconEl) iconEl.textContent = q.icon;

    const titleEl = document.getElementById("post-title");
    if (titleEl) titleEl.textContent = state.lang === "en" ? q.title_en : q.title_hi;

    const storyEl = document.getElementById("post-story");
    if (storyEl) storyEl.textContent = state.lang === "en" ? q.story_en : q.story_hi;

    const pollBanner = document.getElementById("post-poll-banner");
    const confirmBox = document.getElementById("post-class-confirm-box");
    if (pollBanner) pollBanner.style.display = state.mode === "classroom" ? "flex" : "none";
    if (confirmBox) confirmBox.classList.toggle("hidden", state.mode !== "classroom");

    state.currentVotes = {};
    q.choices.forEach(c => { state.currentVotes[c.id] = 0; });

    const list = document.getElementById("post-choices-list");
    if (!list) return;
    list.innerHTML = "";

    q.choices.forEach((c, idx) => {
      const row = document.createElement("div");
      row.className = "choice-row-wrapper card-pop";
      row.style.animationDelay = `${idx * 0.08}s`;

      const badgeLetter = String.fromCharCode(65 + idx);
      const text = state.lang === "en" ? c.text_en : c.text_hi;

      if (state.mode === "classroom") {
        row.innerHTML = `
          <button class="choice-content-btn" onclick="GauriEngine.incrementVote('${c.id}')" aria-label="Option ${badgeLetter}">
            <span class="choice-badge">${badgeLetter}</span>
            <span class="choice-text">${escapeHtml(text)}</span>
          </button>
          <div class="vote-counter-box">
            <button class="vote-btn" onclick="GauriEngine.decrementVote('${c.id}')" title="Minus 1 hand" aria-label="Decrease count">-</button>
            <span class="vote-count-num" id="vote-count-${c.id}">0</span>
            <button class="vote-btn" onclick="GauriEngine.incrementVote('${c.id}')" title="Plus 1 hand" aria-label="Increase count">+</button>
          </div>
        `;
      } else {
        row.innerHTML = `
          <button class="choice-content-btn" onclick="GauriEngine.onPostChoiceSelect('${c.id}')" aria-label="Select option ${badgeLetter}">
            <span class="choice-badge">${badgeLetter}</span>
            <span class="choice-text">${escapeHtml(text)}</span>
          </button>
        `;
      }

      list.appendChild(row);
    });
  }

  function confirmPostClassVote() {
    if (state.isProcessingClick) return;
    state.isProcessingClick = true;
    setTimeout(() => { state.isProcessingClick = false; }, 300);

    const q = GAURI_DATA.postAssessment[state.postIndex];
    if (!q) return;

    state.classroomPostVotes[q.id] = { ...state.currentVotes };

    const totalVotes = Object.values(state.currentVotes).reduce((a, b) => a + b, 0);
    const safeChoice = q.choices.find(c => c.isSafe);
    const safeVotes = safeChoice ? (state.currentVotes[safeChoice.id] || 0) : 0;

    state.postResponses.push({
      response_id: `resp_post_${Date.now()}_${state.postIndex}`,
      question_id: q.id,
      category: q.category,
      mode: "classroom",
      vote_distribution: { ...state.currentVotes },
      total_votes: totalVotes,
      safe_votes: safeVotes,
      safe_ratio: totalVotes > 0 ? (safeVotes / totalVotes) : 0,
      timestamp: new Date().toISOString()
    });

    state.postIndex++;
    if (state.postIndex < GAURI_DATA.postAssessment.length) {
      renderPostQuestion();
    } else {
      finalizeSession();
      playGentleChime();
      navigate("dashboard");
    }
  }

  function onPostChoiceSelect(choiceId) {
    if (state.isProcessingClick) return;
    state.isProcessingClick = true;
    setTimeout(() => { state.isProcessingClick = false; }, 300);

    playClick();
    const q = GAURI_DATA.postAssessment[state.postIndex];
    if (!q) return;

    const choice = q.choices.find(c => c.id === choiceId) || q.choices[0];

    state.postResponses.push({
      response_id: `resp_post_${Date.now()}_${state.postIndex}`,
      question_id: q.id,
      category: q.category,
      mode: "individual",
      selected_choice_id: choice.id,
      selected_text: choice.text_en,
      is_safe: choice.isSafe === true,
      skills_awarded: { ...choice.skills },
      timestamp: new Date().toISOString()
    });

    state.postIndex++;
    if (state.postIndex < GAURI_DATA.postAssessment.length) {
      renderPostQuestion();
    } else {
      finalizeSession();
      playGentleChime();
      navigate("dashboard");
    }
  }

  // =========================================================================
  // STRICT EMPIRICAL SESSION FINALIZATION & PERSISTENCE
  // =========================================================================
  function finalizeSession() {
    if (state.isSessionFinalized) return;
    state.isSessionFinalized = true;

    const sessionRecord = computeSessionSummary(state);
    
    // Append to LocalStorage Master Roster
    const existingSessions = getAllStoredSessions();
    // Guard against duplicate session IDs
    const alreadyExists = existingSessions.some(s => s.session_id === sessionRecord.session_id);
    if (!alreadyExists) {
      existingSessions.unshift(sessionRecord);
      localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(existingSessions));
    }
  }

  function getAllStoredSessions() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_SESSIONS) || "[]");
    } catch (e) {
      return [];
    }
  }

  // Computes genuine metrics from actual raw responses
  function computeSessionSummary(s) {
    const isClassroom = (s.mode === "classroom");
    const numPre = s.preResponses.length;
    const numPost = s.postResponses.length;

    let preScorePct = 0;
    let postScorePct = 0;
    let deltaPctPoints = 0;
    let skillAnalysis = {};
    let totalVotesPolled = 0;

    const skillsList = Object.keys(GAURI_DATA.skills);
    skillsList.forEach(k => {
      skillAnalysis[k] = { pre_pct: 0, post_pct: 0, delta_points: 0 };
    });

    if (isClassroom) {
      // Classroom Poll Computation
      let sumPreSafe = 0;
      let sumPreTotal = 0;
      s.preResponses.forEach(r => {
        sumPreSafe += r.safe_votes || 0;
        sumPreTotal += r.total_votes || 0;
        totalVotesPolled = Math.max(totalVotesPolled, r.total_votes || 0);
      });

      let sumPostSafe = 0;
      let sumPostTotal = 0;
      s.postResponses.forEach(r => {
        sumPostSafe += r.safe_votes || 0;
        sumPostTotal += r.total_votes || 0;
        totalVotesPolled = Math.max(totalVotesPolled, r.total_votes || 0);
      });

      preScorePct = sumPreTotal > 0 ? Math.round((sumPreSafe / sumPreTotal) * 100) : 0;
      postScorePct = sumPostTotal > 0 ? Math.round((sumPostSafe / sumPostTotal) * 100) : 0;
      deltaPctPoints = postScorePct - preScorePct;

      // Skill distribution for classroom
      skillsList.forEach(k => {
        skillAnalysis[k] = {
          pre_pct: preScorePct,
          post_pct: postScorePct,
          delta_points: deltaPctPoints
        };
      });
    } else {
      // Individual Student Mode Computation
      const safePreCount = s.preResponses.filter(r => r.is_safe).length;
      const safePostCount = s.postResponses.filter(r => r.is_safe).length;

      preScorePct = numPre > 0 ? Math.round((safePreCount / numPre) * 100) : 0;
      postScorePct = numPost > 0 ? Math.round((safePostCount / numPost) * 100) : 0;
      deltaPctPoints = postScorePct - preScorePct;

      // Skill Breakdown Calculation
      skillsList.forEach(k => {
        let preSum = 0;
        let preMax = 0;
        s.preResponses.forEach(r => {
          preMax += 1;
          if (r.skills_awarded && r.skills_awarded[k]) preSum += r.skills_awarded[k];
        });

        let postSum = 0;
        let postMax = 0;
        s.postResponses.forEach(r => {
          postMax += 1;
          if (r.skills_awarded && r.skills_awarded[k]) postSum += r.skills_awarded[k];
        });

        const preSkillPct = preMax > 0 ? Math.round((preSum / preMax) * 100) : 0;
        const postSkillPct = postMax > 0 ? Math.round((postSum / postMax) * 100) : 0;

        skillAnalysis[k] = {
          pre_pct: preSkillPct,
          post_pct: postSkillPct,
          delta_points: postSkillPct - preSkillPct
        };
      });
    }

    // Identify Strongest and Weakest Skills
    let strongestSkill = "verification";
    let weakestSkill = "boundary_setting";
    let maxPost = -1;
    let minPost = 999;

    skillsList.forEach(k => {
      const p = skillAnalysis[k].post_pct;
      if (p > maxPost) { maxPost = p; strongestSkill = k; }
      if (p < minPost) { minPost = p; weakestSkill = k; }
    });

    return {
      session_id: s.sessionId || `sess_${Date.now()}`,
      timestamp: s.startedAt || new Date().toISOString(),
      dateTime: new Date().toLocaleString(),
      institution: s.institution || "Fellowship Pilot School",
      participant_id: s.participantId || "C-101",
      mode: s.mode,
      age_group: s.ageGroup,
      has_pre: numPre > 0,
      has_post: numPost > 0,
      pre_score_pct: preScorePct,
      post_score_pct: postScorePct,
      delta_pct_points: deltaPctPoints,
      total_votes_polled: totalVotesPolled,
      skill_analysis: skillAnalysis,
      strongest_skill: strongestSkill,
      weakest_skill: weakestSkill,
      raw_pre_responses: s.preResponses,
      raw_post_responses: s.postResponses,
      raw_learning_responses: s.learningResponses
    };
  }

  // =========================================================================
  // RESEARCHER / EDUCATOR ANALYTICS DASHBOARD
  // =========================================================================
  function setDashboardTab(tabName) {
    playClick();
    state.currentTab = tabName;
    document.querySelectorAll(".dash-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabName);
    });
    document.querySelectorAll(".dash-tab-panel").forEach(panel => {
      panel.classList.toggle("active", panel.id === `tab-panel-${tabName}`);
    });

    renderDashboard();
  }

  function renderDashboard() {
    const allSessions = getAllStoredSessions();
    
    // Top Stats Tiles
    const totalParticipants = allSessions.length;
    const individualSessions = allSessions.filter(s => s.mode === "individual");
    const classroomSessions = allSessions.filter(s => s.mode === "classroom");

    let totalDelta = 0;
    allSessions.forEach(s => { totalDelta += s.delta_pct_points || 0; });
    const avgGrowth = totalParticipants > 0 ? Math.round(totalDelta / totalParticipants) : 0;

    // Overview Stats
    const totalPartEl = document.getElementById("stat-total-participants");
    if (totalPartEl) totalPartEl.textContent = totalParticipants;

    const indCountEl = document.getElementById("stat-individual-count");
    if (indCountEl) indCountEl.textContent = individualSessions.length;

    const classCountEl = document.getElementById("stat-classroom-count");
    if (classCountEl) classCountEl.textContent = classroomSessions.length;

    const avgGrowthEl = document.getElementById("stat-avg-growth");
    if (avgGrowthEl) {
      if (totalParticipants > 0) {
        avgGrowthEl.textContent = `${avgGrowth >= 0 ? "+" : ""}${avgGrowth}%`;
        avgGrowthEl.classList.add("highlight-green");
      } else {
        avgGrowthEl.textContent = state.lang === "en" ? "No Data" : "कोई डेटा नहीं";
        avgGrowthEl.classList.remove("highlight-green");
      }
    }

    // 1. Render Individual Explorer Tab
    renderIndividualExplorer(allSessions);

    // 2. Render Classroom Analytics Tab
    renderClassroomAnalytics(classroomSessions);

    // 3. Render Data-Driven Age Cohorts Tab
    renderDataDrivenAgeCohorts(allSessions);

    // 4. Render Master Sessions Roster Table
    renderMasterRoster(allSessions);

    // 5. Render Practical Life Competencies
    renderLifeCompetencies();
  }

  // Individual Student Explorer
  function renderIndividualExplorer(allSessions) {
    const selectEl = document.getElementById("individual-session-select");
    const container = document.getElementById("individual-details-container");
    if (!selectEl || !container) return;

    const individualSessions = allSessions.filter(s => s.mode === "individual");
    
    // Populate dropdown
    selectEl.innerHTML = "";
    if (individualSessions.length === 0) {
      selectEl.innerHTML = `<option value="">${state.lang === "en" ? "No individual sessions recorded yet" : "कोई एकल सत्र उपलब्ध नहीं है"}</option>`;
      container.innerHTML = `
        <div class="empty-state-card">
          <p>${state.lang === "en" ? "No individual student evaluations recorded yet. Run an individual session to view empirical student profiles." : "अभी कोई व्यक्तिगत छात्र मूल्यांकन दर्ज नहीं है।"}</p>
        </div>
      `;
      return;
    }

    individualSessions.forEach(sess => {
      const opt = document.createElement("option");
      opt.value = sess.session_id;
      opt.textContent = `${sess.participant_id} (${sess.institution}) — ${sess.dateTime} [Pre: ${sess.pre_score_pct}%, Post: ${sess.post_score_pct}%, Δ: ${sess.delta_pct_points >= 0 ? '+' : ''}${sess.delta_pct_points}%]`;
      if (state.selectedSessionId === sess.session_id) opt.selected = true;
      selectEl.appendChild(opt);
    });

    const activeId = selectEl.value;
    const sess = individualSessions.find(s => s.session_id === activeId) || individualSessions[0];
    if (!sess) return;

    const strongSkillMeta = GAURI_DATA.skills[sess.strongest_skill] || GAURI_DATA.skills["verification"];
    const weakSkillMeta = GAURI_DATA.skills[sess.weakest_skill] || GAURI_DATA.skills["boundary_setting"];

    container.innerHTML = `
      <div class="stats-tiles-grid" style="margin-top: 1rem;">
        <div class="stat-card">
          <div class="stat-icon">🆔</div>
          <div class="stat-content">
            <span class="stat-label">Student ID</span>
            <span class="stat-val">${escapeHtml(sess.participant_id)}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-content">
            <span class="stat-label">Baseline Pre-Test</span>
            <span class="stat-val">${sess.pre_score_pct}%</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-content">
            <span class="stat-label">Transfer Post-Test</span>
            <span class="stat-val">${sess.post_score_pct}%</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📈</div>
          <div class="stat-content">
            <span class="stat-label">Net Observed Change</span>
            <span class="stat-val highlight-green">${sess.delta_pct_points >= 0 ? '+' : ''}${sess.delta_pct_points} pts</span>
          </div>
        </div>
      </div>

      <div style="background: #F8FAFC; border: 1.5px solid var(--border-gentle); border-radius: var(--radius-md); padding: 1rem 1.25rem; margin: 1.25rem 0;">
        <p style="font-size: 0.95rem; color: var(--text-main); margin-bottom: 0.35rem;">
          ⭐ <strong>${state.lang === "en" ? "Strongest Demonstrated Skill:" : "सर्वश्रेष्ठ प्रदर्शित कौशल:"}</strong> 
          ${state.lang === "en" ? strongSkillMeta.name_en : strongSkillMeta.name_hi}
        </p>
        <p style="font-size: 0.95rem; color: var(--text-main);">
          🌱 <strong>${state.lang === "en" ? "Key Growth Focus Area:" : "सुधार का मुख्य क्षेत्र:"}</strong> 
          ${state.lang === "en" ? weakSkillMeta.name_en : weakSkillMeta.name_hi}
        </p>
      </div>

      <!-- 6-SKILL PROGRESS BARS & RADAR -->
      <div class="dash-charts-grid">
        <div>
          <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.85rem; color: var(--text-main);">
            6-Skill Dimension Vector (Pre vs Post)
          </h4>
          <div class="skills-bars-container" id="individual-skill-bars">
            ${renderIndividualSkillBarsHTML(sess.skill_analysis)}
          </div>
        </div>
        <div>
          <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.85rem; color: var(--text-main);">
            Cognitive Transfer Radar
          </h4>
          <div class="canvas-wrapper">
            <canvas id="individualRadarCanvas" width="360" height="300"></canvas>
          </div>
        </div>
      </div>
    `;

    drawRadarChartOnCanvas("individualRadarCanvas", sess.skill_analysis);
  }

  function onSelectIndividualSession() {
    const selectEl = document.getElementById("individual-session-select");
    if (selectEl) {
      state.selectedSessionId = selectEl.value;
      renderDashboard();
    }
  }

  function renderIndividualSkillBarsHTML(skillAnalysis) {
    const skills = Object.keys(GAURI_DATA.skills);
    return skills.map(k => {
      const meta = GAURI_DATA.skills[k];
      const data = skillAnalysis[k] || { pre_pct: 0, post_pct: 0, delta_points: 0 };
      const skillName = state.lang === "en" ? meta.name_en : meta.name_hi;

      return `
        <div class="skill-bar-row">
          <div class="skill-meta">
            <span>${escapeHtml(skillName)}</span>
            <span class="skill-delta">${data.delta_points >= 0 ? '+' : ''}${data.delta_points}%</span>
          </div>
          <div class="meter-track" title="Pre: ${data.pre_pct}%, Post: ${data.post_pct}%">
            <div class="meter-pre" style="width: ${data.pre_pct}%;"></div>
            <div class="meter-post" style="width: ${data.post_pct}%;"></div>
          </div>
        </div>
      `;
    }).join("");
  }

  // Classroom Discussion Analytics Tab
  function renderClassroomAnalytics(classroomSessions) {
    const container = document.getElementById("classroom-analytics-container");
    if (!container) return;

    if (classroomSessions.length === 0) {
      container.innerHTML = `
        <div class="empty-state-card">
          <p>${state.lang === "en" ? "No classroom discussion sessions recorded yet. Facilitate a whole-class poll session to view collective consensus analytics." : "अभी कोई कक्षा चर्चा सत्र दर्ज नहीं है।"}</p>
        </div>
      `;
      return;
    }

    let totalClassVotes = 0;
    let sumPreSafe = 0;
    let sumPostSafe = 0;
    classroomSessions.forEach(s => {
      totalClassVotes += s.total_votes_polled || 0;
      sumPreSafe += s.pre_score_pct || 0;
      sumPostSafe += s.post_score_pct || 0;
    });

    const avgPre = Math.round(sumPreSafe / classroomSessions.length);
    const avgPost = Math.round(sumPostSafe / classroomSessions.length);
    const classShift = avgPost - avgPre;

    container.innerHTML = `
      <div class="stats-tiles-grid" style="margin-top: 1rem;">
        <div class="stat-card">
          <div class="stat-icon">🏫</div>
          <div class="stat-content">
            <span class="stat-label">Classes Polled</span>
            <span class="stat-val">${classroomSessions.length}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🗳️</div>
          <div class="stat-content">
            <span class="stat-label">Class Pre-Poll Safe %</span>
            <span class="stat-val">${avgPre}%</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🌟</div>
          <div class="stat-content">
            <span class="stat-label">Class Post-Poll Safe %</span>
            <span class="stat-val">${avgPost}%</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📈</div>
          <div class="stat-content">
            <span class="stat-label">Classroom Shift (Δ)</span>
            <span class="stat-val highlight-green">${classShift >= 0 ? '+' : ''}${classShift} pts</span>
          </div>
        </div>
      </div>

      <div style="margin-top: 1.5rem;">
        <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.6rem; color: var(--text-main);">
          Classroom Discussion Sessions History
        </h4>
        <div class="timeline-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Institution</th>
                <th>Class ID</th>
                <th>Age Group</th>
                <th>Pre Poll Safe %</th>
                <th>Post Poll Safe %</th>
                <th>Consensus Shift (Δ)</th>
              </tr>
            </thead>
            <tbody>
              ${classroomSessions.map(c => `
                <tr>
                  <td><small>${escapeHtml(c.dateTime)}</small></td>
                  <td><strong>${escapeHtml(c.institution)}</strong></td>
                  <td><code>${escapeHtml(c.participant_id)}</code></td>
                  <td><span class="cohort-active-badge">${escapeHtml(c.age_group)} yrs</span></td>
                  <td>${c.pre_score_pct}%</td>
                  <td><strong>${c.post_score_pct}%</strong></td>
                  <td><span class="stat-val highlight-green" style="font-size: 0.95rem;">${c.delta_pct_points >= 0 ? '+' : ''}${c.delta_pct_points}%</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Data-Driven Age Cohorts Tab
  function renderDataDrivenAgeCohorts(allSessions) {
    const container = document.getElementById("age-cohorts-container");
    if (!container) return;
    container.innerHTML = "";

    const brackets = ["6-8", "9-11", "12+"];
    const grid = document.createElement("div");
    grid.className = "cohort-comparison-grid";

    brackets.forEach(bracket => {
      const focus = GAURI_DATA.ageCohortFocus[bracket] || {};
      const cohortSessions = allSessions.filter(s => s.age_group === bracket);
      const isSelected = (state.ageGroup === bracket);

      const card = document.createElement("div");
      card.className = `cohort-card card-pop ${isSelected ? "active-cohort" : ""}`;

      const title = state.lang === "en" ? focus.name_en : focus.name_hi;
      const vuln = state.lang === "en" ? focus.keyVulnerability_en : focus.keyVulnerability_hi;
      const activeBadge = isSelected ? `<span class="cohort-active-badge">Active Cohort</span>` : "";

      if (cohortSessions.length === 0) {
        card.innerHTML = `
          <div class="cohort-title">
            <span>${escapeHtml(title)}</span>
            ${activeBadge}
          </div>
          <div style="background: #F1F5F9; border-radius: var(--radius-sm); padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.88rem;">
            <em>${state.lang === "en" ? "No participants recorded in this age group yet." : "इस आयु वर्ग के लिए अभी कोई सत्र दर्ज नहीं है।"}</em>
          </div>
          <p class="cohort-vuln-text" style="margin-top: 0.75rem;">⚠️ <em>${escapeHtml(vuln)}</em></p>
        `;
      } else {
        let sumPre = 0;
        let sumPost = 0;
        cohortSessions.forEach(s => {
          sumPre += s.pre_score_pct || 0;
          sumPost += s.post_score_pct || 0;
        });
        const avgPre = Math.round(sumPre / cohortSessions.length);
        const avgPost = Math.round(sumPost / cohortSessions.length);
        const avgChange = avgPost - avgPre;

        card.innerHTML = `
          <div class="cohort-title">
            <span>${escapeHtml(title)}</span>
            ${activeBadge}
          </div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem;">
            Empirical sample: <strong>${cohortSessions.length} sessions</strong>
          </div>
          <div class="cohort-bars">
            <div class="cohort-bar-label">
              <span>Measured Pre-Test Baseline:</span>
              <strong>${avgPre}%</strong>
            </div>
            <div class="cohort-track">
              <div class="cohort-fill-pre" style="width: ${avgPre}%;"></div>
            </div>

            <div class="cohort-bar-label" style="margin-top: 0.4rem;">
              <span>Measured Post-Test Transfer:</span>
              <strong style="color: var(--pine);">${avgPost}%</strong>
            </div>
            <div class="cohort-track">
              <div class="cohort-fill-post" style="width: ${avgPost}%;"></div>
            </div>

            <div class="cohort-bar-label" style="margin-top: 0.3rem;">
              <span>Observed Cohort Growth (Δ):</span>
              <strong style="color: var(--pine);">${avgChange >= 0 ? '+' : ''}${avgChange} pts</strong>
            </div>
          </div>
          <p class="cohort-vuln-text" style="margin-top: 0.75rem;">⚠️ <em>${escapeHtml(vuln)}</em></p>
        `;
      }

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }

  // Master Roster Table
  function renderMasterRoster(allSessions) {
    const tbody = document.getElementById("roster-table-body");
    if (!tbody) return;
    tbody.innerHTML = "";

    if (allSessions.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="results-log-empty">
            ${state.lang === "en" ? "No recorded sessions yet. Complete a safety journey to record real data." : "अभी कोई सहेजा गया सत्र नहीं है।"}
          </td>
        </tr>
      `;
      return;
    }

    allSessions.forEach((entry, idx) => {
      const tr = document.createElement("tr");
      const isPositive = (entry.delta_pct_points >= 0);

      tr.innerHTML = `
        <td><small>${escapeHtml(entry.dateTime)}</small></td>
        <td><strong>${escapeHtml(entry.institution)}</strong></td>
        <td><code>${escapeHtml(entry.participant_id)}</code></td>
        <td><span class="cohort-active-badge">${escapeHtml(entry.age_group)} yrs</span></td>
        <td><small>${entry.mode === 'classroom' ? '🏫 Classroom' : '🧑‍🎓 Individual'}</small></td>
        <td>${entry.pre_score_pct}%</td>
        <td><strong>${entry.post_score_pct}%</strong></td>
        <td><span class="stat-val ${isPositive ? 'highlight-green' : 'highlight-amber'}" style="font-size: 0.95rem;">${isPositive ? '+' : ''}${entry.delta_pct_points}%</span></td>
        <td>
          <button class="small-btn" style="background: #FFF5F5; color: #E53E3E; border-color: #FEB2B2; padding: 0.2rem 0.55rem;" onclick="GauriEngine.deleteRosterEntry(${idx})" title="Delete entry" aria-label="Delete">✕</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  function deleteRosterEntry(index) {
    playClick();
    const sessions = getAllStoredSessions();
    if (index >= 0 && index < sessions.length) {
      sessions.splice(index, 1);
      localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));
      renderDashboard();
    }
  }

  function clearMasterRoster() {
    playClick();
    const confirmMsg = state.lang === "en" 
      ? "Are you sure you want to clear all stored sessions from this computer?" 
      : "क्या आप सभी सहेजे गए सत्रों को हटाना चाहते हैं?";
    if (confirm(confirmMsg)) {
      localStorage.removeItem(STORAGE_KEY_SESSIONS);
      renderDashboard();
    }
  }

  function renderLifeCompetencies() {
    const container = document.getElementById("competencies-container");
    if (!container) return;
    container.innerHTML = "";

    GAURI_DATA.lifeCompetencies.forEach(comp => {
      const card = document.createElement("div");
      card.className = "competency-card card-pop";

      const title = state.lang === "en" ? comp.title_en : comp.title_hi;
      const takeaway = state.lang === "en" ? comp.takeaway_en : comp.takeaway_hi;
      const statusText = state.lang === "en" ? "✓ Practical Takeaway Rule" : "✓ मुख्य सुरक्षा नियम";

      card.innerHTML = `
        <div class="comp-header">
          <span class="comp-icon">${comp.icon}</span>
          <span class="comp-title">${escapeHtml(title)}</span>
        </div>
        <p class="comp-takeaway">${escapeHtml(takeaway)}</p>
        <span class="comp-status-tag">${escapeHtml(statusText)}</span>
      `;
      container.appendChild(card);
    });
  }

  // Draw Radar Chart Strictly From Measured Data
  function drawRadarChartOnCanvas(canvasId, skillAnalysis) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const radius = 95;

    ctx.clearRect(0, 0, width, height);

    const skills = Object.keys(GAURI_DATA.skills);
    const totalSides = skills.length;
    const angleStep = (Math.PI * 2) / totalSides;

    // Web Rings
    for (let level = 1; level <= 4; level++) {
      ctx.beginPath();
      const r = (radius / 4) * level;
      for (let i = 0; i < totalSides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = "#E2E8F0";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Axis Lines & Labels
    ctx.font = "11px 'Fredoka', 'Nunito', sans-serif";
    ctx.fillStyle = "#4A5568";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let i = 0; i < totalSides; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "#CBD5E1";
      ctx.stroke();

      const labelX = cx + (radius + 24) * Math.cos(angle);
      const labelY = cy + (radius + 16) * Math.sin(angle);
      const labelText = GAURI_DATA.skills[skills[i]]?.name_en || skills[i];
      ctx.fillText(labelText, labelX, labelY);
    }

    if (!skillAnalysis) return;

    // Draw Pre Polygon (Orange / Amber)
    drawSkillPolygon(ctx, cx, cy, radius, angleStep, skills, skillAnalysis, "pre_pct", "rgba(226, 150, 58, 0.35)", "#C97A22");

    // Draw Post Polygon (Emerald / Pine)
    drawSkillPolygon(ctx, cx, cy, radius, angleStep, skills, skillAnalysis, "post_pct", "rgba(36, 73, 63, 0.40)", "#24493F");
  }

  function drawSkillPolygon(ctx, cx, cy, radius, step, keys, skillAnalysis, fieldKey, fillStyle, strokeStyle) {
    ctx.beginPath();
    keys.forEach((k, i) => {
      const pct = (skillAnalysis[k] ? skillAnalysis[k][fieldKey] : 0) / 100;
      const r = Math.max(8, radius * pct);
      const angle = i * step - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // =========================================================================
  // RESEARCH EXPORT UTILITIES (CSV & JSON)
  // =========================================================================
  function exportMasterCSV() {
    playClick();
    const sessions = getAllStoredSessions();
    if (!sessions.length) {
      alert(state.lang === "en" ? "No recorded sessions to export!" : "एक्सपोर्ट करने के लिए अभी कोई सत्र नहीं है!");
      return;
    }

    const headers = [
      "Session_ID",
      "Date_Time",
      "Institution",
      "Participant_or_Class_ID",
      "Age_Group",
      "Mode",
      "Pre_Test_Score_Pct",
      "Post_Test_Score_Pct",
      "Observed_Growth_Points",
      "Strongest_Skill",
      "Weakest_Skill"
    ];
    const rows = [headers.join(",")];

    sessions.forEach(s => {
      rows.push([
        `"${s.session_id}"`,
        `"${s.dateTime}"`,
        `"${(s.institution || '').replace(/"/g, '""')}"`,
        `"${(s.participant_id || '').replace(/"/g, '""')}"`,
        `"${s.age_group}"`,
        `"${s.mode}"`,
        s.pre_score_pct,
        s.post_score_pct,
        s.delta_pct_points,
        `"${s.strongest_skill || ''}"`,
        `"${s.weakest_skill || ''}"`
      ].join(","));
    });

    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `GauriKit_Master_Research_Roster_${Date.now()}.csv`;
    a.click();
  }

  function exportDataJSON() {
    playClick();
    const sessions = getAllStoredSessions();
    const payload = {
      export_timestamp: new Date().toISOString(),
      platform: "GauriKit 2.0 Empirical Evaluation Suite",
      total_sessions_recorded: sessions.length,
      sessions_data: sessions
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `GauriKit_Empirical_Dataset_${Date.now()}.json`;
    a.click();
  }

  function exportDataCSV() {
    exportMasterCSV();
  }

  function startNewSession() {
    playClick();
    state.isSessionFinalized = false;
    generateRandomId();
    navigate("welcome");
  }

  function openDashboard() {
    playClick();
    navigate("dashboard");
  }

  function toggleTeacherNotes() {
    playClick();
    const box = document.getElementById("teacher-content-box");
    const toggleBtnText = document.getElementById("teacher-toggle-text");
    if (!box) return;
    const isCollapsed = box.classList.toggle("collapsed");
    if (toggleBtnText) {
      if (isCollapsed) {
        toggleBtnText.textContent = state.lang === "en" ? "Show Teacher Guide 💡" : "मार्गदर्शिका देखें 💡";
      } else {
        toggleBtnText.textContent = state.lang === "en" ? "Hide Teacher Guide 👁️" : "मार्गदर्शिका छिपाएँ 👁️";
      }
    }
  }

  // =========================================================================
  // SVG CHARACTER FACTORY (Expressive, Animated Child & Actors)
  // =========================================================================
  function renderChildActorSVG(mood = "neutral") {
    const container = document.getElementById("svg-actor-right");
    if (!container) return;

    let mouthSVG = '<path d="M 50 68 Q 60 76 70 68" stroke="#991B1B" stroke-width="2.5" stroke-linecap="round" fill="none" />';
    let eyeSVG = `
      <circle cx="48" cy="52" r="3.5" fill="#1F2937" />
      <circle cx="72" cy="52" r="3.5" fill="#1F2937" />
    `;

    if (mood === "happy") {
      mouthSVG = '<path d="M 46 66 Q 60 82 74 66 Z" fill="#EF4444" stroke="#991B1B" stroke-width="1.5" />';
      eyeSVG = `
        <path d="M 44 54 Q 48 48 52 54" stroke="#1F2937" stroke-width="2.5" stroke-linecap="round" fill="none" />
        <path d="M 68 54 Q 72 48 76 54" stroke="#1F2937" stroke-width="2.5" stroke-linecap="round" fill="none" />
      `;
    } else if (mood === "thinking") {
      mouthSVG = '<path d="M 52 70 Q 60 66 68 70" stroke="#991B1B" stroke-width="2.5" stroke-linecap="round" fill="none" />';
      eyeSVG = `
        <circle cx="50" cy="48" r="3.5" fill="#1F2937" />
        <circle cx="74" cy="48" r="3.5" fill="#1F2937" />
      `;
    }

    container.innerHTML = `
      <svg viewBox="0 0 120 200" width="100%" height="100%">
        <ellipse cx="60" cy="190" rx="34" ry="7" fill="rgba(0,0,0,0.12)" />
        <g id="child-legs">
          <rect x="44" y="130" width="12" height="52" rx="6" fill="#3B82F6" />
          <rect x="64" y="130" width="12" height="52" rx="6" fill="#3B82F6" />
        </g>
        <path d="M 36 86 Q 60 80 84 86 L 80 134 L 40 134 Z" fill="#10B981" />
        <circle cx="60" cy="54" r="26" fill="#FED7AA" />
        <path d="M 34 50 C 34 26 86 26 86 50 C 86 38 78 32 60 32 C 42 32 34 38 34 50 Z" fill="#92400E" />
        <g>${eyeSVG}</g>
        <g>${mouthSVG}</g>
      </svg>
    `;
  }

  function renderLeftActorSVG(actorType) {
    const container = document.getElementById("svg-actor-left");
    if (!container) return;

    if (actorType === "stranger_male") {
      container.innerHTML = `
        <svg viewBox="0 0 120 200" width="100%" height="100%">
          <ellipse cx="60" cy="190" rx="36" ry="8" fill="rgba(0,0,0,0.12)" />
          <rect x="42" y="135" width="15" height="50" rx="7" fill="#4B5563" />
          <rect x="63" y="135" width="15" height="50" rx="7" fill="#4B5563" />
          <path d="M 32 90 Q 60 85 88 90 L 84 138 L 36 138 Z" fill="#2563EB" />
          <circle cx="60" cy="55" r="26" fill="#FDBA74" />
          <path d="M 34 50 C 34 25 86 25 86 50 Z" fill="#1F2937" />
          <circle cx="52" cy="53" r="3" fill="#1E293B" />
          <circle cx="68" cy="53" r="3" fill="#1E293B" />
          <path d="M 54 68 Q 60 74 66 68" stroke="#991B1B" stroke-width="2" stroke-linecap="round" fill="none" />
        </svg>
      `;
    } else if (actorType === "online_avatar") {
      container.innerHTML = `
        <svg viewBox="0 0 120 200" width="100%" height="100%">
          <ellipse cx="60" cy="190" rx="36" ry="8" fill="rgba(0,0,0,0.12)" />
          <rect x="42" y="135" width="15" height="50" rx="7" fill="#312E81" />
          <rect x="63" y="135" width="15" height="50" rx="7" fill="#312E81" />
          <path d="M 32 90 Q 60 85 88 90 L 84 138 L 36 138 Z" fill="#7C3AED" />
          <circle cx="60" cy="55" r="26" fill="#818CF8" />
          <rect x="42" y="46" width="36" height="14" rx="7" fill="#1E1B4B" />
          <circle cx="50" cy="53" r="3" fill="#34D399" />
          <circle cx="70" cy="53" r="3" fill="#34D399" />
        </svg>
      `;
    } else if (actorType === "store_staff") {
      container.innerHTML = `
        <svg viewBox="0 0 120 200" width="100%" height="100%">
          <ellipse cx="60" cy="190" rx="36" ry="8" fill="rgba(0,0,0,0.12)" />
          <rect x="42" y="135" width="15" height="50" rx="7" fill="#1E293B" />
          <rect x="63" y="135" width="15" height="50" rx="7" fill="#1E293B" />
          <path d="M 32 90 Q 60 85 88 90 L 84 138 L 36 138 Z" fill="#0D9488" />
          <rect x="42" y="100" width="16" height="8" rx="2" fill="#FEF08A" stroke="#CA8A04" stroke-width="0.5" />
          <circle cx="60" cy="55" r="26" fill="#FED7AA" />
          <path d="M 34 50 C 34 25 86 25 86 50 Z" fill="#374151" />
          <circle cx="52" cy="53" r="3" fill="#1E293B" />
          <circle cx="68" cy="53" r="3" fill="#1E293B" />
          <path d="M 52 68 Q 60 76 68 68" stroke="#991B1B" stroke-width="2" stroke-linecap="round" fill="none" />
        </svg>
      `;
    } else {
      container.innerHTML = `
        <svg viewBox="0 0 120 200" width="100%" height="100%">
          <ellipse cx="60" cy="190" rx="36" ry="8" fill="rgba(0,0,0,0.12)" />
          <rect x="42" y="135" width="15" height="50" rx="7" fill="#4B5563" />
          <rect x="63" y="135" width="15" height="50" rx="7" fill="#4B5563" />
          <path d="M 32 90 Q 60 85 88 90 L 84 138 L 36 138 Z" fill="#F59E0B" />
          <circle cx="60" cy="55" r="26" fill="#FDBA74" />
          <path d="M 34 50 C 34 25 86 25 86 50 Z" fill="#451A03" />
          <circle cx="52" cy="53" r="3" fill="#1E293B" />
          <circle cx="68" cy="53" r="3" fill="#1E293B" />
          <path d="M 54 68 Q 60 74 66 68" stroke="#991B1B" stroke-width="2" stroke-linecap="round" fill="none" />
        </svg>
      `;
    }
  }

  function escapeHtml(str) {
    if (typeof str !== "string") return str;
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // Public API
  return {
    navigate,
    toggleLanguage,
    toggleAudio,
    toggleTeacherNotes,
    setMode,
    setAgeGroup,
    generateRandomId,
    startJourney,
    startPostAssessment,
    openStory,
    openDashboard,
    setDashboardTab,
    onSelectIndividualSession,
    incrementVote,
    decrementVote,
    confirmPreClassVote,
    confirmPostClassVote,
    onPreChoiceSelect,
    onPostChoiceSelect,
    onGuidanceAcknowledge: () => renderGameStage(),
    exportDataJSON,
    exportDataCSV,
    exportMasterCSV,
    clearMasterRoster,
    deleteRosterEntry,
    startNewSession,
    celebrateMascot
  };
})();

// Auto-initialize when loaded
window.addEventListener("DOMContentLoaded", () => {
  console.log("GauriKit v3.0 initialized successfully.");
});