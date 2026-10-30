/**
 * GAURIKIT — EXPANSION PACK: 8 ADDITIONAL LEARNING SCENARIOS (stories 5-12)
 * -----------------------------------------------------------------------------
 * Loaded AFTER scenarios.js and BEFORE engine.js. Appends to
 * GAURI_DATA.learningScenarios, so the story hub automatically shows all 12.
 *
 * Design rules taken from the research reviewed for this project:
 *  - Active practice with feedback, not passive information: every story ends
 *    with a "say it out loud" practice phrase (rehearsal), and an unsafe choice
 *    always leads to a calm "try another choice" so a wrong sequence is never
 *    the last thing a child does.
 *  - The core response is NO - GO - TELL (identify/refuse, move away, report to
 *    a trusted adult). Reporting is the hardest skill for children to learn, so
 *    "keep telling until someone listens" is built into several stories.
 *  - Three lure types are covered across the full set: authority (story 1),
 *    incentive (story 4) and assistance (story 5).
 *  - Some stories teach when it IS fine to go with someone (story 12), so
 *    children learn to discriminate rather than fear every adult.
 *  - Several safe answers for peer pressure (Refuse / Explain / Avoid / Leave).
 *  - No violence, no scary imagery, calm wording only.
 *
 * NOTE: Hindi text should be checked by a native speaker/teacher before use.
 */
(function () {
  const sk = (r, v, h, b, i, p) => ({
    risk_recognition: r,
    verification: v,
    help_seeking: h,
    boundary_setting: b,
    impulse_control: i,
    problem_solving: p
  });
  const ALL = sk(1, 1, 1, 1, 1, 1);
  const NONE = sk(0, 0, 0, 0, 0, 0);

  const more = [
    // ------------------------------------------------------------------
    // 5. ASSISTANCE LURE
    // ------------------------------------------------------------------
    {
      id: "learn_5",
      category: "stranger_approach",
      icon: "🐶",
      tag_en: "Tricky Requests & Asking for Help",
      tag_hi: "चालाक अनुरोध और मदद का बहाना",
      title_en: "Help Me Find My Puppy",
      title_hi: "मेरे पिल्ले को ढूँढने में मदद करो",
      desc_en: "A friendly adult asks you to help look for a lost puppy, somewhere out of sight of your friends.",
      desc_hi: "एक मिलनसार बड़ा आपसे खोए हुए पिल्ले को ढूँढने में मदद माँगता है, लेकिन ऐसी जगह जहाँ आपके दोस्त आपको देख न सकें।",
      env: "park",
      actorLeft: "stranger_male",
      nametagLeft_en: "Friendly-Looking Adult",
      nametagLeft_hi: "मिलनसार दिखने वाला व्यक्ति",
      initialDialogue_en: "\"Oh please help me! My puppy ran behind those bushes next to my car. Come with me, it will only take a minute!\"",
      initialDialogue_hi: "\"अरे प्लीज़ मेरी मदद करो! मेरा पिल्ला मेरी गाड़ी के पास उन झाड़ियों के पीछे भाग गया है। मेरे साथ चलो, बस एक मिनट लगेगा!\"",
      guidePrompt_en: "Kind-sounding requests can still be tricky. Safe grown-ups ask other grown-ups for help, not children.",
      guidePrompt_hi: "मीठी बातों वाला अनुरोध भी चालाक हो सकता है। सुरक्षित बड़े, बड़ों से मदद माँगते हैं, बच्चों से नहीं।",
      teacherPrompt_en: "Ask the class: 'Why might a grown-up ask a child for help instead of asking another grown-up?' Explain that a tricky request can sound kind. Role-play: one child says the line, another practises saying NO, walking back to the group and telling the teacher.",
      teacherPrompt_hi: "कक्षा से पूछें: 'कोई बड़ा, दूसरे बड़े की बजाय बच्चे से मदद क्यों माँगेगा?' समझाएँ कि चालाक अनुरोध भी बहुत भला लग सकता है। अभिनय कराएँ: एक बच्चा संवाद बोले, दूसरा 'ना' कहे, समूह के पास लौटे और शिक्षक को बताए।",
      keyRule_en: "NO - GO - TELL: Say no, go back to a safe adult, and tell them. Grown-ups who need help should ask other grown-ups, not children.",
      keyRule_hi: "ना - जाओ - बताओ: 'ना' कहें, किसी सुरक्षित बड़े के पास लौट जाएँ और उन्हें बताएँ। मदद चाहने वाले बड़े को दूसरे बड़ों से मदद माँगनी चाहिए, बच्चों से नहीं।",
      practice_en: "No, sorry! I'm going to tell my teacher.",
      practice_hi: "नहीं, माफ़ कीजिए! मैं अपने टीचर को बताने जा रहा/रही हूँ।",
      choices: [
        {
          id: "l5_c1",
          text_en: "Follow him behind the bushes.",
          text_hi: "उसके साथ झाड़ियों के पीछे चले जाएँ।",
          rating: "unsafe",
          skills: NONE,
          guidanceTitle_en: "Let's Pause and Think 🌱",
          guidanceTitle_hi: "रुकिए और सोचिए 🌱",
          guidanceBody_en: "Wanting to help a puppy is kind-hearted! But grown-ups who need help should ask other grown-ups. A safe adult will never ask you to go somewhere out of sight, away from the people who look after you.",
          guidanceBody_hi: "पिल्ले की मदद करना चाहना बहुत अच्छी बात है! लेकिन मदद चाहने वाले बड़ों को दूसरे बड़ों से मदद माँगनी चाहिए। सुरक्षित बड़े कभी आपसे ऐसी जगह चलने को नहीं कहेंगे जहाँ आपकी देखभाल करने वाले लोग आपको न देख सकें।",
          actorReaction: "think_concern"
        },
        {
          id: "l5_c2",
          text_en: "Say a loud 'No, sorry!' and go tell your teacher.",
          text_hi: "ज़ोर से 'नहीं, माफ़ कीजिए!' कहें और टीचर को बताएँ।",
          rating: "safe",
          skills: sk(1, 0, 1, 1, 1, 1),
          guidanceTitle_en: "Brilliant: No, Go, Tell! ⭐",
          guidanceTitle_hi: "शानदार: ना, जाओ, बताओ! ⭐",
          guidanceBody_en: "You did all three steps: you said no, moved back to people you trust, and told them. Being kind doesn't mean going somewhere out of sight with someone. Your teacher can even help the adult find the puppy!",
          guidanceBody_hi: "आपने तीनों कदम उठाए: 'ना' कहा, अपने भरोसेमंद लोगों के पास लौटे और उन्हें बताया। दयालु होने का मतलब किसी के साथ नज़रों से दूर जाना नहीं है। आपके शिक्षक उस व्यक्ति को पिल्ला ढूँढने में मदद भी कर सकते हैं!",
          actorReaction: "safe_smile"
        },
        {
          id: "l5_c3",
          text_en: "Say 'No thanks', keep playing, tell no one.",
          text_hi: "'नहीं, धन्यवाद' कहें, खेलते रहें, किसी को न बताएँ।",
          rating: "partial",
          skills: sk(1, 0, 0, 1, 1, 0),
          guidanceTitle_en: "Good 'No' - Now Add the 'Tell' 🌱",
          guidanceTitle_hi: "'ना' बहुत अच्छा - अब 'बताओ' भी जोड़ें 🌱",
          guidanceBody_en: "Saying no was strong and brave! The last step is telling a trusted adult, even if everything felt fine. Then they can make sure the same adult doesn't ask other children too.",
          guidanceBody_hi: "'ना' कहना बहुत मज़बूत और बहादुरी वाला कदम था! आख़िरी कदम किसी भरोसेमंद बड़े को बताना है, भले ही सब ठीक लगा हो। तब वे ध्यान रख सकते हैं कि वही व्यक्ति दूसरे बच्चों से भी न कहे।",
          actorReaction: "think_concern"
        },
        {
          id: "l5_c4",
          text_en: "Say 'Ask a grown-up' and go to your teacher.",
          text_hi: "कहें 'किसी बड़े से पूछिए' और टीचर के पास जाएँ।",
          rating: "safe",
          skills: sk(1, 1, 1, 1, 1, 1),
          guidanceTitle_en: "Smart and Kind! ⭐",
          guidanceTitle_hi: "समझदार और दयालु! ⭐",
          guidanceBody_en: "You found a kind way to say no AND brought in a safe adult. That's the best of both. Grown-ups can help each other, and you stay safe.",
          guidanceBody_hi: "आपने 'ना' कहने का एक दयालु तरीक़ा ढूँढा और एक सुरक्षित बड़े को भी शामिल किया। यह दोनों में सबसे अच्छा है। बड़े आपस में मदद कर सकते हैं और आप सुरक्षित रहते हैं।",
          actorReaction: "safe_smile"
        }
      ]
    },

    // ------------------------------------------------------------------
    // 6. KNOCK AT THE DOOR
    // ------------------------------------------------------------------
    {
      id: "learn_6",
      category: "home_safety",
      icon: "🚪",
      tag_en: "Safety at Home",
      tag_hi: "घर में सुरक्षा",
      title_en: "A Knock at the Door",
      title_hi: "दरवाज़े पर दस्तक",
      desc_en: "A grown-up is resting in the next room when someone knocks and says they have a delivery.",
      desc_hi: "घर का एक बड़ा अगले कमरे में आराम कर रहा है, तभी कोई दरवाज़ा खटखटाकर कहता है कि उसके पास डिलीवरी है।",
      env: "doorstep",
      actorLeft: "stranger_male",
      nametagLeft_en: "Visitor at the Door",
      nametagLeft_hi: "दरवाज़े पर आया व्यक्ति",
      initialDialogue_en: "\"Delivery for your family! Open the door and sign here, please. Quickly!\"",
      initialDialogue_hi: "\"आपके घर की डिलीवरी है! दरवाज़ा खोलिए और यहाँ साइन कीजिए, प्लीज़। जल्दी!\"",
      guidePrompt_en: "Doors are for trusted grown-ups to open. You don't have to answer anything.",
      guidePrompt_hi: "दरवाज़ा भरोसेमंद बड़े ही खोलते हैं। आपको किसी बात का जवाब देना ज़रूरी नहीं है।",
      teacherPrompt_en: "Ask the class: 'Who is allowed to open the door in your home?' Help each child agree a family rule with their parents. Practise walking to the nearest trusted grown-up to say 'Someone is at the door.' If a child may sometimes be home alone, teach: do not open, never say you are alone, and call a parent.",
      teacherPrompt_hi: "कक्षा से पूछें: 'आपके घर में दरवाज़ा कौन खोल सकता है?' हर बच्चे को माता-पिता के साथ घर का एक नियम तय करने में मदद करें। निकटतम भरोसेमंद बड़े के पास जाकर कहने का अभ्यास कराएँ: 'दरवाज़े पर कोई है।' यदि बच्चा कभी अकेला रहता हो तो सिखाएँ: दरवाज़ा न खोलें, कभी न कहें कि आप अकेले हैं, और माता-पिता को फ़ोन करें।",
      keyRule_en: "Rule for Children: Don't open the door unless a trusted grown-up says it's okay. Go and tell a grown-up that someone is at the door.",
      keyRule_hi: "बच्चों के लिए नियम: जब तक कोई भरोसेमंद बड़ा न कहे, दरवाज़ा न खोलें। जाकर किसी बड़े को बताएँ कि दरवाज़े पर कोई है।",
      practice_en: "Please wait. I'm going to get a grown-up.",
      practice_hi: "एक मिनट रुकिए, मैं किसी बड़े को बुलाता/बुलाती हूँ।",
      choices: [
        {
          id: "l6_c1",
          text_en: "Open the door and take the parcel.",
          text_hi: "दरवाज़ा खोलकर पार्सल ले लें।",
          rating: "unsafe",
          skills: NONE,
          guidanceTitle_en: "Let's Pause and Think 🌱",
          guidanceTitle_hi: "रुकिए और सोचिए 🌱",
          guidanceBody_en: "It's polite to want to help! But a person at the door can say anything, and you can't check who they really are. A grown-up you trust should decide whether to open the door.",
          guidanceBody_hi: "मदद करना चाहना शिष्टता है! लेकिन दरवाज़े पर खड़ा व्यक्ति कुछ भी कह सकता है और आप जाँच नहीं सकते कि वह सच में कौन है। दरवाज़ा खोलना है या नहीं, यह किसी भरोसेमंद बड़े को तय करना चाहिए।",
          actorReaction: "think_concern"
        },
        {
          id: "l6_c2",
          text_en: "Don't open. Tell the grown-up at home.",
          text_hi: "दरवाज़ा न खोलें। घर के बड़े को बताएँ।",
          rating: "safe",
          skills: sk(1, 1, 1, 1, 1, 1),
          guidanceTitle_en: "Perfect: Don't Open, Go and Tell! ⭐",
          guidanceTitle_hi: "बिल्कुल सही: न खोलें, जाकर बताएँ! ⭐",
          guidanceBody_en: "You kept the door closed and brought a trusted grown-up. Now they can check who it is safely. You did exactly the right thing.",
          guidanceBody_hi: "आपने दरवाज़ा बंद रखा और एक भरोसेमंद बड़े को बुलाया। अब वे सुरक्षित तरीक़े से देख सकते हैं कि कौन आया है। आपने बिल्कुल सही किया।",
          actorReaction: "safe_smile"
        },
        {
          id: "l6_c3",
          text_en: "Shout 'I'm home alone, come back later!'",
          text_hi: "चिल्लाएँ 'मैं घर पर अकेला हूँ, बाद में आना!'",
          rating: "partial",
          skills: sk(1, 0, 0, 1, 1, 0),
          guidanceTitle_en: "Good That You Didn't Open! 🌱",
          guidanceTitle_hi: "अच्छा किया कि दरवाज़ा नहीं खोला! 🌱",
          guidanceBody_en: "Keeping the door closed was smart. But never tell a visitor that you are alone. Instead go and get a grown-up, or if nobody is nearby, call a parent and say 'My parent can't come to the door right now.'",
          guidanceBody_hi: "दरवाज़ा बंद रखना समझदारी थी। लेकिन किसी आने वाले को कभी न बताएँ कि आप अकेले हैं। इसकी जगह किसी बड़े को बुलाएँ, या पास में कोई न हो तो माता-पिता को फ़ोन करें और कहें: 'अभी मेरे माता-पिता दरवाज़े पर नहीं आ सकते।'",
          actorReaction: "think_concern"
        },
        {
          id: "l6_c4",
          text_en: "Ask who sent them, then open if it sounds right.",
          text_hi: "पूछें किसने भेजा, ठीक लगे तो खोल दें।",
          rating: "unsafe",
          skills: sk(1, 0, 0, 0, 0, 0),
          guidanceTitle_en: "Let's Think About That 🌱",
          guidanceTitle_hi: "आइए इस पर सोचें 🌱",
          guidanceBody_en: "Asking a question shows you are thinking! But anyone can give an answer that sounds right, and you can't check it. The safest step is to leave the door closed and ask a trusted grown-up to deal with it.",
          guidanceBody_hi: "सवाल पूछना दिखाता है कि आप सोच रहे हैं! लेकिन कोई भी ऐसा जवाब दे सकता है जो सही लगे और आप उसे जाँच नहीं सकते। सबसे सुरक्षित कदम है दरवाज़ा बंद रखना और किसी भरोसेमंद बड़े से यह संभालने को कहना।",
          actorReaction: "think_concern"
        }
      ]
    },

    // ------------------------------------------------------------------
    // 7. CROSSING THE ROAD
    // ------------------------------------------------------------------
    {
      id: "learn_7",
      category: "road_safety",
      icon: "🚦",
      tag_en: "Road & Street Safety",
      tag_hi: "सड़क सुरक्षा",
      title_en: "Crossing the Busy Road",
      title_hi: "व्यस्त सड़क पार करना",
      desc_en: "You and your family need to cross a busy road near school. How do you cross safely?",
      desc_hi: "आपको और आपके परिवार को स्कूल के पास की एक व्यस्त सड़क पार करनी है। सुरक्षित तरीक़े से कैसे पार करेंगे?",
      env: "street",
      actorLeft: "store_staff",
      nametagLeft_en: "Crossing Helper",
      nametagLeft_hi: "सड़क पार कराने वाले सहायक",
      initialDialogue_en: "\"Busy road today! The zebra crossing is right here. How will you cross?\"",
      initialDialogue_hi: "\"आज सड़क पर बहुत भीड़ है! ज़ेबरा क्रॉसिंग यहीं है। आप कैसे पार करेंगे?\"",
      guidePrompt_en: "Cars, scooters and autos can be faster than they look. Slow down and think.",
      guidePrompt_hi: "कारें, स्कूटर और ऑटो दिखने से ज़्यादा तेज़ हो सकते हैं। धीमे हों और सोचें।",
      teacherPrompt_en: "Ask the class: 'What are the steps to cross a road safely?' In India traffic keeps to the left, so the nearest danger comes from the RIGHT: teach 'look right, look left, look right again.' (Research games teach left-right-left because they were made for countries that drive on the right.) Practise on a chalk zebra crossing in the playground.",
      teacherPrompt_hi: "कक्षा से पूछें: 'सड़क सुरक्षित रूप से पार करने के कदम क्या हैं?' भारत में वाहन बाईं ओर चलते हैं, इसलिए सबसे पहले ख़तरा दाईं ओर से आता है: सिखाएँ 'दाएँ देखो, बाएँ देखो, फिर से दाएँ देखो।' (शोध में बाएँ-दाएँ-बाएँ सिखाया जाता है क्योंकि वहाँ वाहन दाईं ओर चलते हैं।) खेल के मैदान में चॉक से ज़ेबरा क्रॉसिंग बनाकर अभ्यास कराएँ।",
      keyRule_en: "Rule for Children: Hold a grown-up's hand, stop at the edge, look right-left-right, wait for vehicles to stop, then cross inside the zebra lines.",
      keyRule_hi: "बच्चों के लिए नियम: किसी बड़े का हाथ पकड़ें, किनारे पर रुकें, दाएँ-बाएँ-दाएँ देखें, वाहन रुकने तक इंतज़ार करें, फिर ज़ेबरा लाइनों के अंदर से पार करें।",
      practice_en: "Stop. Look right, left, right. Now walk!",
      practice_hi: "रुको। दाएँ, बाएँ, फिर दाएँ देखो। अब चलो!",
      choices: [
        {
          id: "l7_c1",
          text_en: "Run across in a gap between scooters.",
          text_hi: "स्कूटरों के बीच खाली जगह में भागकर पार करें।",
          rating: "unsafe",
          skills: NONE,
          guidanceTitle_en: "Let's Pause and Think 🌱",
          guidanceTitle_hi: "रुकिए और सोचिए 🌱",
          guidanceBody_en: "Vehicles come faster than they seem, and a gap can close in a second. It is safer to stop at the edge, wait, and cross when vehicles have stopped.",
          guidanceBody_hi: "वाहन दिखने से ज़्यादा तेज़ आते हैं और खाली जगह एक पल में भर सकती है। किनारे पर रुकना, इंतज़ार करना और वाहन रुकने पर पार करना ज़्यादा सुरक्षित है।",
          actorReaction: "think_concern"
        },
        {
          id: "l7_c2",
          text_en: "Hold a grown-up's hand, look right-left-right, cross on the zebra.",
          text_hi: "बड़े का हाथ पकड़ें, दाएँ-बाएँ-दाएँ देखें, ज़ेबरा पर पार करें।",
          rating: "safe",
          skills: sk(1, 0, 1, 0, 1, 1),
          guidanceTitle_en: "Road Safety Star! ⭐",
          guidanceTitle_hi: "सड़क सुरक्षा सितारा! ⭐",
          guidanceBody_en: "You followed every step: hand, stop, look, wait, cross on the lines. Drivers expect to see you on the zebra crossing, so it is the safest place to walk.",
          guidanceBody_hi: "आपने हर कदम निभाया: हाथ, रुकना, देखना, इंतज़ार, लाइनों पर पार करना। ड्राइवर ज़ेबरा क्रॉसिंग पर आपको देखने की उम्मीद करते हैं, इसलिए यह चलने की सबसे सुरक्षित जगह है।",
          actorReaction: "safe_smile"
        },
        {
          id: "l7_c3",
          text_en: "Cross between two parked cars.",
          text_hi: "खड़ी गाड़ियों के बीच से पार करें।",
          rating: "unsafe",
          skills: NONE,
          guidanceTitle_en: "Let's Pause and Think 🌱",
          guidanceTitle_hi: "रुकिए और सोचिए 🌱",
          guidanceBody_en: "Drivers can't see you between parked vehicles, and you can't see them. Use the zebra crossing, where drivers expect people to cross. Your friend can walk with you there.",
          guidanceBody_hi: "खड़ी गाड़ियों के बीच ड्राइवर आपको नहीं देख पाते और आप भी उन्हें नहीं देख पाते। ज़ेबरा क्रॉसिंग का उपयोग करें, जहाँ ड्राइवर लोगों के पार करने की उम्मीद करते हैं। आपका दोस्त भी आपके साथ वहाँ चल सकता है।",
          actorReaction: "think_concern"
        },
        {
          id: "l7_c4",
          text_en: "Use the zebra but wave to a friend while walking.",
          text_hi: "ज़ेबरा पर चलें, पर दोस्त को हाथ हिलाते हुए।",
          rating: "partial",
          skills: sk(1, 0, 0, 0, 0, 1),
          guidanceTitle_en: "Nearly There! Keep Your Eyes on the Road 🌱",
          guidanceTitle_hi: "लगभग सही! नज़र सड़क पर रखें 🌱",
          guidanceBody_en: "Great job choosing the zebra lines! Keep your eyes on the road and your hand in your grown-up's hand until you reach the other side, then wave to your friend.",
          guidanceBody_hi: "ज़ेबरा लाइनें चुनना बहुत अच्छा रहा! दूसरी ओर पहुँचने तक नज़र सड़क पर और हाथ बड़े के हाथ में रखें, फिर दोस्त को हाथ हिलाएँ।",
          actorReaction: "think_concern"
        }
      ]
    },

    // ------------------------------------------------------------------
    // 8. THE BEEPING ALARM (fire safety)
    // ------------------------------------------------------------------
    {
      id: "learn_8",
      category: "fire_safety",
      icon: "🔔",
      tag_en: "Safety at Home",
      tag_hi: "घर में सुरक्षा",
      title_en: "The Beeping Alarm",
      title_hi: "बीप बजाता अलार्म",
      desc_en: "The smoke alarm starts to beep loudly at home. You remember your family's meeting place outside.",
      desc_hi: "घर में स्मोक अलार्म ज़ोर से बीप करने लगता है। आपको अपने परिवार की बाहर मिलने की जगह याद है।",
      env: "living_room",
      actorLeft: "alarm",
      nametagLeft_en: "Smoke Alarm",
      nametagLeft_hi: "स्मोक अलार्म",
      initialDialogue_en: "\"BEEP-BEEP-BEEP! Time to walk outside to your meeting place!\"",
      initialDialogue_hi: "\"बीप-बीप-बीप! अब बाहर अपनी मिलने की जगह पर चलने का समय है!\"",
      guidePrompt_en: "Alarms are helpers! They give us time to walk out calmly.",
      guidePrompt_hi: "अलार्म हमारे मददगार हैं! वे हमें शांति से बाहर निकलने का समय देते हैं।",
      teacherPrompt_en: "Before this story, help each child name their family's meeting place (for example a neighbour's gate or a tree outside). Keep the mood calm, with no pictures of flames. The four steps: move away, walk out, go to the meeting place, wait for a grown-up. Practise walking (not running) out of the classroom to a pretend meeting place.",
      teacherPrompt_hi: "इस कहानी से पहले हर बच्चे को अपने परिवार की मिलने की जगह (जैसे पड़ोसी का गेट या बाहर का पेड़) बताने में मदद करें। माहौल शांत रखें, आग की तस्वीरें न दिखाएँ। चार कदम: दूर हटो, बाहर चलो, मिलने की जगह पर जाओ, बड़ों का इंतज़ार करो। कक्षा से एक काल्पनिक मिलने की जगह तक चलकर (दौड़कर नहीं) जाने का अभ्यास कराएँ।",
      keyRule_en: "Rule for Children: Move away, walk out, go to your family's meeting place and wait for a grown-up. Never hide, and never go back inside for toys.",
      keyRule_hi: "बच्चों के लिए नियम: दूर हटें, बाहर चलें, परिवार की मिलने की जगह पर जाएँ और किसी बड़े का इंतज़ार करें। कभी छिपें नहीं और खिलौनों के लिए वापस अंदर न जाएँ।",
      practice_en: "Beep! Walk out. Meeting place. Wait for a grown-up.",
      practice_hi: "बीप! बाहर चलो। मिलने की जगह। बड़ों का इंतज़ार।",
      choices: [
        {
          id: "l8_c1",
          text_en: "Hide under the bed.",
          text_hi: "बिस्तर के नीचे छिप जाएँ।",
          rating: "unsafe",
          skills: NONE,
          guidanceTitle_en: "Let's Pause and Think 🌱",
          guidanceTitle_hi: "रुकिए और सोचिए 🌱",
          guidanceBody_en: "Hiding can feel cosy, but it makes it harder for grown-ups to find you. When an alarm beeps, the safest thing is to walk out of the house.",
          guidanceBody_hi: "छिपना आरामदायक लग सकता है, लेकिन इससे बड़ों को आपको ढूँढना मुश्किल हो जाता है। अलार्म बजे तो सबसे सुरक्षित है घर से बाहर चलकर जाना।",
          actorReaction: "think_concern"
        },
        {
          id: "l8_c2",
          text_en: "Walk out to the meeting place and wait.",
          text_hi: "चलकर मिलने की जगह पर जाएँ और रुकें।",
          rating: "safe",
          skills: sk(1, 0, 1, 0, 1, 1),
          guidanceTitle_en: "Calm and Clever! ⭐",
          guidanceTitle_hi: "शांत और समझदार! ⭐",
          guidanceBody_en: "You walked out, went to your meeting place and waited. That's exactly the plan. Now your family knows where you are and everyone is safe.",
          guidanceBody_hi: "आप बाहर चले, मिलने की जगह पर गए और इंतज़ार किया। यही सही योजना है। अब आपके परिवार को पता है कि आप कहाँ हैं और सब सुरक्षित हैं।",
          actorReaction: "safe_smile"
        },
        {
          id: "l8_c3",
          text_en: "Go back for your favourite toy.",
          text_hi: "पसंदीदा खिलौना लेने वापस जाएँ।",
          rating: "unsafe",
          skills: NONE,
          guidanceTitle_en: "Let's Pause and Think 🌱",
          guidanceTitle_hi: "रुकिए और सोचिए 🌱",
          guidanceBody_en: "Toys can be replaced, but you can't! Always go out first. Grown-ups can help with anything else later.",
          guidanceBody_hi: "खिलौने दोबारा आ सकते हैं, लेकिन आप नहीं! हमेशा पहले बाहर जाएँ। बाक़ी सब बड़े बाद में संभाल लेंगे।",
          actorReaction: "think_concern"
        },
        {
          id: "l8_c4",
          text_en: "Run outside and keep running down the street.",
          text_hi: "बाहर भागें और गली में भागते रहें।",
          rating: "partial",
          skills: sk(1, 0, 0, 0, 0, 0),
          guidanceTitle_en: "Right Idea: Now Stay at the Meeting Place 🌱",
          guidanceTitle_hi: "सही विचार: अब मिलने की जगह पर रुकें 🌱",
          guidanceBody_en: "Getting out of the house was right! Now walk to your meeting place and stay there, so grown-ups know exactly where you are. Running far away makes you harder to find.",
          guidanceBody_hi: "घर से बाहर निकलना सही था! अब चलकर मिलने की जगह पर जाएँ और वहीं रुकें, ताकि बड़ों को ठीक पता रहे कि आप कहाँ हैं। दूर भाग जाने से आपको ढूँढना मुश्किल हो जाता है।",
          actorReaction: "think_concern"
        }
      ]
    },

    // ------------------------------------------------------------------
    // 9. THE PLAYGROUND DARE (peer pressure - REAL strategies)
    // ------------------------------------------------------------------
    {
      id: "learn_9",
      category: "peer_pressure",
      icon: "🧗",
      tag_en: "Peer Pressure & Friends",
      tag_hi: "दोस्तों का दबाव",
      title_en: "The Playground Dare",
      title_hi: "खेल के मैदान की चुनौती",
      desc_en: "Classmates dare you to climb the school wall at break time and say, 'Everyone does it!'",
      desc_hi: "सहपाठी आपको इंटरवल में स्कूल की दीवार पर चढ़ने की चुनौती देते हैं और कहते हैं, 'सब करते हैं!'",
      env: "park",
      actorLeft: "peer_kid",
      nametagLeft_en: "Classmate",
      nametagLeft_hi: "सहपाठी",
      initialDialogue_en: "\"Come on, everyone's climbing the wall! Don't be a baby. If you don't, we won't let you play with us!\"",
      initialDialogue_hi: "\"चलो न, सब दीवार पर चढ़ रहे हैं! बच्चे मत बनो। नहीं चढ़े तो हम तुम्हें अपने साथ नहीं खेलने देंगे!\"",
      guidePrompt_en: "Real friends don't make you do risky things. There are many ways to say no.",
      guidePrompt_hi: "सच्चे दोस्त आपसे ख़तरे वाले काम नहीं करवाते। 'ना' कहने के कई तरीक़े हैं।",
      teacherPrompt_en: "Teach four ways to resist pressure (the REAL strategies): REFUSE ('No, I won't'), EXPLAIN ('I could fall and get hurt'), AVOID (stay away from the spot), LEAVE (walk away to another game or a teacher). Let children role-play each one and notice there is no single right phrase. Ask: 'How does it feel when friends push you? Who can help?'",
      teacherPrompt_hi: "दबाव का सामना करने के चार तरीक़े सिखाएँ (REAL रणनीतियाँ): मना करें ('नहीं, मैं नहीं करूँगा'), कारण बताएँ ('मैं गिरकर चोट खा सकता हूँ'), दूर रहें (उस जगह से दूर रहें), चले जाएँ (किसी और खेल या शिक्षक के पास चले जाएँ)। बच्चों से हर तरीक़े का अभिनय कराएँ और देखें कि कोई एक 'सही वाक्य' नहीं है। पूछें: 'जब दोस्त दबाव डालते हैं तो कैसा लगता है? कौन मदद कर सकता है?'",
      keyRule_en: "Rule for Children: You can always say no: Refuse, Explain, Avoid or Leave. A real friend respects your choice. Tell a teacher if friends keep pushing.",
      keyRule_hi: "बच्चों के लिए नियम: आप हमेशा 'ना' कह सकते हैं: मना करें, कारण बताएँ, दूर रहें या चले जाएँ। सच्चा दोस्त आपकी पसंद का सम्मान करता है। दोस्त बार-बार दबाव डालें तो शिक्षक को बताएँ।",
      practice_en: "No thanks! Let's play something else over there.",
      practice_hi: "नहीं, धन्यवाद! चलो उधर कोई और खेल खेलते हैं।",
      choices: [
        {
          id: "l9_c1",
          text_en: "Climb the wall so they won't laugh.",
          text_hi: "दीवार पर चढ़ जाएँ ताकि वे हँसें नहीं।",
          rating: "unsafe",
          skills: NONE,
          guidanceTitle_en: "Let's Pause and Think 🌱",
          guidanceTitle_hi: "रुकिए और सोचिए 🌱",
          guidanceBody_en: "It's hard when friends laugh or push. But climbing could hurt you, and a real friend wouldn't want you to get hurt. Being brave means choosing what is right for you.",
          guidanceBody_hi: "जब दोस्त हँसते या दबाव डालते हैं तो मुश्किल लगता है। लेकिन चढ़ने से आपको चोट लग सकती है और सच्चा दोस्त नहीं चाहेगा कि आपको चोट लगे। बहादुरी का मतलब है वही चुनना जो आपके लिए सही है।",
          actorReaction: "think_concern"
        },
        {
          id: "l9_c2",
          text_en: "Say 'No, I could get hurt.'",
          text_hi: "कहें 'नहीं, मुझे चोट लग सकती है।'",
          rating: "safe",
          skills: sk(1, 0, 0, 1, 1, 1),
          guidanceTitle_en: "Refuse + Explain! ⭐",
          guidanceTitle_hi: "मना करना + कारण बताना! ⭐",
          guidanceBody_en: "That's two strategies in one: saying no clearly and explaining why. You stayed true to yourself, and that takes real courage.",
          guidanceBody_hi: "यह एक साथ दो तरीक़े हैं: साफ़ 'ना' कहना और कारण बताना। आप अपने आप पर टिके रहे और इसके लिए सच्ची हिम्मत चाहिए।",
          actorReaction: "safe_smile"
        },
        {
          id: "l9_c3",
          text_en: "Walk to the swings and invite others.",
          text_hi: "झूलों पर जाएँ और दूसरों को बुलाएँ।",
          rating: "safe",
          skills: sk(1, 0, 0, 1, 1, 1),
          guidanceTitle_en: "Leave + Suggest Something New! ⭐",
          guidanceTitle_hi: "वहाँ से हटना + कुछ नया सुझाना! ⭐",
          guidanceBody_en: "Walking away AND suggesting a different game is a super move. Often other children will happily join you.",
          guidanceBody_hi: "वहाँ से हट जाना और कोई दूसरा खेल सुझाना, दोनों बहुत समझदारी भरे कदम हैं। अक्सर दूसरे बच्चे ख़ुशी से आपके साथ आ जाते हैं।",
          actorReaction: "safe_smile"
        },
        {
          id: "l9_c4",
          text_en: "Stand by the wall and say nothing.",
          text_hi: "दीवार के पास चुपचाप खड़े रहें।",
          rating: "partial",
          skills: sk(1, 0, 0, 1, 0, 0),
          guidanceTitle_en: "Good Choice Not to Climb 🌱",
          guidanceTitle_hi: "न चढ़ना अच्छा निर्णय था 🌱",
          guidanceBody_en: "Not climbing was a good choice! But staying right beside the wall can still be risky, and it's hard to stay out of it. Try leaving to another game, or tell the teacher on duty so everyone stays safe.",
          guidanceBody_hi: "न चढ़ना अच्छा निर्णय था! लेकिन दीवार के बिल्कुल पास रहना भी जोखिम भरा हो सकता है और वहाँ बने रहना मुश्किल होता है। किसी दूसरे खेल की ओर चले जाएँ या ड्यूटी वाले शिक्षक को बताएँ ताकि सब सुरक्षित रहें।",
          actorReaction: "think_concern"
        }
      ]
    },

    // ------------------------------------------------------------------
    // 10. MEAN MESSAGES IN THE GROUP CHAT (cyberbullying)
    // ------------------------------------------------------------------
    {
      id: "learn_10",
      category: "online_safety",
      icon: "📱",
      tag_en: "Kindness & Online Safety",
      tag_hi: "दयालुता और ऑनलाइन सुरक्षा",
      title_en: "Mean Messages in the Group Chat",
      title_hi: "ग्रुप चैट में बुरे संदेश",
      desc_en: "Your class group chat fills with unkind jokes and an embarrassing photo of a classmate.",
      desc_hi: "आपकी क्लास की ग्रुप चैट में एक सहपाठी की शर्मिंदा करने वाली फ़ोटो और बुरे मज़ाक भर जाते हैं।",
      env: "room",
      actorLeft: "online_avatar",
      nametagLeft_en: "Class Group Chat",
      nametagLeft_hi: "क्लास ग्रुप चैट",
      initialDialogue_en: "\"LOL look at this photo of Rohan! 😂 Everyone send it to the other groups too!\"",
      initialDialogue_hi: "\"हा हा, रोहन की यह फ़ोटो देखो! 😂 सब इसे दूसरे ग्रुप में भी भेजो!\"",
      guidePrompt_en: "Words and pictures online can hurt as much as words said out loud. Let's think about Rohan too.",
      guidePrompt_hi: "ऑनलाइन शब्द और तस्वीरें भी उतना ही दुख दे सकती हैं जितनी बोली गई बातें। रोहन के बारे में भी सोचें।",
      teacherPrompt_en: "Ask the class: 'How might Rohan feel? What could we do instead of sharing?' Teach: don't join in, don't forward, save the message (a screenshot) and tell a trusted grown-up, and be kind to the person it happened to. Discuss that once a picture is sent it cannot be taken back.",
      teacherPrompt_hi: "कक्षा से पूछें: 'रोहन को कैसा लग रहा होगा? भेजने की जगह हम क्या कर सकते हैं?' सिखाएँ: उसमें शामिल न हों, आगे न भेजें, संदेश को सुरक्षित रखें (स्क्रीनशॉट) और किसी भरोसेमंद बड़े को बताएँ, और जिसके साथ ऐसा हुआ उसके प्रति दयालु रहें। चर्चा करें कि एक बार भेजी गई तस्वीर वापस नहीं ली जा सकती।",
      keyRule_en: "Rule for Children: Don't share or join in. Save it, tell a trusted grown-up, and be kind to the person it happened to.",
      keyRule_hi: "बच्चों के लिए नियम: न शामिल हों, न आगे भेजें। उसे सुरक्षित रखें, किसी भरोसेमंद बड़े को बताएँ और जिसके साथ ऐसा हुआ उसके प्रति दयालु रहें।",
      practice_en: "I'm not sharing this. It isn't kind.",
      practice_hi: "इसे आगे नहीं भेजना है। यह अच्छी बात नहीं है।",
      choices: [
        {
          id: "l10_c1",
          text_en: "Forward it, everyone is doing it.",
          text_hi: "आगे भेज दें, सब कर रहे हैं।",
          rating: "unsafe",
          skills: NONE,
          guidanceTitle_en: "Let's Pause and Think 🌱",
          guidanceTitle_hi: "रुकिए और सोचिए 🌱",
          guidanceBody_en: "It might feel like a joke, but hurtful photos and messages can make someone feel very sad, and once sent they can't be taken back. Pausing before you press send is a superpower.",
          guidanceBody_hi: "यह मज़ाक लग सकता है, लेकिन दुख देने वाली तस्वीरें और संदेश किसी को बहुत उदास कर सकते हैं और एक बार भेजने के बाद वापस नहीं लिए जा सकते। 'भेजें' दबाने से पहले रुकना एक महाशक्ति है।",
          actorReaction: "think_concern"
        },
        {
          id: "l10_c2",
          text_en: "Don't share. Tell a grown-up and be kind to Rohan.",
          text_hi: "आगे न भेजें। बड़े को बताएँ और रोहन से अच्छा व्यवहार करें।",
          rating: "safe",
          skills: sk(1, 0, 1, 1, 1, 1),
          guidanceTitle_en: "Kind and Brave! ⭐",
          guidanceTitle_hi: "दयालु और बहादुर! ⭐",
          guidanceBody_en: "You stopped the picture from spreading, got a grown-up involved, and looked after Rohan. Standing up kindly for someone is real leadership.",
          guidanceBody_hi: "आपने तस्वीर को फैलने से रोका, एक बड़े को शामिल किया और रोहन का ख़याल रखा। किसी के लिए दयालुता से खड़े होना सच्चा नेतृत्व है।",
          actorReaction: "safe_smile"
        },
        {
          id: "l10_c3",
          text_en: "Reply with a meaner joke.",
          text_hi: "और बुरा मज़ाक लिखकर जवाब दें।",
          rating: "partial",
          skills: sk(1, 0, 0, 0, 0, 0),
          guidanceTitle_en: "Understandable, But There's a Better Way 🌱",
          guidanceTitle_hi: "समझ में आता है, पर इससे बेहतर तरीक़ा है 🌱",
          guidanceBody_en: "It's natural to feel angry for Rohan. But a meaner reply makes the chat even more hurtful. A better way: don't reply, save it, and tell a grown-up you trust.",
          guidanceBody_hi: "रोहन के लिए ग़ुस्सा आना स्वाभाविक है। लेकिन और बुरा जवाब देने से चैट और ज़्यादा दुखदायी हो जाती है। बेहतर तरीक़ा: जवाब न दें, उसे सुरक्षित रखें और किसी भरोसेमंद बड़े को बताएँ।",
          actorReaction: "think_concern"
        },
        {
          id: "l10_c4",
          text_en: "Ignore the chat and tell no one.",
          text_hi: "चैट अनदेखी करें और किसी को न बताएँ।",
          rating: "partial",
          skills: sk(1, 0, 0, 0, 1, 0),
          guidanceTitle_en: "A Good Start, Now Tell Someone 🌱",
          guidanceTitle_hi: "अच्छी शुरुआत, अब किसी को बताएँ 🌱",
          guidanceBody_en: "Not joining in is a good start. But Rohan may feel very alone. Telling a trusted grown-up helps stop it for everyone.",
          guidanceBody_hi: "उसमें शामिल न होना अच्छी शुरुआत है। लेकिन रोहन बहुत अकेला महसूस कर सकता है। किसी भरोसेमंद बड़े को बताने से यह सबके लिए रुक सकता है।",
          actorReaction: "think_concern"
        }
      ]
    },

    // ------------------------------------------------------------------
    // 11. MY BODY, MY RULES (body safety; keep telling until someone listens)
    // ------------------------------------------------------------------
    {
      id: "learn_11",
      category: "secrets_boundaries",
      icon: "💛",
      tag_en: "My Body, My Rules (Teacher Present)",
      tag_hi: "मेरा शरीर, मेरे नियम (शिक्षक की उपस्थिति में)",
      title_en: "My Body, My Rules",
      title_hi: "मेरा शरीर, मेरे नियम",
      desc_en: "A bigger person you know says something that gives you a funny tummy feeling and asks you to keep it secret.",
      desc_hi: "आपका जाना-पहचाना कोई बड़ा कुछ ऐसा कहता है जिससे आपके पेट में अजीब-सा लगता है और आपसे इसे राज़ रखने को कहता है।",
      env: "living_room",
      actorLeft: "neighbour",
      nametagLeft_en: "A Bigger Person You Know",
      nametagLeft_hi: "आपका जाना-पहचाना कोई बड़ा",
      initialDialogue_en: "\"Let's play a special game just for us. You can't tell anyone, not even your parents. It's our secret.\"",
      initialDialogue_hi: "\"चलो सिर्फ़ हमारे लिए एक ख़ास खेल खेलते हैं। तुम किसी को नहीं बता सकते, अपने माता-पिता को भी नहीं। यह हमारा राज़ है।\"",
      guidePrompt_en: "Your body belongs to you. You can always say NO, and you are never in trouble for telling.",
      guidePrompt_hi: "आपका शरीर आपका अपना है। आप हमेशा 'ना' कह सकते हैं और बताने पर आपको कभी डाँट नहीं पड़ेगी।",
      teacherPrompt_en: "SENSITIVE TOPIC: run this story only with a teacher or school counsellor present, and tell parents beforehand. Never ask children to share personal experiences in front of the class. Teach three steps: SAY NO, GO to a safe place, TELL a trusted grown-up, and keep telling until someone listens. Remind children it is NEVER their fault. Have your school's child-protection procedure ready: if a child tells you something, listen calmly, do not ask leading questions, and follow school policy. In India, CHILDLINE 1098 is a helpline for children (please confirm it is current in your area).",
      teacherPrompt_hi: "संवेदनशील विषय: इस कहानी को केवल शिक्षक या स्कूल काउंसलर की उपस्थिति में चलाएँ और पहले माता-पिता को बता दें। बच्चों से कक्षा के सामने व्यक्तिगत अनुभव साझा करने को कभी न कहें। तीन कदम सिखाएँ: 'ना' कहो, सुरक्षित जगह जाओ, भरोसेमंद बड़े को बताओ, और तब तक बताते रहो जब तक कोई सुन न ले। बच्चों को याद दिलाएँ कि यह कभी उनकी ग़लती नहीं होती। स्कूल की बाल-संरक्षण प्रक्रिया तैयार रखें: यदि कोई बच्चा कुछ बताए तो शांति से सुनें, सवाल घुमाकर न पूछें और स्कूल की नीति का पालन करें। भारत में CHILDLINE 1098 बच्चों के लिए हेल्पलाइन है (कृपया अपने क्षेत्र में इसकी वर्तमान स्थिति की पुष्टि करें)।",
      keyRule_en: "Rule for Children: My body belongs to me. Say NO, GO to a safe place, TELL a trusted grown-up, and keep telling until someone listens. It is never the child's fault.",
      keyRule_hi: "बच्चों के लिए नियम: मेरा शरीर मेरा अपना है। 'ना' कहो, सुरक्षित जगह जाओ, भरोसेमंद बड़े को बताओ, और तब तक बताते रहो जब तक कोई सुन न ले। यह कभी बच्चे की ग़लती नहीं होती।",
      practice_en: "No! I don't like that. I'm going to tell a grown-up I trust.",
      practice_hi: "नहीं! मुझे यह अच्छा नहीं लगा। अब किसी भरोसेमंद बड़े को बताना है।",
      choices: [
        {
          id: "l11_c1",
          text_en: "Keep the secret so they're not upset.",
          text_hi: "राज़ रखें ताकि वे नाराज़ न हों।",
          rating: "unsafe",
          skills: NONE,
          guidanceTitle_en: "Let's Pause and Think 🌱",
          guidanceTitle_hi: "रुकिए और सोचिए 🌱",
          guidanceBody_en: "It's kind to care about other people's feelings. But a secret that gives you a funny tummy feeling is not one to keep. You will never be in trouble for telling a trusted grown-up, and it is never your fault.",
          guidanceBody_hi: "दूसरों की भावनाओं का ख़याल रखना अच्छी बात है। लेकिन जिस राज़ से आपके पेट में अजीब-सा लगे, उसे रखना ज़रूरी नहीं। किसी भरोसेमंद बड़े को बताने पर आपको कभी डाँट नहीं पड़ेगी और यह कभी आपकी ग़लती नहीं है।",
          actorReaction: "think_concern"
        },
        {
          id: "l11_c2",
          text_en: "Say 'No!', go to a grown-up you trust, and tell.",
          text_hi: "'नहीं!' कहें, भरोसेमंद बड़े के पास जाकर बताएँ।",
          rating: "safe",
          skills: sk(1, 0, 1, 1, 1, 1),
          guidanceTitle_en: "No, Go, Tell: Exactly Right! ⭐",
          guidanceTitle_hi: "ना, जाओ, बताओ: बिल्कुल सही! ⭐",
          guidanceBody_en: "You said no, went to someone safe, and told them. That took real courage. Your body belongs to you, and trusted grown-ups want to know so they can keep you safe. It is never your fault.",
          guidanceBody_hi: "आपने 'ना' कहा, किसी सुरक्षित व्यक्ति के पास गए और उन्हें बताया। इसमें सच्ची हिम्मत लगी। आपका शरीर आपका अपना है और भरोसेमंद बड़े जानना चाहते हैं ताकि आपको सुरक्षित रख सकें। यह कभी आपकी ग़लती नहीं है।",
          actorReaction: "safe_smile"
        },
        {
          id: "l11_c3",
          text_en: "Say 'No!' and walk away, but tell no one.",
          text_hi: "'नहीं!' कहकर चले जाएँ, पर किसी को न बताएँ।",
          rating: "partial",
          skills: sk(1, 0, 0, 1, 1, 0),
          guidanceTitle_en: "Brave 'No' - Now the Most Important Step 🌱",
          guidanceTitle_hi: "बहादुर 'ना' - अब सबसे ज़रूरी कदम 🌱",
          guidanceBody_en: "Saying no and walking away was very brave! Telling is the last and most important step, even when it feels embarrassing. Trusted grown-ups want to know, and they will not be angry with you.",
          guidanceBody_hi: "'ना' कहना और चले जाना बहुत बहादुरी थी! बताना आख़िरी और सबसे ज़रूरी कदम है, भले ही शर्म आए। भरोसेमंद बड़े जानना चाहते हैं और वे आप पर नाराज़ नहीं होंगे।",
          actorReaction: "think_concern"
        },
        {
          id: "l11_c4",
          text_en: "Tell a grown-up. If they don't listen, tell another.",
          text_hi: "बड़े को बताएँ। न सुनें तो दूसरे को बताएँ।",
          rating: "safe",
          skills: sk(1, 0, 1, 1, 1, 1),
          guidanceTitle_en: "Keep Telling Until Someone Listens! ⭐",
          guidanceTitle_hi: "तब तक बताते रहें जब तक कोई सुन न ले! ⭐",
          guidanceBody_en: "This is one of the most important rules. Sometimes a grown-up is busy or doesn't understand at first. Trying again with another trusted grown-up is exactly right, and you will never be in trouble for it.",
          guidanceBody_hi: "यह सबसे ज़रूरी नियमों में से एक है। कभी-कभी कोई बड़ा व्यस्त होता है या पहले बात समझ नहीं पाता। किसी दूसरे भरोसेमंद बड़े को फिर से बताना बिल्कुल सही है और इसके लिए आपको कभी डाँट नहीं पड़ेगी।",
          actorReaction: "safe_smile"
        }
      ]
    },

    // ------------------------------------------------------------------
    // 12. WHO CAN PICK YOU UP? (discrimination: when it IS okay)
    // ------------------------------------------------------------------
    {
      id: "learn_12",
      category: "trusted_people",
      icon: "🤝",
      tag_en: "Trusted People & Family Plans",
      tag_hi: "भरोसेमंद लोग और परिवार की योजना",
      title_en: "Who Can Pick You Up?",
      title_hi: "आपको लेने कौन आ सकता है?",
      desc_en: "Mum told you this morning that Uncle Raj would collect you today. He is at the gate and your teacher is nearby.",
      desc_hi: "माँ ने आज सुबह बताया था कि आज आपको राज अंकल लेने आएँगे। वे गेट पर हैं और आपके शिक्षक पास में हैं।",
      env: "school",
      actorLeft: "relative",
      nametagLeft_en: "Uncle Raj (family plan)",
      nametagLeft_hi: "राज अंकल (परिवार की योजना)",
      initialDialogue_en: "\"Hello! Mum asked me to pick you up today, just like she told you this morning. Ready to go?\"",
      initialDialogue_hi: "\"नमस्ते! माँ ने मुझे आज तुम्हें लेने के लिए कहा है, ठीक वैसे ही जैसे उन्होंने सुबह तुम्हें बताया था। चलें?\"",
      guidePrompt_en: "Not every grown-up is tricky! Your family's plan tells you who can pick you up.",
      guidePrompt_hi: "हर बड़ा चालाक नहीं होता! आपके परिवार की योजना बताती है कि आपको कौन लेने आ सकता है।",
      teacherPrompt_en: "Compare with 'The Unexpected Ride Offer'. Ask: 'What is different here?' (The plan was made with the family beforehand, the child expected this person, and the teacher can confirm.) Teach that children should always tell the teacher before leaving, and check with a trusted grown-up if a plan ever changes. This story is here so children learn to tell safe situations from unsafe ones, instead of being afraid of everyone.",
      teacherPrompt_hi: "'अनजान व्यक्ति द्वारा घर छोड़ने की पेशकश' से तुलना करें। पूछें: 'यहाँ क्या अलग है?' (योजना परिवार के साथ पहले से बनी थी, बच्चे को इस व्यक्ति के आने की उम्मीद थी और शिक्षक पुष्टि कर सकते हैं।) सिखाएँ कि बच्चे जाने से पहले हमेशा शिक्षक को बताएँ और योजना बदले तो किसी भरोसेमंद बड़े से पूछें। यह कहानी इसलिए है कि बच्चे सुरक्षित और असुरक्षित स्थितियों में अंतर करना सीखें, न कि हर किसी से डरें।",
      keyRule_en: "Rule for Children: Go only with the people your family planned. Always tell your teacher first so they can check. If a plan changes, check with a trusted grown-up before you go.",
      keyRule_hi: "बच्चों के लिए नियम: केवल उन्हीं के साथ जाएँ जिनके बारे में परिवार ने योजना बनाई थी। जाने से पहले हमेशा शिक्षक को बताएँ ताकि वे जाँच कर सकें। योजना बदले तो जाने से पहले किसी भरोसेमंद बड़े से पूछें।",
      practice_en: "Hello Uncle! Let me tell my teacher first.",
      practice_hi: "नमस्ते अंकल! पहले टीचर को बता दूँ।",
      choices: [
        {
          id: "l12_c1",
          text_en: "Go with Uncle Raj without telling anyone.",
          text_hi: "किसी को बताए बिना राज अंकल के साथ चले जाएँ।",
          rating: "partial",
          skills: sk(1, 0, 0, 0, 0, 0),
          guidanceTitle_en: "Right Person, One Step Missing 🌱",
          guidanceTitle_hi: "सही व्यक्ति, एक कदम बाक़ी 🌱",
          guidanceBody_en: "You were right that Uncle Raj is part of your family's plan! But always tell your teacher you are leaving, so the school knows where every child is and can check the plan.",
          guidanceBody_hi: "आप सही थे कि राज अंकल आपके परिवार की योजना का हिस्सा हैं! लेकिन जाने से पहले हमेशा शिक्षक को बताएँ, ताकि स्कूल को पता रहे कि हर बच्चा कहाँ है और वे योजना जाँच सकें।",
          actorReaction: "think_concern"
        },
        {
          id: "l12_c2",
          text_en: "Tell your teacher, let them check, then go with Uncle Raj.",
          text_hi: "टीचर को बताएँ, उन्हें जाँचने दें, फिर राज अंकल के साथ जाएँ।",
          rating: "safe",
          skills: sk(1, 1, 1, 0, 1, 1),
          guidanceTitle_en: "Safe and Not Scared! ⭐",
          guidanceTitle_hi: "सुरक्षित और बिना डरे! ⭐",
          guidanceBody_en: "You knew the plan, you told your teacher, and your teacher checked. That's how safe pick-ups work. Not every grown-up is tricky, and checking keeps everyone sure.",
          guidanceBody_hi: "आपको योजना पता थी, आपने शिक्षक को बताया और शिक्षक ने जाँच की। सुरक्षित पिक-अप ऐसे ही होता है। हर बड़ा चालाक नहीं होता और जाँच करने से सबको भरोसा रहता है।",
          actorReaction: "safe_smile"
        },
        {
          id: "l12_c3",
          text_en: "Hide behind the gate, scared of everyone.",
          text_hi: "डरकर गेट के पीछे छिप जाएँ।",
          rating: "partial",
          skills: sk(0, 0, 0, 1, 0, 0),
          guidanceTitle_en: "It's Okay to Be Unsure 🌱",
          guidanceTitle_hi: "अनिश्चित होना ठीक है 🌱",
          guidanceBody_en: "Checking is smart! But not every grown-up is tricky, and today your family planned this with you. Your teacher can confirm it, which helps you feel sure, and then you can go happily.",
          guidanceBody_hi: "जाँच करना समझदारी है! लेकिन हर बड़ा चालाक नहीं होता और आज आपके परिवार ने आपके साथ यह योजना बनाई थी। शिक्षक इसकी पुष्टि कर सकते हैं, जिससे आपको भरोसा होगा और फिर आप ख़ुशी से जा सकते हैं।",
          actorReaction: "think_concern"
        },
        {
          id: "l12_c4",
          text_en: "Walk home alone, you don't want to wait.",
          text_hi: "इंतज़ार न करें, अकेले घर चल दें।",
          rating: "unsafe",
          skills: NONE,
          guidanceTitle_en: "Let's Pause and Think 🌱",
          guidanceTitle_hi: "रुकिए और सोचिए 🌱",
          guidanceBody_en: "Walking alone can be risky, and your family planned for someone to bring you home. Always wait with a safe grown-up, like your teacher, until your planned person arrives.",
          guidanceBody_hi: "अकेले चलना जोखिम भरा हो सकता है और आपके परिवार ने किसी के आपको घर लाने की योजना बनाई थी। जब तक योजना वाला व्यक्ति न आ जाए, किसी सुरक्षित बड़े, जैसे शिक्षक, के साथ इंतज़ार करें।",
          actorReaction: "think_concern"
        }
      ]
    }
  ];

  if (typeof GAURI_DATA !== "undefined" && Array.isArray(GAURI_DATA.learningScenarios)) {
    GAURI_DATA.learningScenarios.push(...more);
  }
})();
