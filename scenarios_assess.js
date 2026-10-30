/**
 * GauriKit - scenarios_assess.js
 * Extends the Pre / Post assessments so that every learning story (1-12) is covered.
 *
 * DESIGN
 *  - 12 matched pairs: pre_N and post_N test the SAME safety skill in the same kind of
 *    situation but with a different story ("isomorphic"), so a child cannot just remember the answer.
 *  - Each question lists which skills it tests (`tests`); every skill is tested by 4+ pairs. A safe answer earns only those skills;
 *    skill meters are then computed only over the questions that test that skill.
 *  - Every question has ONE safe answer and TWO unsafe ones. One unsafe answer is tempting,
 *    the other is "almost safe" (e.g. says no but never tells). This checks the TELL step.
 *  - The engine shuffles the order of the choices, so "the safe one is always B" cannot be learnt.
 *  - Loaded after scenarios.js and scenarios_more.js, before engine.js.
 */
(function () {
  const ALL_ZERO = { risk_recognition: 0, verification: 0, help_seeking: 0, boundary_setting: 0, impulse_control: 0, problem_solving: 0 };
  const ALL_ONE = { risk_recognition: 1, verification: 1, help_seeking: 1, boundary_setting: 1, impulse_control: 1, problem_solving: 1 };

  // Which skills each matched pair tests (applies to BOTH the pre and the post item)
  const TESTS = {
    1: ["risk_recognition", "boundary_setting", "help_seeking", "impulse_control"],
    2: ["risk_recognition", "boundary_setting", "help_seeking"],
    3: ["help_seeking", "verification", "problem_solving"],
    4: ["boundary_setting", "help_seeking", "risk_recognition"],
    5: ["risk_recognition", "verification", "help_seeking", "impulse_control"],
    6: ["verification", "boundary_setting", "risk_recognition"],
    7: ["impulse_control", "problem_solving", "risk_recognition"],
    8: ["problem_solving", "impulse_control", "help_seeking"],
    9: ["boundary_setting", "impulse_control", "problem_solving"],
    10: ["help_seeking", "boundary_setting", "problem_solving"],
    11: ["boundary_setting", "help_seeking", "risk_recognition"],
    12: ["verification", "risk_recognition", "help_seeking"]
  };
  GAURI_DATA.assessmentTests = TESTS; // also used to link each story to the skills it trains (booster suggestions)


  // Tag the 8 original questions (pre_1..4, post_1..4)
  ["preAssessment", "postAssessment"].forEach(function (key) {
    GAURI_DATA[key].forEach(function (q) {
      const n = parseInt(q.id.split("_")[1], 10);
      q.tests = TESTS[n];
      q.pair = n;
    });
  });

  function mk(prefix, n, cat, icon, tEn, tHi, sEn, sHi, ch) {
    return {
      id: prefix + "_" + n,
      pair: n,
      category: cat,
      icon: icon,
      tests: TESTS[n],
      title_en: tEn, title_hi: tHi,
      story_en: sEn, story_hi: sHi,
      choices: ch.map(function (c, i) {
        return {
          id: prefix + "_" + n + "_" + "abc"[i],
          text_en: c[0], text_hi: c[1],
          skills: c[2] ? Object.assign({}, ALL_ONE) : Object.assign({}, ALL_ZERO),
          isSafe: !!c[2]
        };
      })
    };
  }

  const PRE = [
    // 5. Assistance lure (puppy)
    mk("pre", 5, "assistance_lure", "🐶",
      "A Lost Puppy", "खोया हुआ पिल्ला",
      "At the park gate, a friendly man says: 'My puppy ran into the lane behind the shop! Please come and help me look for her. It will only take a minute!'",
      "पार्क के गेट पर एक मिलनसार आदमी कहता है: 'मेरा पिल्ला दुकान के पीछे वाली गली में भाग गया है! कृपया मेरे साथ उसे ढूँढने चलो। बस एक मिनट लगेगा!'",
      [
        ["Go with him quickly to help the puppy.", "पिल्ले की मदद के लिए उसके साथ चले जाएँ।", false],
        ["Say 'I must ask a grown-up first' and go tell your teacher.", "कहें 'पहले बड़े से पूछना है' और टीचर को बताएँ।", true],
        ["Say 'No thanks', keep playing, tell no one.", "'नहीं, धन्यवाद' कहें, खेलते रहें, किसी को न बताएँ।", false]
      ]),
    // 6. Door knock
    mk("pre", 6, "door_safety", "🚪",
      "Someone at the Door", "दरवाज़े पर कोई",
      "You are at home and Grandma is resting in the next room. Someone knocks hard and shouts: 'Open up! I am here to read the electricity meter!'",
      "आप घर पर हैं और दादी बगल के कमरे में आराम कर रही हैं। कोई ज़ोर से दरवाज़ा खटखटाकर कहता है: 'दरवाज़ा खोलो! मैं बिजली का मीटर पढ़ने आया हूँ!'",
      [
        ["Open the door a little to peek.", "झाँकने के लिए दरवाज़ा थोड़ा खोलें।", false],
        ["Say 'I'm busy' through the door and go back to your game.", "दरवाज़े से कहें 'मैं व्यस्त हूँ' और खेल में लग जाएँ।", false],
        ["Don't open. Tell Grandma someone is at the door.", "न खोलें। दादी को बताएँ कि कोई दरवाज़े पर है।", true]
      ]),
    // 7. Road crossing
    mk("pre", 7, "road_safety", "🚸",
      "Ice Cream Across the Road", "सड़क के पार आइसक्रीम",
      "School is over. The ice-cream cart is on the other side of a busy road. Your friends start running across. The zebra crossing is a short walk away.",
      "स्कूल की छुट्टी हो गई है। आइसक्रीम की गाड़ी व्यस्त सड़क के दूसरी तरफ़ है। आपके दोस्त भागकर सड़क पार करने लगते हैं। ज़ेबरा क्रॉसिंग थोड़ी ही दूर है।",
      [
        ["Run across with your friends.", "दोस्तों के साथ भागकर पार करें।", false],
        ["Cross when only one scooter is coming.", "जब सिर्फ़ एक स्कूटर आ रहा हो तब पार करें।", false],
        ["Use the zebra crossing: look right-left-right, then cross.", "ज़ेबरा क्रॉसिंग पर दाएँ-बाएँ-दाएँ देखकर पार करें।", true]
      ]),
    // 8. Alarm / exit
    mk("pre", 8, "fire_safety", "🔔",
      "The Alarm Beeps", "अलार्म बजता है",
      "You are playing with your toys in your bedroom. The smoke alarm starts to beep loudly.",
      "आप अपने कमरे में खिलौनों से खेल रहे हैं। तभी धुएँ का अलार्म ज़ोर से बजने लगता है।",
      [
        ["Hide under the bed.", "बिस्तर के नीचे छिप जाएँ।", false],
        ["Grab your favourite toys, then go out.", "पसंदीदा खिलौने उठाएँ, फिर बाहर जाएँ।", false],
        ["Leave your toys, walk to the meeting place, wait.", "खिलौने छोड़ें, मिलने की जगह पर चलकर जाएँ, रुकें।", true]
      ]),
    // 9. Peer dare
    mk("pre", 9, "peer_pressure", "🧗",
      "The Wall Dare", "दीवार की चुनौती",
      "At the playground your classmates dare you to climb on top of a high wall: 'Don't be a baby! Everyone is doing it!'",
      "खेल के मैदान में आपके सहपाठी आपको ऊँची दीवार पर चढ़ने की चुनौती देते हैं: 'डरपोक मत बनो! सब कर रहे हैं!'",
      [
        ["Climb up so they stop teasing.", "चढ़ जाएँ ताकि वे चिढ़ाना बंद करें।", false],
        ["Climb just a little bit.", "बस थोड़ा-सा चढ़ें।", false],
        ["Say 'No, I could fall' and go play something else.", "कहें 'नहीं, मैं गिर सकता हूँ' और दूसरा खेल खेलें।", true]
      ]),
    // 10. Group chat
    mk("pre", 10, "online_kindness", "💬",
      "The Class Group Chat", "कक्षा का ग्रुप चैट",
      "In your class group chat, kids are sending mean jokes and an unkind picture about a classmate. Someone writes: 'Forward it to everyone!'",
      "आपकी कक्षा के ग्रुप चैट में बच्चे एक सहपाठी के बारे में बुरे मज़ाक और एक अपमानजनक तस्वीर भेज रहे हैं। कोई लिखता है: 'सबको फ़ॉरवर्ड करो!'",
      [
        ["Forward it, everyone is doing it.", "आगे भेज दें, सब कर रहे हैं।", false],
        ["Send a laughing emoji, but don't forward.", "हँसने वाली इमोजी भेजें, पर आगे न भेजें।", false],
        ["Don't forward or laugh. Tell a grown-up.", "न आगे भेजें, न हँसें। बड़े को बताएँ।", true]
      ]),
    // 11. Body safety (teacher review recommended)
    mk("pre", 11, "body_safety", "🛡️",
      "A Hug You Don't Like", "ऐसा गले लगना जो पसंद नहीं",
      "At a family function, a bigger person you know tries to hug and kiss you. You don't like it. They say: 'Don't make a fuss, and don't tell anyone, it's our secret.'",
      "एक पारिवारिक समारोह में आपका जाना-पहचाना कोई बड़ा व्यक्ति आपको गले लगाकर चूमना चाहता है। आपको यह पसंद नहीं। वह कहता है: 'हंगामा मत करो, किसी को मत बताना, यह हमारा राज़ है।'",
      [
        ["Stay quiet, they're family.", "चुप रहें, वे परिवार के हैं।", false],
        ["Say 'No', walk away, but tell no one.", "'नहीं' कहें, दूर जाएँ, पर किसी को न बताएँ।", false],
        ["Say 'No', go to a trusted grown-up and tell them.", "'नहीं' कहें, भरोसेमंद बड़े के पास जाकर बताएँ।", true]
      ]),
    // 12. Pick-up
    mk("pre", 12, "pickup_safety", "🏫",
      "A Different Pick-Up", "लेने कोई और आया",
      "School is over. Mum said Uncle Raj, who you know, would collect you. Today a man you have never met says: 'Uncle Raj is busy, so I will take you home instead.'",
      "स्कूल की छुट्टी हो गई है। मम्मी ने कहा था कि जान-पहचान वाले राज अंकल आपको लेने आएँगे। आज एक अनजान आदमी कहता है: 'राज अंकल व्यस्त हैं, इसलिए मैं तुम्हें घर ले जाऊँगा।'",
      [
        ["Go with him, he knows Uncle Raj's name.", "उसके साथ जाएँ, वह राज अंकल का नाम जानता है।", false],
        ["Run home alone through the back lane.", "पिछली गली से अकेले घर भागें।", false],
        ["Don't go. Tell your teacher so school can call your parents.", "न जाएँ। टीचर को बताएँ ताकि स्कूल माता-पिता को फ़ोन करे।", true]
      ])
  ];

  const POST = [
    mk("post", 5, "assistance_lure", "📱",
      "Help at the Bus Stop", "बस स्टॉप पर मदद",
      "At the bus stop, a woman you don't know says: 'I dropped my phone down the alley. Your arms are small, so come round the corner and help me get it.'",
      "बस स्टॉप पर एक अनजान महिला कहती है: 'मेरा फ़ोन गली में गिर गया है। तुम्हारे हाथ छोटे हैं, कोने के पास आकर इसे निकालने में मेरी मदद करो।'",
      [
        ["Go round the corner, it's polite to help.", "कोने तक चले जाएँ, मदद करना शिष्टता है।", false],
        ["Say 'Sorry, I can't', tell no one.", "कहें 'माफ़ कीजिए, नहीं आ सकता', किसी को न बताएँ।", false],
        ["Say 'Ask a grown-up', stay with friends, tell your teacher.", "कहें 'बड़े से पूछिए', दोस्तों के साथ रहें, टीचर को बताएँ।", true]
      ]),
    mk("post", 6, "door_safety", "📦",
      "A Parcel Pick-Up", "पार्सल लेने आया व्यक्ति",
      "You are at home and Mum is in the kitchen. A man at the door says: 'Your dad told me to collect a parcel. Let me in, I'll be quick.'",
      "आप घर पर हैं और मम्मी रसोई में हैं। दरवाज़े पर एक आदमी कहता है: 'आपके पापा ने मुझे पार्सल लेने भेजा है। मुझे अंदर आने दो, मैं जल्दी कर दूँगा।'",
      [
        ["Let him in, he mentioned Dad.", "उसे अंदर आने दें, उसने पापा का नाम लिया।", false],
        ["Don't open. Tell Mum someone is at the door.", "न खोलें। मम्मी को बताएँ कि कोई दरवाज़े पर है।", true],
        ["Say 'Wait here' and keep watching TV.", "कहें 'यहीं रुको' और टीवी देखते रहें।", false]
      ]),
    mk("post", 7, "road_safety", "🚌",
      "The School Bus", "स्कूल बस",
      "You are late. Your school bus is across a busy road and the driver is about to leave. There is a zebra crossing a little way down.",
      "आपको देर हो गई है। आपकी स्कूल बस व्यस्त सड़क के उस पार है और ड्राइवर जाने वाला है। थोड़ी दूर पर ज़ेबरा क्रॉसिंग है।",
      [
        ["Dash across so you don't miss the bus.", "बस न छूटे इसलिए भागकर पार करें।", false],
        ["Wave at the driver and cross looking at the bus.", "ड्राइवर को हाथ हिलाते हुए बस को देखकर पार करें।", false],
        ["Use the zebra crossing: look right-left-right, then cross.", "ज़ेबरा क्रॉसिंग पर दाएँ-बाएँ-दाएँ देखकर पार करें।", true]
      ]),
    mk("post", 8, "fire_safety", "🎨",
      "The Fire Drill", "फ़ायर ड्रिल",
      "In art class you are finishing a drawing when the alarm bell rings loudly.",
      "कला की कक्षा में आप चित्र पूरा कर रहे हैं कि तभी अलार्म की घंटी ज़ोर से बजने लगती है।",
      [
        ["Finish your drawing first.", "पहले चित्र पूरा करें।", false],
        ["Hide in the cupboard.", "अलमारी में छिप जाएँ।", false],
        ["Leave your things, line up, walk to the assembly point.", "सामान छोड़ें, कतार में लगें, एकत्रीकरण स्थल पर चलें।", true]
      ]),
    mk("post", 9, "peer_pressure", "🚲",
      "The Hill Dare", "ढलान की चुनौती",
      "Your friends dare you to ride your bicycle fast down a steep hill with no helmet and no hands: 'Chicken! Everyone has done it!'",
      "आपके दोस्त आपको बिना हेलमेट और बिना हाथ लगाए तेज़ ढलान पर साइकिल दौड़ाने की चुनौती देते हैं: 'डरपोक! सबने किया है!'",
      [
        ["Do it so they call you brave.", "कर दें ताकि वे आपको बहादुर कहें।", false],
        ["Say 'No, that's dangerous' and ride slowly with your helmet.", "कहें 'नहीं, यह ख़तरनाक है' और हेलमेट पहनकर धीरे चलाएँ।", true],
        ["Ride with a helmet but no hands, just once.", "हेलमेट पहनकर बिना हाथ लगाए, बस एक बार चलाएँ।", false]
      ]),
    mk("post", 10, "online_kindness", "📸",
      "The Embarrassing Photo", "शर्मिंदा करने वाली फ़ोटो",
      "In an online game community someone posts an embarrassing photo of your friend. Others are commenting 'LOL!' and sharing it.",
      "एक ऑनलाइन गेम समुदाय में कोई आपके दोस्त की शर्मिंदा करने वाली फ़ोटो डालता है। बाकी लोग 'LOL!' लिखकर उसे साझा कर रहे हैं।",
      [
        ["Write 'LOL' too.", "आप भी 'LOL' लिख दें।", false],
        ["Leave the chat quietly, tell no one.", "चुपचाप चैट छोड़ दें, किसी को न बताएँ।", false],
        ["Don't join in. Tell a grown-up and check on your friend.", "शामिल न हों। बड़े को बताएँ और दोस्त का हाल पूछें।", true]
      ]),
    mk("post", 11, "body_safety", "🤝",
      "A Tickling Game", "गुदगुदी वाला खेल",
      "A bigger person you know is tickling you. You say 'Stop!' but they keep going and say: 'It's just a game. Don't tell anyone.'",
      "आपका जाना-पहचाना कोई बड़ा व्यक्ति आपको गुदगुदी कर रहा है। आप 'रुको!' कहते हैं, पर वह नहीं रुकता और कहता है: 'यह बस खेल है। किसी को मत बताना।'",
      [
        ["Laugh along and stay quiet.", "साथ में हँसें और चुप रहें।", false],
        ["Say 'Stop, I don't like it', go to a trusted grown-up, tell them.", "कहें 'रुको, मुझे पसंद नहीं', भरोसेमंद बड़े को बताएँ।", true],
        ["Say 'Stop' and go to your room, tell no one.", "'रुको' कहकर कमरे में चले जाएँ, किसी को न बताएँ।", false]
      ]),
    mk("post", 12, "pickup_safety", "🎒",
      "At the Tuition Centre", "ट्यूशन सेंटर पर",
      "After tuition class, a woman you have never met says: 'Your mum asked me to take you home. Look, I have her message on my phone!'",
      "ट्यूशन की कक्षा के बाद एक अनजान महिला कहती है: 'तुम्हारी मम्मी ने मुझे तुम्हें घर ले जाने को कहा है। देखो, मेरे फ़ोन में उनका संदेश है!'",
      [
        ["Go with her, she showed a message.", "उसके साथ जाएँ, उसने संदेश दिखाया।", false],
        ["Call the number in her message yourself.", "उसके संदेश वाला नंबर खुद मिलाएँ।", false],
        ["Don't go. Tell your teacher to call your parents.", "न जाएँ। टीचर से माता-पिता को फ़ोन करने को कहें।", true]
      ])
  ];

  GAURI_DATA.preAssessment.push.apply(GAURI_DATA.preAssessment, PRE);
  GAURI_DATA.postAssessment.push.apply(GAURI_DATA.postAssessment, POST);
})();
