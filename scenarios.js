/**
 * GAURIKIT PEDAGOGICAL DATASET & BILINGUAL TRANSLATIONS
 * Contains: UI Strings, Pre-Assessment, 4 Interactive Learning Scenarios,
 * Post-Assessment Transfer Scenarios, and Cognitive Skill Mapping.
 */

const GAURI_DATA = {
  // Bilingual UI Localization Dictionary
  i18n: {
    en: {
      tagline: "Safe Choices, Smart Minds",
      navDashboard: "Researcher Hub",
      welcomeTitle: "Welcome to GauriKit",
      welcomeDesc: "A calm, interactive story space to practice real-world situations, evaluate decision-making, and build lifelong safety instincts.",
      participantIdLabel: "Child / Class ID:",
      institutionLabel: "School / Institution (stored locally & confidentially):",
      randomBtn: "Randomize",
      ageGroupLabel: "Age Group / Grade:",
      startJourneyBtn: "Start Safety Journey 🚀",
      startNewSessionBtn: "Start Next Session ➔",
      preTestTag: "Pre-Assessment: Baseline Instincts",
      postTestTag: "Post-Assessment: Learning Transfer",
      questionStep: "Situation",
      whatWouldYouDo: "What would you do?",
      hubTitle: "Interactive Safety Stories",
      hubSubtitle: "Choose a story to enter the animated environment and practice critical safety decisions.",
      proceedPostBtn: "Ready for Final Post-Assessment ⭐",
      backToStories: "Stories Hub",
      learningMode: "Learning & Reflection",
      guideName: "Gauri Guide:",
      youTag: "You",
      tryAnotherChoice: "Try Another Choice ↺",
      continueStory: "Continue to Next Story ⭐",
      dashboardTitle: "Educator & Researcher Analytics Hub",
      dashboardSubtitle: "Rigorous empirical evaluation of child safety decision-making, isomorphic learning transfer, and cognitive skill progression.",
      exportJsonBtn: "Export JSON",
      exportCsvBtn: "Export CSV",
      exportMasterCsvBtn: "Download Master CSV",
      clearHistoryBtn: "Clear Local History",
      printReportBtn: "Print Report",
      
      // Dashboard Tabs
      tabOverview: "📊 Overview & Stats",
      tabIndividual: "🧑‍🎓 Individual Student Explorer",
      tabClassroom: "🏫 Classroom Discussion Analytics",
      tabAgeCohorts: "👥 Data-Driven Age Cohorts",
      tabMasterRoster: "📁 Master Session Records",
      
      // Overview Metric Labels
      statTotalParticipants: "Total Participants",
      statCompletedSessions: "Completed Sessions",
      statIndividualRuns: "Individual Evaluations",
      statClassroomRuns: "Classroom Discussions",
      statAvgObservedGrowth: "Avg Observed Growth (Δ)",
      
      // Individual Detail Labels
      selectStudentPrompt: "Select a participant to inspect detailed metrics:",
      individualPreScore: "Pre-Assessment Baseline:",
      individualPostScore: "Post-Assessment Transfer:",
      individualObservedChange: "Observed Net Change (Δ):",
      strongestSkillLabel: "Strongest Observed Skill:",
      weakestSkillLabel: "Key Growth Focus Area:",
      percentagePoints: "percentage points",
      
      // Classroom Labels
      classShiftTitle: "Classroom Collective Decision Shift",
      classShiftSub: "Aggregated show-of-hands vote shift from baseline instincts to verified safe actions.",
      totalClassVotesPolled: "Total Hands Polled Across Class",
      classPreSafePct: "Class Pre-Test Safe Ratio",
      classPostSafePct: "Class Post-Test Safe Ratio",
      classConsensusShift: "Class Consensus Shift (Δ)",
      
      // Age Cohort Labels
      ageCohortTitle: "Age-Group Empirical Comparison",
      ageCohortSub: "Actual cohort performance calculated strictly from stored participant session data.",
      noCohortData: "No sessions recorded yet for this age group.",
      
      // Competency Labels
      skillsMasteredTitle: "Key Life Safety Competencies Mastered",
      skillsMasteredSub: "Empirical mastery of core real-world safety rules and behavioral habits.",
      
      // Master Log Columns
      colWhen: "Date & Time",
      colInstitution: "Institution",
      colId: "Participant / Class ID",
      colAge: "Age Group",
      colMode: "Mode",
      colPre: "Pre-Test",
      colPost: "Post-Test",
      colGrowth: "Growth (Δ)",
      colAction: "Actions",
      
      // Empty States
      noSessionsRecorded: "No sessions recorded yet. Complete a safety journey to generate empirical data.",
      notEnoughDataYet: "Not enough data recorded yet.",
      selectStudentEmpty: "Please select a student from the list above.",
      
      // Teacher Guide
      teacherGuideTitle: "Teacher / Facilitator Guide",
      askTheClass: "Ask the Class (Discussion Prompt):",
      keySafetyRule: "Key Safety Lesson to Teach:",
      hideTeacherGuide: "Hide Teacher Guide 👁️",
      showTeacherGuide: "Show Teacher Guide 💡",
      
      // Facilitation Mode
      modeSelectLabel: "Facilitation Mode:",
      modeClassroom: "🏫 Whole-Classroom Discussion & Poll Mode",
      modeIndividual: "🧑‍🎓 Single Student Mode",
      classPollTitle: "Live Class Poll & Show-of-Hands",
      handsUpPrompt: "Count show-of-hands for each option:",
      classConsensusBadge: "Classroom Consensus:",
      castClassVotesBtn: "Confirm Class Votes & Continue ➔",
      
      skillVectorTitle: "6-Skill Vector Growth (Pre vs. Post)",
      skillVectorSub: "Empirical measurement across baseline and transfer test responses.",
      radarTitle: "Cognitive Transfer Radar",
      radarSub: "Pre-Assessment Baseline (Amber) vs Post-Assessment Transfer (Emerald)",
      trajectoryTitle: "Decision & Learning Trajectory Log",
      trajectorySub: "Chronological record of situations encountered, choices made, and reflection cycles."
    },
    hi: {
      tagline: "सुरक्षित विकल्प, सजग मन",
      navDashboard: "शोधकर्ता हब",
      welcomeTitle: "गौरीकिट (GauriKit) में आपका स्वागत है",
      welcomeDesc: "वास्तविक स्थितियों को समझने, सही निर्णय लेने और खुद को सुरक्षित रखने का एक शांत और इंटरैक्टिव मंच।",
      participantIdLabel: "बच्चा / कक्षा आईडी:",
      institutionLabel: "स्कूल / संस्था (केवल इसी कंप्यूटर पर सुरक्षित):",
      randomBtn: "बदलें",
      ageGroupLabel: "आयु वर्ग / कक्षा स्तर:",
      startJourneyBtn: "सुरक्षा यात्रा शुरू करें 🚀",
      startNewSessionBtn: "अगला सत्र शुरू करें ➔",
      preTestTag: "पूर्व-मूल्यांकन: प्रारंभिक समझ",
      postTestTag: "उत्तर-मूल्यांकन: कौशल परीक्षण",
      questionStep: "परिस्थिति",
      whatWouldYouDo: "आप क्या करेंगे?",
      hubTitle: "सुरक्षा कहानियाँ चुनें",
      hubSubtitle: "एनिमेटेड दुनिया में जाने और महत्वपूर्ण सुरक्षा निर्णय लेने के लिए एक कहानी चुनें।",
      proceedPostBtn: "अंतिम मूल्यांकन के लिए तैयार ⭐",
      backToStories: "कहानियों पर वापस जाएँ",
      learningMode: "सीखने और समझने का मोड",
      guideName: "गौरी मार्गदर्शक:",
      youTag: "आप",
      tryAnotherChoice: "दूसरा विकल्प चुनें ↺",
      continueStory: "अगली कहानी पर जाएँ ⭐",
      dashboardTitle: "शोधकर्ता एवं शिक्षक मूल्यांकन केंद्र",
      dashboardSubtitle: "संज्ञानात्मक कौशल का बहुआयामी विश्लेषण, आयु-वर्ग तुलना और वास्तविक जीवन सुरक्षा कौशल।",
      exportJsonBtn: "JSON डाउनलोड करें",
      exportCsvBtn: "CSV डाउनलोड करें",
      exportMasterCsvBtn: "मास्टर CSV डाउनलोड करें",
      clearHistoryBtn: "इतिहास साफ़ करें",
      printReportBtn: "रिपोर्ट प्रिंट करें",
      
      // Dashboard Tabs
      tabOverview: "📊 समग्र विवरण",
      tabIndividual: "🧑‍🎓 छात्र विवरण",
      tabClassroom: "🏫 कक्षा चर्चा विश्लेषण",
      tabAgeCohorts: "👥 आयु-वर्ग तुलना",
      tabMasterRoster: "📁 सभी दर्ज सत्र",
      
      // Overview Metric Labels
      statTotalParticipants: "कुल प्रतिभागी",
      statCompletedSessions: "पूर्ण सत्र",
      statIndividualRuns: "एकल मूल्यांकन",
      statClassroomRuns: "कक्षा चर्चाएँ",
      statAvgObservedGrowth: "औसत सुधार (Δ)",
      
      // Individual Detail Labels
      selectStudentPrompt: "सत्र विवरण देखने के लिए प्रतिभागी चुनें:",
      individualPreScore: "पूर्व-मूल्यांकन स्कोर:",
      individualPostScore: "उत्तर-मूल्यांकन स्कोर:",
      individualObservedChange: "वास्तविक सुधार (Δ):",
      strongestSkillLabel: "सर्वश्रेष्ठ प्रदर्शित कौशल:",
      weakestSkillLabel: "सुधार का मुख्य क्षेत्र:",
      percentagePoints: "प्रतिशत अंक",
      
      // Classroom Labels
      classShiftTitle: "कक्षा के सामूहिक निर्णय में बदलाव",
      classShiftSub: "जोखिम भरे निर्णयों से सुरक्षित आदतों की ओर बदलने वाले छात्रों का अनुपात।",
      totalClassVotesPolled: "कक्षा में कुल वोट",
      classPreSafePct: "पूर्व-परीक्षण सुरक्षित अनुपात",
      classPostSafePct: "उत्तर-परीक्षण सुरक्षित अनुपात",
      classConsensusShift: "कक्षा सर्वसम्मत सुधार (Δ)",
      
      // Age Cohort Labels
      ageCohortTitle: "आयु-वर्ग वास्तविक तुलना",
      ageCohortSub: "सहेजे गए सत्र डेटा से सीधे परिकलित वास्तविक परिणाम।",
      noCohortData: "इस आयु वर्ग के लिए अभी कोई सत्र दर्ज नहीं है।",
      
      // Competency Labels
      skillsMasteredTitle: "सीखे गए मुख्य जीवन सुरक्षा कौशल",
      skillsMasteredSub: "छात्रों द्वारा सीखे गए व्यावहारिक सुरक्षा नियम और आदतें।",
      
      // Master Log Columns
      colWhen: "दिनांक व समय",
      colInstitution: "संस्था",
      colId: "आईडी",
      colAge: "आयु वर्ग",
      colMode: "मोड",
      colPre: "पूर्व-परीक्षण",
      colPost: "उत्तर-परीक्षण",
      colGrowth: "सुधार (Δ)",
      colAction: "कार्रवाई",
      
      // Empty States
      noSessionsRecorded: "अभी कोई सत्र दर्ज नहीं है। डेटा देखने के लिए एक सुरक्षा यात्रा पूरी करें।",
      notEnoughDataYet: "पर्याप्त डेटा अभी उपलब्ध नहीं है।",
      selectStudentEmpty: "कृपया ऊपर दी गई सूची में से एक छात्र चुनें।",
      
      // Teacher Guide
      teacherGuideTitle: "शिक्षक / संचालक मार्गदर्शिका",
      askTheClass: "कक्षा से पूछें (चर्चा का प्रश्न):",
      keySafetyRule: "समझाने योग्य मुख्य सुरक्षा नियम:",
      hideTeacherGuide: "मार्गदर्शिका छिपाएँ 👁️",
      showTeacherGuide: "मार्गदर्शिका देखें 💡",
      
      // Facilitation Mode
      modeSelectLabel: "शिक्षण मोड:",
      modeClassroom: "🏫 पूरी कक्षा चर्चा एवं वोटिंग मोड",
      modeIndividual: "🧑‍🎓 एकल छात्र मोड",
      classPollTitle: "लाइव कक्षा पोल एवं हाथ उठाना",
      handsUpPrompt: "प्रत्येक विकल्प के लिए हाथ उठाने वाले बच्चों की संख्या दर्ज करें:",
      classConsensusBadge: "कक्षा का सर्वसम्मत निर्णय:",
      castClassVotesBtn: "कक्षा के वोट दर्ज करें और आगे बढ़ें ➔",
      
      skillVectorTitle: "6-कौशल विकास (पूर्व बनाम उत्तर)",
      skillVectorSub: "विभिन्न परिस्थितियों में बच्चों की समझ और निर्णय क्षमता का मापन।",
      radarTitle: "संज्ञानात्मक रडार चार्ट",
      radarSub: "पूर्व-परीक्षण (नारंगी) बनाम उत्तर-परीक्षण (हरा)",
      trajectoryTitle: "निर्णय एवं शिक्षण इतिहास",
      trajectorySub: "कक्षा द्वारा सीखे गए मुख्य नियमों का विवरण।"
    }
  },

  // 6 Cognitive Dimensions Definitions
  skills: {
    risk_recognition: {
      id: "risk_recognition",
      name_en: "Risk Recognition",
      name_hi: "जोखिम पहचान",
      desc_en: "Recognizing red flags and unsafe requests.",
      desc_hi: "खतरे और असुरक्षित संकेतों को पहचानना।"
    },
    verification: {
      id: "verification",
      name_en: "Verification",
      name_hi: "पुष्टि करना (सत्यापन)",
      desc_en: "Checking facts with parents/teachers before trusting.",
      desc_hi: "भरोसा करने से पहले माता-पिता या शिक्षक से पुष्टि करना।"
    },
    help_seeking: {
      id: "help_seeking",
      name_en: "Help Seeking",
      name_hi: "मदद मांगना",
      desc_en: "Approaching reliable, identified safe adults.",
      desc_hi: "सुरक्षित और पहचान वाले बड़ों से तुरंत मदद मांगना।"
    },
    boundary_setting: {
      id: "boundary_setting",
      name_en: "Boundary Setting",
      name_hi: "सीमाएं तय करना (ना कहना)",
      desc_en: "Saying a clear NO to uncomfortable requests.",
      desc_hi: "असहज करने वाली बातों पर स्पष्ट 'ना' कहना।"
    },
    impulse_control: {
      id: "impulse_control",
      name_en: "Impulse Control",
      name_hi: "धैर्य व आत्म-नियंत्रण",
      desc_en: "Pausing to think instead of rushing into danger.",
      desc_hi: "बिना सोचे समझे जल्दबाजी में कदम न उठाना।"
    },
    problem_solving: {
      id: "problem_solving",
      name_en: "Problem Solving",
      name_hi: "समस्या समाधान",
      desc_en: "Choosing calm, logical steps under uncertainty.",
      desc_hi: "मुश्किल स्थिति में शांत रहकर सही कदम उठाना।"
    }
  },

  // Practical Life Safety Competencies Acquired
  lifeCompetencies: [
    {
      id: "comp_transport",
      icon: "🚗",
      title_en: "Vehicle & Ride Verification Rule",
      title_hi: "वाहन एवं सवारी सत्यापन नियम",
      takeaway_en: "Never enter an unexpected vehicle. Safe adults will always wait while you check with a teacher or parent first.",
      takeaway_hi: "किसी भी अप्रत्याशित वाहन में न बैठें। सुरक्षित बड़े हमेशा शिक्षक या माता-पिता से पुष्टि करने तक इंतज़ार करेंगे।",
      skillKey: "verification"
    },
    {
      id: "comp_digital",
      icon: "🔒",
      title_en: "Digital Privacy & Identity Defense",
      title_hi: "डिजिटल गोपनीयता एवं पहचान सुरक्षा",
      takeaway_en: "School names, home addresses, and personal photos must stay locked like house keys—never shared with online gaming contacts.",
      takeaway_hi: "स्कूल का नाम, घर का पता और निजी तस्वीरें घर की चाबी की तरह सुरक्षित रहनी चाहिए—ऑनलाइन गेम में कभी साझा न करें।",
      skillKey: "boundary_setting"
    },
    {
      id: "comp_crowd",
      icon: "📍",
      title_en: "Public Separation Protocol",
      title_hi: "भीड़ में अलग होने पर सुरक्षा प्रोटोकॉल",
      takeaway_en: "When separated in public, freeze in place and look for uniformed staff/cashiers. Never leave the premises with a stranger.",
      takeaway_hi: "भीड़ में अलग होने पर एक ही जगह रुकें और वर्दी वाले कर्मचारी को ढूँढें। किसी अनजान के साथ परिसर छोड़कर कभी न जाएँ।",
      skillKey: "help_seeking"
    },
    {
      id: "comp_secrets",
      icon: "🗣️",
      title_en: "Unsafe Secrets vs. Happy Surprises",
      title_hi: "असुरक्षित रहस्य बनाम सुखद सरप्राइज",
      takeaway_en: "Surprises bring joy to everyone; unsafe secrets cause worry and demand hiding things from parents. Always tell parents immediately.",
      takeaway_hi: "सरप्राइज सबको खुशी देते हैं; गलत रहस्य चिंता पैदा करते हैं और माता-पिता से छिपाने को कहते हैं। माता-पिता को तुरंत बताएं।",
      skillKey: "risk_recognition"
    }
  ],

  // Age Group Developmental Descriptions (Qualitative Guidelines)
  ageCohortFocus: {
    "6-8": {
      name_en: "Early Primary (Ages 6 - 8)",
      name_hi: "प्राथमिक स्तर (आयु 6 - 8 वर्ष)",
      keyVulnerability_en: "High trust in friendly adults & difficulty distinguishing between happy surprises and anxious secrets.",
      keyVulnerability_hi: "अनजान बड़ों पर जल्दी भरोसा करना और सुखद सरप्राइज तथा डरावने रहस्यों में अंतर न कर पाना।"
    },
    "9-11": {
      name_en: "Upper Primary (Ages 9 - 11)",
      name_hi: "उच्च प्राथमिक (आयु 9 - 11 वर्ष)",
      keyVulnerability_en: "Digital oversharing in online gaming and peer pressure around keeping secrets from parents.",
      keyVulnerability_hi: "ऑनलाइन गेमिंग में निजी जानकारी साझा करना और दोस्तों के दबाव में माता-पिता से बातें छिपाना।"
    },
    "12+": {
      name_en: "Middle School / Adolescents (Ages 12+)",
      name_hi: "माध्यमिक / किशोर (आयु 12+ वर्ष)",
      keyVulnerability_en: "Overconfidence when navigating public spaces alone and unverified online stranger interactions.",
      keyVulnerability_hi: "अकेले बाहर जाने में अति-आत्मविश्वास और इंटरनेट पर अपरिचित लोगों से अनियंत्रित संवाद।"
    }
  },

  // 1. PRE-ASSESSMENT (Baseline Scenarios)
  preAssessment: [
    {
      id: "pre_1",
      category: "stranger_approach",
      icon: "🍦",
      title_en: "Ice Cream Near The Park",
      title_hi: "पार्क के पास आइसक्रीम",
      story_en: "You are playing in the park. An adult in a van says: 'I have delicious free ice creams inside my van! Come over here to choose your favorite flavor.'",
      story_hi: "आप पार्क में खेल रहे हैं। वैन में बैठा एक अनजान व्यक्ति कहता है: 'मेरी वैन में बहुत स्वादिष्ट मुफ्त आइसक्रीम है! अपना पसंदीदा स्वाद चुनने अंदर आओ।'",
      choices: [
        {
          id: "pre_1_a",
          text_en: "Walk to the van to look at the flavors.",
          text_hi: "आइसक्रीम देखने के लिए वैन के पास चले जाएँ।",
          skills: { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 },
          isSafe: false
        },
        {
          id: "pre_1_b",
          text_en: "Stay where your family can see you, say 'No thank you' and tell your parents.",
          text_hi: "जहाँ आपके परिवारजन देख सकें वहीं रहें, 'नहीं शुक्रिया' कहें और माता-पिता को बताएं।",
          skills: { risk_recognition: 1, verification: 1, help_seeking: 1, boundary_setting: 1, impulse_control: 1, problem_solving: 1 },
          isSafe: true
        },
        {
          id: "pre_1_c",
          text_en: "Tell other kids to go get the free ice cream.",
          text_hi: "दूसरे बच्चों को मुफ्त आइसक्रीम लेने के लिए कहें।",
          skills: { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 },
          isSafe: false
        }
      ]
    },
    {
      id: "pre_2",
      category: "online_safety",
      icon: "🎮",
      title_en: "Friendly Game Chat",
      title_hi: "ऑनलाइन गेम में चैट",
      story_en: "While playing a fun multiplayer game, another player you don't know in real life messages you: 'You are so good! What is your full real name and which city do you live in?'",
      story_hi: "एक ऑनलाइन गेम खेलते समय, एक अनजान खिलाड़ी आपको संदेश भेजता है: 'आप बहुत अच्छा खेलते हैं! आपका पूरा असली नाम और शहर क्या है?'",
      choices: [
        {
          id: "pre_2_a",
          text_en: "Type your real name and city since they are friendly.",
          text_hi: "अपना असली नाम और शहर लिख दें क्योंकि वे बहुत दोस्ताना लग रहे हैं।",
          skills: { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 },
          isSafe: false
        },
        {
          id: "pre_2_b",
          text_en: "Keep your gaming nickname, never share personal details, and tell a parent if they keep asking.",
          text_hi: "केवल गेम का उपनाम रखें, निजी जानकारी कभी न दें और बार-बार पूछने पर माता-पिता को बताएं।",
          skills: { risk_recognition: 1, verification: 1, help_seeking: 1, boundary_setting: 1, impulse_control: 1, problem_solving: 1 },
          isSafe: true
        },
        {
          id: "pre_2_c",
          text_en: "Ask them for their name and address instead.",
          text_hi: "बदले में उनसे उनका नाम और पता पूछें।",
          skills: { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 },
          isSafe: false
        }
      ]
    },
    {
      id: "pre_3",
      category: "lost_public",
      icon: "🎡",
      title_en: "Amusement Park Crowd",
      title_hi: "मेले की भीड़ में अलग होना",
      story_en: "You are watching a magic show at a fair. When you turn around, your parents aren't next to you in the crowd.",
      story_hi: "आप मेले में जादू का खेल देख रहे हैं। जब आप पीछे मुड़ते हैं, तो भीड़ में आपके माता-पिता पास नहीं दिखते।",
      choices: [
        {
          id: "pre_3_a",
          text_en: "Run out through the main gates to search the busy parking lot.",
          text_hi: "भीड़ भरे पार्किंग क्षेत्र में खोजने के लिए मुख्य द्वार से बाहर भागें।",
          skills: { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 },
          isSafe: false
        },
        {
          id: "pre_3_b",
          text_en: "Stay in one safe spot and look for an official park worker with a uniform or nametag for help.",
          text_hi: "एक सुरक्षित स्थान पर रुकें, और वर्दी या नेमटैग वाले आधिकारिक कर्मचारी से मदद मांगें।",
          skills: { risk_recognition: 1, verification: 1, help_seeking: 1, boundary_setting: 1, impulse_control: 1, problem_solving: 1 },
          isSafe: true
        },
        {
          id: "pre_3_c",
          text_en: "Ask an unknown visitor leaving the park to give you a ride home.",
          text_hi: "मेले से बाहर जा रहे किसी अनजान व्यक्ति से घर छोड़ने को कहें।",
          skills: { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 },
          isSafe: false
        }
      ]
    },
    {
      id: "pre_4",
      category: "secrets_boundaries",
      icon: "🤫",
      title_en: "The Broken Toy Secret",
      title_hi: "टूटे खिलौने का रहस्य",
      story_en: "An older neighborhood acquaintance accidentally breaks a lamp at your house and whispers: 'Don't ever tell your parents. This is our secret or you will get in trouble.'",
      story_hi: "पड़ोस का एक बड़ा परिचित आपके घर का लैंप गलती से तोड़ देता है और कहता है: 'माता-पिता को कभी मत बताना। यह हमारा रहस्य है वरना तुम डांट खाओगे।'",
      choices: [
        {
          id: "pre_4_a",
          text_en: "Keep the secret and hide the pieces under the sofa.",
          text_hi: "रहस्य छुपाएं और टुकड़ों को सोफे के नीचे छिपा दें।",
          skills: { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 },
          isSafe: false
        },
        {
          id: "pre_4_b",
          text_en: "Calmly tell your parents what happened because secrets that make you worry should always be shared.",
          text_hi: "शांति से अपने माता-पिता को पूरी बात बताएं, क्योंकि जो रहस्य आपको चिंतित करे उसे हमेशा साझा करना चाहिए।",
          skills: { risk_recognition: 1, verification: 1, help_seeking: 1, boundary_setting: 1, impulse_control: 1, problem_solving: 1 },
          isSafe: true
        },
        {
          id: "pre_4_c",
          text_en: "Blame a pet or sibling so you don't get in trouble.",
          text_hi: "किसी पालतू जानवर या भाई-बहन पर आरोप लगा दें।",
          skills: { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 },
          isSafe: false
        }
      ]
    }
  ],

  // 2. THE 4 RICH ANIMATED LEARNING SCENARIOS (Interactive with branching feedback)
  learningScenarios: [
    {
      id: "learn_1",
      category: "stranger_approach",
      icon: "🚗",
      tag_en: "Physical Safety & Transport",
      tag_hi: "शारीरिक सुरक्षा एवं वाहन",
      title_en: "The Unexpected Ride Offer",
      title_hi: "अनजान व्यक्ति द्वारा घर छोड़ने की पेशकश",
      desc_en: "An unfamiliar adult approaches you outside school claiming your mum sent them to drop you home.",
      desc_hi: "स्कूल के बाहर एक अनजान व्यक्ति आपसे कहता है कि आपकी माँ ने उसे आपको घर छोड़ने भेजा है।",
      env: "school",
      actorLeft: "stranger_male",
      nametagLeft_en: "Unfamiliar Adult",
      nametagLeft_hi: "अनजान व्यक्ति",
      initialDialogue_en: "\"Hi there! Your mum asked me to drop you home quickly. Hop in!\"",
      initialDialogue_hi: "\"नमस्ते! आपकी मम्मी ने मुझे आपको घर छोड़ने के लिए कहा है। गाड़ी में बैठो!\"",
      guidePrompt_en: "Something feels strange. Let's look at the situation and choose wisely.",
      guidePrompt_hi: "यह बात कुछ अजीब लग रही है। स्थिति को समझें और सही निर्णय लें।",
      teacherPrompt_en: "Ask the class: 'What would you do if an adult you don't know says your Mum asked them to pick you up?' Discuss why checking with a teacher or using a family safe-word protects you.",
      teacherPrompt_hi: "कक्षा से पूछें: 'यदि कोई अनजान व्यक्ति कहे कि आपकी मम्मी ने भेजा है, तो आप क्या करेंगे?' समझाएँ कि शिक्षक से पूछना या पारिवारिक गुप्त शब्द का उपयोग करना क्यों ज़रूरी है।",
      keyRule_en: "Rule for Children: Safe adults will never mind waiting while you check with a teacher or parent first.",
      keyRule_hi: "बच्चों के लिए नियम: सुरक्षित बड़े हमेशा शिक्षक या माता-पिता से पुष्टि करने तक इंतज़ार करने में कभी बुरा नहीं मानेंगे।",
      choices: [
        {
          id: "l1_c1",
          text_en: "Go with the adult and get into the car.",
          text_hi: "व्यक्ति के साथ जाएँ और कार में बैठ जाएँ।",
          rating: "unsafe",
          skills: { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 },
          guidanceTitle_en: "Let's Pause and Think 🌱",
          guidanceTitle_hi: "रुकिए और सोचिए 🌱",
          guidanceBody_en: "Even if someone knows your name or says your parents sent them, never get into a vehicle with anyone unexpected. Safe adults will always be happy to wait while you verify with a teacher.",
          guidanceBody_hi: "भले ही कोई आपका नाम जानता हो या कहे कि आपके माता-पिता ने भेजा है, किसी भी अप्रत्याशित व्यक्ति की गाड़ी में कभी न बैठें। सुरक्षित बड़े हमेशा शिक्षक से पुष्टि करने तक इंतजार करने में खुश होंगे।",
          actorReaction: "think_concern"
        },
        {
          id: "l1_c2",
          text_en: "Ask: 'What is our family secret safe-word?' and step back toward school.",
          text_hi: "'हमारे परिवार का गुप्त सुरक्षित शब्द (Safe-word) क्या है?' पूछें और स्कूल की ओर कदम बढ़ाएं।",
          rating: "safe",
          skills: { risk_recognition: 1, verification: 1, help_seeking: 1, boundary_setting: 1, impulse_control: 1, problem_solving: 1 },
          guidanceTitle_en: "Excellent Critical Thinking! ⭐",
          guidanceTitle_hi: "शानदार समझदारी! ⭐",
          guidanceBody_en: "Using a secret family safe-word or asking for verification keeps you completely in control. The stranger doesn't know the password, and you stayed near the school safety zone.",
          guidanceBody_hi: "पारिवारिक गुप्त शब्द का उपयोग करना या पुष्टि मांगना आपको सुरक्षित रखता है। अनजान व्यक्ति को पासवर्ड नहीं पता होगा और आप सुरक्षित रहेंगे।",
          actorReaction: "safe_smile"
        },
        {
          id: "l1_c3",
          text_en: "Say 'No thank you, I will wait inside with my teacher' and walk into school.",
          text_hi: "'नहीं शुक्रिया, मैं अंदर शिक्षक के साथ इंतज़ार करूँगा' कहें और स्कूल के अंदर चले जाएँ।",
          rating: "safe",
          skills: { risk_recognition: 1, verification: 1, help_seeking: 1, boundary_setting: 1, impulse_control: 1, problem_solving: 1 },
          guidanceTitle_en: "Super Boundary Setting! 🛡️",
          guidanceTitle_hi: "बेहतरीन सुरक्षा सीमा! 🛡️",
          guidanceBody_en: "Moving immediately to a designated safe adult (any of your teachers) and staying inside the school office is the gold standard of safety.",
          guidanceBody_hi: "तुरंत किसी सुरक्षित बड़े (शिक्षक या प्रिंसिपल) के पास जाना और स्कूल कार्यालय के अंदर रहना सुरक्षा का सबसे उत्तम नियम है।",
          actorReaction: "safe_smile"
        },
        {
          id: "l1_c4",
          text_en: "Run alone through an empty back-alley to escape.",
          text_hi: "बचने के लिए अकेले किसी सुनसान पीछे वाली गली से भागें।",
          rating: "partial",
          skills: { risk_recognition: 1, verification: 0, help_seeking: 0, boundary_setting: 1, impulse_control: 0, problem_solving: 0 },
          guidanceTitle_en: "Let's Reflect on Where to Go 🌱",
          guidanceTitle_hi: "सोचिए कि कहाँ जाना सुरक्षित है 🌱",
          guidanceBody_en: "You recognized the risk (which is great!), but running into isolated or quiet alleys is unsafe. Always head toward open public places with trusted adults like teachers or shopkeepers.",
          guidanceBody_hi: "आपने खतरे को पहचाना (यह बहुत अच्छा है!), लेकिन सुनसान गलियों में भागना सुरक्षित नहीं है। हमेशा शिक्षकों या दुकानों जैसे खुले और सुरक्षित स्थानों की ओर जाएँ।",
          actorReaction: "think_concern"
        }
      ]
    },

    {
      id: "learn_2",
      category: "online_safety",
      icon: "💻",
      tag_en: "Digital Footprint & Online Strangers",
      tag_hi: "डिजिटल सुरक्षा एवं ऑनलाइन अजनबी",
      title_en: "The Online Friend's Request",
      title_hi: "ऑनलाइन दोस्त का निजी अनुरोध",
      desc_en: "A player you met in an online game sends friendly messages, then asks for your school name and a photo.",
      desc_hi: "ऑनलाइन गेम में मिला एक खिलाड़ी अच्छी बातें करता है, फिर आपके स्कूल का नाम और फोटो मांगता है।",
      env: "room",
      actorLeft: "online_avatar",
      nametagLeft_en: "Online Gamer 'Shadow99'",
      nametagLeft_hi: "ऑनलाइन खिलाड़ी 'शैडो99'",
      initialDialogue_en: "\"Hey! You seem really cool. What's your school name? Can you send me a quick picture?\"",
      initialDialogue_hi: "\"अरे! तुम बहुत अच्छे हो। तुम्हारे स्कूल का क्या नाम है? क्या तुम मुझे अपनी एक फोटो भेज सकते हो?\"",
      guidePrompt_en: "Private details are like house keys... keep them secure.",
      guidePrompt_hi: "निजी जानकारी घर की चाबी जैसी है—इसे सुरक्षित रखें।",
      teacherPrompt_en: "Ask the class: 'Is an online friend the same as a real-life friend?' Emphasize that anyone online can pretend to be a child.",
      teacherPrompt_hi: "कक्षा से पूछें: 'क्या ऑनलाइन दोस्त असली दोस्त जैसा होता है?' समझाएँ कि इंटरनेट पर कोई भी खुद को बच्चा बता सकता है।",
      keyRule_en: "Rule for Children: Never share your school name, home address, real name, or photos with online gaming contacts.",
      keyRule_hi: "बच्चों के लिए नियम: ऑनलाइन गेमिंग में कभी भी अपना स्कूल, घर का पता, असली नाम या फोटो साझा न करें।",
      choices: [
        {
          id: "l2_c1",
          text_en: "Send your school badge photo to show them your uniform.",
          text_hi: "उन्हें अपने स्कूल बैज की फोटो भेज दें।",
          rating: "unsafe",
          skills: { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 },
          guidanceTitle_en: "Protect Your Digital Identity 🌱",
          guidanceTitle_hi: "अपनी डिजिटल पहचान सुरक्षित रखें 🌱",
          guidanceBody_en: "School badges and uniforms reveal exactly where you are in real life. Keep all personal details locked away—just like your house keys!",
          guidanceBody_hi: "स्कूल बैज और यूनिफॉर्म से पता चल जाता है कि आप असल ज़िंदगी में कहाँ रहते हैं। अपनी निजी जानकारी को हमेशा बंद ताले की तरह सुरक्षित रखें!",
          actorReaction: "think_concern"
        },
        {
          id: "l2_c2",
          text_en: "Politely say: 'I don't share real-life details in games' and keep playing safely.",
          text_hi: "'मैं गेम में निजी जानकारी साझा नहीं करता' कहें और सुरक्षित खेलें।",
          rating: "safe",
          skills: { risk_recognition: 1, verification: 1, help_seeking: 1, boundary_setting: 1, impulse_control: 1, problem_solving: 1 },
          guidanceTitle_en: "Awesome Boundary Setting! ⭐",
          guidanceTitle_hi: "बेहतरीन सुरक्षा सीमा! ⭐",
          guidanceBody_en: "You protected your privacy while keeping your gaming fun. You are in full control of what you share!",
          guidanceBody_hi: "आपने गेम का मज़ा लेते हुए अपनी गोपनीयता की रक्षा की। आप जो साझा करते हैं उस पर आपका पूरा नियंत्रण है!",
          actorReaction: "safe_smile"
        },
        {
          id: "l2_c3",
          text_en: "Block the user and show the messages to your parents right away.",
          text_hi: "यूजर को ब्लॉक करें और तुरंत अपने माता-पिता को संदेश दिखाएं।",
          rating: "safe",
          skills: { risk_recognition: 1, verification: 1, help_seeking: 1, boundary_setting: 1, impulse_control: 1, problem_solving: 1 },
          guidanceTitle_en: "Proactive Digital Defense! 🛡️",
          guidanceTitle_hi: "सक्रिय डिजिटल सुरक्षा! 🛡️",
          guidanceBody_en: "When anyone online makes you feel uneasy or repeatedly asks for personal details, involving your parents is the best move.",
          guidanceBody_hi: "जब भी ऑनलाइन कोई व्यक्ति असहज करे या बार-बार निजी जानकारी मांगे, तो माता-पिता को शामिल करना सबसे सही निर्णय है।",
          actorReaction: "safe_smile"
        }
      ]
    },

    {
      id: "learn_3",
      category: "lost_public",
      icon: "🏬",
      tag_en: "Crowded Places & Separation Protocol",
      tag_hi: "भीड़-भाड़ वाली जगहें एवं सुरक्षा",
      title_en: "Lost in the Shopping Mall",
      title_hi: "शॉपिंग मॉल में परिवार से अलग होना",
      desc_en: "You are looking at toys and realize your family walked to the next aisle and you can't see them.",
      desc_hi: "आप खिलौने देख रहे हैं और अचानक पाते हैं कि आपका परिवार आगे निकल गया है और दिखाई नहीं दे रहा।",
      env: "mall",
      actorLeft: "store_staff",
      nametagLeft_en: "Uniformed Store Cashier",
      nametagLeft_hi: "वर्दी वाले स्टोर कर्मचारी",
      initialDialogue_en: "\"Hello young friend! Are you looking for your family? How can I help you?\"",
      initialDialogue_hi: "\"नमस्ते छोटे दोस्त! क्या आप अपने परिवार को ढूंढ रहे हैं? मैं आपकी क्या मदद कर सकता हूँ?\"",
      guidePrompt_en: "Stay calm. Freeze in place or find an identified helper.",
      guidePrompt_hi: "शांत रहें। एक ही जगह रुकें या वर्दी वाले कर्मचारी को ढूँढें।",
      teacherPrompt_en: "Ask the class: 'Who are safe helpers when you get lost in a mall or market?' Guide them to identify uniformed cashiers, security guards, or mothers with children.",
      teacherPrompt_hi: "कक्षा से पूछें: 'मॉल या बाज़ार में खो जाने पर सुरक्षित मददगार कौन होते हैं?' उन्हें वर्दी वाले कर्मचारियों, गार्ड या बच्चों वाली माताओं को पहचानने का सुझाव दें।",
      keyRule_en: "Rule for Children: Freeze in place, never leave the store/building with a stranger, and ask uniformed staff for help.",
      keyRule_hi: "बच्चों के लिए नियम: एक जगह रुकें, किसी अनजान के साथ दुकान या इमारत से बाहर न जाएँ, और वर्दी वाले कर्मचारी से मदद लें।",
      choices: [
        {
          id: "l3_c1",
          text_en: "Walk out into the street to try walking home alone.",
          text_hi: "अकेले घर जाने के लिए मॉल से बाहर सड़क पर चले जाएँ।",
          rating: "unsafe",
          skills: { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 },
          guidanceTitle_en: "Freeze in Place! 🌱",
          guidanceTitle_hi: "एक ही सुरक्षित स्थान पर रुकें! 🌱",
          guidanceBody_en: "Never leave the building or go near busy roads. Your parents are looking for you right inside the store. Stay where they last saw you!",
          guidanceBody_hi: "इमारत छोड़कर या सड़क की ओर कभी न जाएँ। आपके माता-पिता आपको दुकान के अंदर ही ढूँढ रहे हैं। जहाँ वे आखिरी बार दिखे थे, वहीं रुकें!",
          actorReaction: "think_concern"
        },
        {
          id: "l3_c2",
          text_en: "Approach the cashier counter and ask them to make an announcement.",
          text_hi: "कैशियर काउंटर पर जाएँ और स्पीकर पर घोषणा (अनाउंसमेंट) करने को कहें।",
          rating: "safe",
          skills: { risk_recognition: 1, verification: 1, help_seeking: 1, boundary_setting: 1, impulse_control: 1, problem_solving: 1 },
          guidanceTitle_en: "Smart Public Navigation! ⭐",
          guidanceTitle_hi: "समझदारी भरा कदम! ⭐",
          guidanceBody_en: "Approaching identified uniformed staff behind a register is the safest way to reunite with parents quickly.",
          guidanceBody_hi: "काउंटर पर वर्दी वाले कर्मचारी से संपर्क करना माता-पिता से जल्दी और सुरक्षित रूप से मिलने का सबसे अच्छा तरीका है।",
          actorReaction: "safe_smile"
        },
        {
          id: "l3_c3",
          text_en: "Stay near the toy display and wait calmly for parents to retrace their steps.",
          text_hi: "खिलौनों के पास ही शांत खड़े रहें ताकि माता-पिता वापस आकर आपको पा सकें।",
          rating: "safe",
          skills: { risk_recognition: 1, verification: 1, help_seeking: 1, boundary_setting: 1, impulse_control: 1, problem_solving: 1 },
          guidanceTitle_en: "Calm & Composed! 🛡️",
          guidanceTitle_hi: "धैर्य और शांति! 🛡️",
          guidanceBody_en: "Freezing in place prevents you from wandering further away. Parents always walk back to the last spot they saw you.",
          guidanceBody_hi: "एक ही जगह रुकने से आप और दूर जाने से बचते हैं। माता-पिता हमेशा उस जगह वापस आते हैं जहाँ उन्होंने आपको आखिरी बार देखा था।",
          actorReaction: "safe_smile"
        }
      ]
    },

    {
      id: "learn_4",
      category: "secrets_boundaries",
      icon: "🤫",
      tag_en: "Personal Boundaries & Unsafe Secrets",
      tag_hi: "व्यक्तिगत सीमाएं एवं असुरक्षित रहस्य",
      title_en: "The Secret Gift",
      title_hi: "गुप्त उपहार और रहस्य",
      desc_en: "An acquaintance offers you an expensive new phone but insists you must hide it from your parents.",
      desc_hi: "एक परिचित आपको एक महंगा फोन उपहार में देता है लेकिन कहता है कि इसे माता-पिता से छिपाना होगा।",
      env: "living_room",
      actorLeft: "neighbour",
      nametagLeft_en: "Acquaintance",
      nametagLeft_hi: "परिचित व्यक्ति",
      initialDialogue_en: "\"Take this cool new phone! Just don't tell your mum and dad, it's our special secret.\"",
      initialDialogue_hi: "\"यह नया फोन रख लो! बस मम्मी-पापा को मत बताना, यह हमारा विशेष रहस्य है।\"",
      guidePrompt_en: "Surprises bring joy to everyone; unsafe secrets cause anxiety.",
      guidePrompt_hi: "सरप्राइज सबको खुशी देते हैं; गलत रहस्य चिंता और डर पैदा करते हैं।",
      teacherPrompt_en: "Ask the class: 'What is the difference between a good surprise (like a birthday party) and an unsafe secret?' Reassure children that they will never be in trouble for telling the truth.",
      teacherPrompt_hi: "कक्षा से पूछें: 'एक अच्छे सरप्राइज (जैसे जन्मदिन पार्टी) और माता-पिता से छिपाने वाले रहस्य में क्या अंतर होता है?' बच्चों को भरोसा दिलाएँ कि सच बोलने पर उन्हें कभी डांट नहीं पड़ेगी।",
      keyRule_en: "Rule for Children: Safe adults will NEVER ask you to keep a secret from your parents. Always share secrets that make you feel uneasy.",
      keyRule_hi: "बच्चों के लिए नियम: सुरक्षित बड़े कभी भी माता-पिता से बात छिपाने को नहीं कहेंगे। जो रहस्य आपको असहज करे, उसे हमेशा माता-पिता को बताएं।",
      choices: [
        {
          id: "l4_c1",
          text_en: "Accept the phone and promise never to tell your parents.",
          text_hi: "फोन ले लें और माता-पिता को कभी न बताने का वादा करें।",
          rating: "unsafe",
          skills: { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 },
          guidanceTitle_en: "Secrets vs. Surprises 🌱",
          guidanceTitle_hi: "रहस्य बनाम सुखद सरप्राइज 🌱",
          guidanceBody_en: "Good surprises (like a birthday party) are temporary, fun, and everyone finds out soon. Unsafe secrets make you feel anxious or ask you to hide things from parents. You should ALWAYS tell your parents about secrets.",
          guidanceBody_hi: "अच्छे सरप्राइज (जैसे जन्मदिन) कुछ समय के लिए होते हैं और सबको खुशी देते हैं। असुरक्षित रहस्य आपको डराते हैं और माता-पिता से छिपाने को कहते हैं। ऐसे रहस्यों को हमेशा माता-पिता को बताएं।",
          actorReaction: "think_concern"
        },
        {
          id: "l4_c2",
          text_en: "Say: 'I don't keep secrets from my parents' and hand it back.",
          text_hi: "'मैं अपने माता-पिता से कोई बात नहीं छिपाता' कहें और वापस कर दें।",
          rating: "safe",
          skills: { risk_recognition: 1, verification: 1, help_seeking: 1, boundary_setting: 1, impulse_control: 1, problem_solving: 1 },
          guidanceTitle_en: "Super Boundary Champion! ⭐",
          guidanceTitle_hi: "मजबूत सुरक्षा सीमा! ⭐",
          guidanceBody_en: "Saying clearly that your family shares everything stops inappropriate secrecy right in its tracks. You showed massive courage!",
          guidanceBody_hi: "यह स्पष्ट कहना कि आपका परिवार सब कुछ साझा करता है, अनुचित गुप्त बातों को तुरंत रोक देता है। आपने बहुत साहस दिखाया!",
          actorReaction: "safe_smile"
        },
        {
          id: "l4_c3",
          text_en: "Go straight to your parents and tell them exactly what the adult said.",
          text_hi: "सीधे अपने माता-पिता के पास जाएँ और बताएं कि उस व्यक्ति ने क्या कहा।",
          rating: "safe",
          skills: { risk_recognition: 1, verification: 1, help_seeking: 1, boundary_setting: 1, impulse_control: 1, problem_solving: 1 },
          guidanceTitle_en: "Perfect Open Communication! 🛡️",
          guidanceTitle_hi: "सटीक और खुला संवाद! 🛡️",
          guidanceBody_en: "Telling your trusted adult means no one can ever pressure you. You will never be in trouble for speaking up!",
          guidanceBody_hi: "माता-पिता को तुरंत बताने से कोई आप पर अनुचित दबाव नहीं बना सकता। सच बोलने पर आपको कभी डांट नहीं पड़ेगी!",
          actorReaction: "safe_smile"
        },
        {
          id: "l4_c4",
          text_en: "Hide the phone under your pillow and feel nervous all night.",
          text_hi: "फोन को तकिए के नीचे छिपा लें और रात भर घबराते रहें।",
          rating: "unsafe",
          skills: { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 },
          guidanceTitle_en: "Listen to Your 'Tummy Feelings' 🌱",
          guidanceTitle_hi: "अपने मन की आवाज़ सुनें 🌱",
          guidanceBody_en: "Feeling nervous or having a funny feeling in your stomach is your brain's alarm system saying: 'Tell someone you trust!' Don't carry heavy secrets alone.",
          guidanceBody_hi: "मन में घबराहट या डर लगना आपके दिमाग का सुरक्षा संकेत है जो कहता है: 'विश्वसनीय बड़े को बताओ!' कभी भी भारी रहस्य अकेले मत संभालिए।",
          actorReaction: "think_concern"
        }
      ]
    }
  ],

  // 3. POST-ASSESSMENT (Isomorphic Transfer Scenarios - Different Story, Same Core Cognitive Skills)
  postAssessment: [
    {
      id: "post_1",
      category: "stranger_transport",
      icon: "🏊",
      title_en: "After Swimming Class",
      title_hi: "तैराकी क्लास के बाद",
      story_en: "You are standing outside your sports center after swimming class. An unfamiliar person in a motorcycle helmet says: 'Your dad got stuck in traffic and sent me to pick you up. Climb on the bike quickly!'",
      story_hi: "तैराकी क्लास के बाद आप स्पोर्ट्स सेंटर के बाहर खड़े हैं। हेलमेट पहने एक अनजान व्यक्ति कहता है: 'आपके पिताजी ट्रैफिक में फंस गए हैं और मुझे लेने भेजा है। जल्दी बाइक पर बैठो!'",
      choices: [
        {
          id: "post_1_a",
          text_en: "Hop on the bike because they mentioned your dad.",
          text_hi: "बाइक पर बैठ जाएँ क्योंकि उन्होंने पिताजी का नाम लिया।",
          skills: { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 },
          isSafe: false
        },
        {
          id: "post_1_b",
          text_en: "Step back into the sports reception desk, ask the coach to call Dad, and verify with your family safe-word.",
          text_hi: "स्पोर्ट्स रिसेप्शन पर वापस जाएँ, कोच से पिताजी को फोन करने को कहें और पारिवारिक सुरक्षित शब्द से पुष्टि करें।",
          skills: { risk_recognition: 1, verification: 1, help_seeking: 1, boundary_setting: 1, impulse_control: 1, problem_solving: 1 },
          isSafe: true
        },
        {
          id: "post_1_c",
          text_en: "Take the bike helmet and start walking down the dark road.",
          text_hi: "हेलमेट ले लें और अंधेरी सड़क पर अकेले चलने लगें।",
          skills: { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 },
          isSafe: false
        }
      ]
    },
    {
      id: "post_2",
      category: "online_safety",
      icon: "🎁",
      title_en: "Free Rare In-Game Pet",
      title_hi: "गेम में मुफ्त दुर्लभ उपहार",
      story_en: "In a gaming community, a user posts: 'I will gift you an ultra-rare game pet! Just message me your home street address and jump on a private video call.'",
      story_hi: "गेमिंग समुदाय में एक यूजर लिखता है: 'मैं तुम्हें एक बहुत दुर्लभ गेम पेट उपहार में दूंगा! बस मुझे अपने घर का पता भेजो और एक प्राइवेट वीडियो कॉल पर आओ।'",
      choices: [
        {
          id: "post_2_a",
          text_en: "Give your home address to get the rare pet.",
          text_hi: "दुर्लभ उपहार पाने के लिए अपने घर का पता दे दें।",
          skills: { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 },
          isSafe: false
        },
        {
          id: "post_2_b",
          text_en: "Recognize that requests for home addresses or private video calls are red flags; report the user and tell parents.",
          text_hi: "समझें कि घर का पता या वीडियो कॉल मांगना खतरे का संकेत है; यूजर की रिपोर्ट करें और माता-पिता को बताएं।",
          skills: { risk_recognition: 1, verification: 1, help_seeking: 1, boundary_setting: 1, impulse_control: 1, problem_solving: 1 },
          isSafe: true
        },
        {
          id: "post_2_c",
          text_en: "Give your neighbor's address instead.",
          text_hi: "अपने पड़ोसी का पता दे दें।",
          skills: { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 },
          isSafe: false
        }
      ]
    },
    {
      id: "post_3",
      category: "lost_public",
      icon: "🚉",
      title_en: "Train Station Platform",
      title_hi: "रेलवे स्टेशन का प्लेटफॉर्म",
      story_en: "At a bustling train station, a wave of passengers moves between you and your family. Suddenly, you cannot spot your parents.",
      story_hi: "एक व्यस्त रेलवे स्टेशन पर यात्रियों की भीड़ के कारण आप परिवार से अलग हो जाते हैं और माता-पिता दिखाई नहीं देते।",
      choices: [
        {
          id: "post_3_a",
          text_en: "Jump onto an open train carriage to look inside.",
          text_hi: "अंदर देखने के लिए किसी खुली ट्रेन के डिब्बे में चढ़ जाएँ।",
          skills: { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 },
          isSafe: false
        },
        {
          id: "post_3_b",
          text_en: "Stay safely on the platform away from the tracks, approach an on-duty station master / police officer in uniform, and give your parent's phone number.",
          text_hi: "पटरियों से दूर प्लेटफॉर्म पर सुरक्षित खड़े रहें, वर्दी वाले स्टेशन मास्टर/पुलिसकर्मी के पास जाएँ और माता-पिता का फोन नंबर बताएं।",
          skills: { risk_recognition: 1, verification: 1, help_seeking: 1, boundary_setting: 1, impulse_control: 1, problem_solving: 1 },
          isSafe: true
        },
        {
          id: "post_3_c",
          text_en: "Walk out of the station into the unfamiliar city streets.",
          text_hi: "स्टेशन से बाहर अनजान शहर की सड़कों पर निकल जाएँ।",
          skills: { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 },
          isSafe: false
        }
      ]
    },
    {
      id: "post_4",
      category: "secrets_boundaries",
      icon: "📷",
      title_en: "Backyard Photo Game",
      title_hi: "घर के पीछे फोटो का खेल",
      story_en: "An acquaintance in the neighborhood asks to take pictures of you doing unusual poses in the backyard and says: 'This is our special private game. Don't tell your mum or dad.'",
      story_hi: "पड़ोस का एक परिचित घर के पीछे असामान्य मुद्राओं में आपकी तस्वीरें लेने को कहता है और कहता है: 'यह हमारा विशेष खेल है। मम्मी-पापा को मत बताना।'",
      choices: [
        {
          id: "post_4_a",
          text_en: "Agree to the private photos and keep the secret.",
          text_hi: "तस्वीरें खिंचवाने के लिए मान जाएँ और बात गुप्त रखें।",
          skills: { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 },
          isSafe: false
        },
        {
          id: "post_4_b",
          text_en: "Say 'NO! My body and photos are private', step away immediately, and inform your parents right away.",
          text_hi: "'नहीं! मेरा शरीर और तस्वीरें निजी हैं' कहें, तुरंत दूर हटें और माता-पिता को पूरी बात बताएं।",
          skills: { risk_recognition: 1, verification: 1, help_seeking: 1, boundary_setting: 1, impulse_control: 1, problem_solving: 1 },
          isSafe: true
        },
        {
          id: "post_4_c",
          text_en: "Take a picture of them back and run away.",
          text_hi: "उनकी भी तस्वीर खींच लें और भाग जाएँ।",
          skills: { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 },
          isSafe: false
        }
      ]
    }
  ]
};